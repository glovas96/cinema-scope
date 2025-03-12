"use client";

import { HStack, Button, Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useAuth } from "@/features/auth/AuthContext";
import { useRouter } from "next/navigation";

export function Header() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push("/auth/login");
    };

    return (
        <HStack
            w="100%"
            px={6}
            py={4}
            borderBottom="1px solid"
            borderColor="gray.700"
            bg="gray.100"
        >
            {/* App logo */}
            <Link href="/">
                <Text fontSize="2xl" fontWeight="bold">
                    CinemaScope 🎬
                </Text>
            </Link>

            <Spacer />

            {/* If user is NOT authenticated */}
            {!user && (
                <HStack spacing={4}>
                    {/* Login button */}
                    <Button
                        variant="outline"
                        colorScheme="blue"
                        onClick={() => router.push("/auth/login")}
                    >
                        Login
                    </Button>

                    {/* Register button */}
                    <Button
                        colorScheme="green"
                        onClick={() => router.push("/auth/register")}
                    >
                        Register
                    </Button>
                </HStack>
            )}

            {/* If user IS authenticated */}
            {user && (
                <HStack spacing={4}>
                    {/* Favorites page */}
                    <Link href="/favorites">
                        <Button colorScheme="yellow">Favorites ⭐</Button>
                    </Link>

                    {/* Logout button */}
                    <Button colorScheme="red" onClick={handleLogout}>
                        Logout
                    </Button>
                </HStack>
            )}
        </HStack>
    );
}

