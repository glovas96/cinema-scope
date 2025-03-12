"use client";

import {
    Button,
    Input,
    VStack,
    Text,
} from "@chakra-ui/react";
import { AuthService } from "@/features/auth/AuthService";
import { useAuth } from "@/features/auth/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LoginActions() {
    const { user } = useAuth(); // Current user from AuthContext
    const router = useRouter(); // Navigation helper

    // Local form state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Redirect if already logged in
    useEffect(() => {
        if (user) router.push("/");
    }, [user, router]);

    // Handle form submit
    const onSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        const { user, error } = await AuthService.login(email, password);

        if (error) {
            setError(error); // Show error message
            return;
        }

        router.push("/"); // Redirect after successful login
    };

    return (
        <VStack
            as="form"
            onSubmit={onSubmit}
            spacing="4"
            align="stretch"
        >
            {/* Email input */}
            <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            {/* Password input */}
            <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            {/* Error message */}
            {error && (
                <Text color="red.400" fontSize="sm">
                    {error}
                </Text>
            )}

            {/* Submit button */}
            <Button colorScheme="blue" type="submit">
                Login
            </Button>

            {/* Link to register page */}
            <Button
                variant="link"
                onClick={() => router.push("/auth/register")}
            >
                Create an account
            </Button>
        </VStack>
    );
}