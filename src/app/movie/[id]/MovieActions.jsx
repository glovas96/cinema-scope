"use client";

import { Button, Flex } from "@chakra-ui/react";
import { useFavorites } from "@/features/favorites/FavoritesContext";
import { useRouter } from "next/navigation";

export default function MovieActions({ movie }) {
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const isFavorite = favorites.some((m) => m.imdbID === movie.imdbID);
    const router = useRouter();

    return (
        <Flex w="full" justify="space-between" align="center">
            {/* Back button */}
            <Button onClick={() => router.back()} colorScheme="gray" variant="outline">
                ⬅ Back
            </Button>

            {/* Favorite toggle */}
            {isFavorite ? (
                <Button colorScheme="red" onClick={() => removeFavorite(movie.imdbID)}>
                    Remove from Favorites
                </Button>
            ) : (
                <Button colorScheme="blue" onClick={() => addFavorite(movie)}>
                    Add to Favorites
                </Button>
            )}
        </Flex>
    );
}
