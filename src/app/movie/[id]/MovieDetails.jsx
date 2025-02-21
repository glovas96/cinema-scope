'use client';
import { VStack, Image, Text, Heading } from '@chakra-ui/react';

export default function MovieDetails({ movie }) {
    // Render movie details with Chakra UI components
    return (
        <VStack spacing={4} align="start" p={6}>
            <Heading>{movie.Title}</Heading>
            <Image
                src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-poster.png'}
                alt={movie.Title}
                boxSize="200px"
                objectFit="cover"
                borderRadius="md"
            />
            <Text><strong>Year:</strong> {movie.Year}</Text>
            <Text><strong>Genre:</strong> {movie.Genre}</Text>
            <Text><strong>Director:</strong> {movie.Director}</Text>
            <Text><strong>Actors:</strong> {movie.Actors}</Text>
            <Text><strong>Plot:</strong> {movie.Plot}</Text>
            <Text><strong>IMDB Rating:</strong> {movie.imdbRating}</Text>
        </VStack>
    );
}
