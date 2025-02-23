'use client';
import { useState } from 'react';
import { Heading, Button, Input, VStack, HStack, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';

export default function HomePage() {
    // Local state for search query and results
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    // Handle search request to OMDB API
    const handleSearch = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_OMDB_API_URL}/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&s=${query}&type=movie`
        );
        const data = await res.json();
        setMovies(data.Search || []);
    };

    // Filter duplicates by imdbID
    const uniqueMovies = movies.filter(
        (movie, index, self) =>
            index === self.findIndex((m) => m.imdbID === movie.imdbID)
    );

    return (
        <VStack spacing={6} align="stretch" p={6}>
            {/* Title */}
            <Heading size="2xl" color="blue.600">
                CinemaScope 🎬
            </Heading>

            {/* Search input + button */}
            <HStack>
                <Input
                    placeholder="Enter movie title..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button colorScheme="blue" onClick={handleSearch}>
                    Search
                </Button>
                
                {/* Navigation to Favorites page */}
                <Link href="/favorites">
                    <Button colorScheme="yellow" variant="outline">⭐ Favorites</Button>
                </Link>
            </HStack>

            {/* Render search results */}
            <VStack spacing={4} align="stretch">
                {uniqueMovies.map((m) => (
                    <Link href={`/movie/${m.imdbID}`} key={m.imdbID}>
                        <HStack spacing={4} borderWidth="1px" borderRadius="md" p={3}>
                            {/* Poster image */}
                            <Image
                                src={m.Poster !== 'N/A' ? m.Poster : '/placeholder-poster.png'}
                                alt={m.Title}
                                boxSize="80px"
                                objectFit="cover"
                                borderRadius="md"
                            />
                            {/* Movie title + year */}
                            <VStack align="start" spacing={1}>
                                <Text fontWeight="bold">{m.Title}</Text>
                                <Text color="gray.500">{m.Year}</Text>
                            </VStack>
                        </HStack>
                    </Link>
                ))}
            </VStack>
        </VStack>
    );
}
