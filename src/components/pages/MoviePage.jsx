'use client';
import { VStack, Image, Text, Heading, Button, HStack } from '@chakra-ui/react';
import { useFavorites } from '@/features/favorites/FavoritesContext';
import { useRouter } from 'next/navigation'; // router for back button

export default function MoviePage({ movie }) {
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const isFavorite = favorites.some((m) => m.imdbID === movie.imdbID);
    const router = useRouter(); // init router

    return (
        <VStack spacing={4} align="start" p={6}>
            {/* Back button (navigate to previous page) */}
            <Button onClick={() => router.back()} colorScheme="gray" variant="outline">
                ⬅ Back
            </Button>

            <HStack justify="space-between" w="full">
                <Heading>{movie.Title}</Heading>
                {/* Primary action button (toggle add/remove favorites) */}
                {isFavorite ? (
                    <Button colorScheme="red" onClick={() => removeFavorite(movie.imdbID)}>
                        Remove from Favorites
                    </Button>
                ) : (
                    <Button colorScheme="blue" onClick={() => addFavorite(movie)}>
                        Add to Favorites
                    </Button>
                )}
            </HStack>

            {/* Poster image with fallback */}
            <Image
                src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-poster.png'}
                alt={movie.Title}
                boxSize="200px"
                objectFit="cover"
                borderRadius="md"
            />

            {/* Movie metadata */}
            <Text><strong>Year:</strong> {movie.Year}</Text>
            <Text><strong>Genre:</strong> {movie.Genre}</Text>
            <Text><strong>Director:</strong> {movie.Director}</Text>
            <Text><strong>Actors:</strong> {movie.Actors}</Text>
            <Text><strong>Plot:</strong> {movie.Plot}</Text>
            <Text><strong>IMDB Rating:</strong> {movie.imdbRating}</Text>
        </VStack>
    );
}