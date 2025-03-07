'use client';
import { VStack, Heading, SimpleGrid, Image, Text, Box, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useFavorites } from '@/features/favorites/FavoritesContext';
import { useRouter } from 'next/navigation'; // router for back button

export default function FavoritesPage() {
    const { favorites } = useFavorites();
    const router = useRouter(); // init router

    return (
        <VStack spacing={6} align="stretch" p={6}>
            {/* Back button (navigate to previous page) */}
            <Button onClick={() => router.back()} colorScheme="gray" variant="outline" size="md" alignSelf="flex-start">
                ⬅ Back
            </Button>

            {/* Page title */}
            <Heading size="2xl" color="blue.600">My Favorites ⭐</Heading>

            {/* Empty state when no favorites */}
            {favorites.length === 0 ? (
                <Box borderWidth="1px" borderRadius="md" p={6} textAlign="center">
                    <Text color="gray.600">No favorites yet. Add movies you love!</Text>
                </Box>
            ) : (
                /* Responsive grid of favorite movies */
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
                    {favorites.map((m) => (
                        <Link href={`/movie/${m.imdbID}`} key={m.imdbID}>
                            <Box
                                borderWidth="1px"
                                borderRadius="md"
                                p={3}
                                _hover={{ shadow: 'md' }} // hover effect for better UX
                            >
                                {/* Poster image with fallback */}
                                <Image
                                    src={m.Poster !== 'N/A' ? m.Poster : '/placeholder-poster.png'}
                                    alt={m.Title}
                                    w="100%"
                                    h="240px"
                                    objectFit="cover"
                                    borderRadius="md"
                                />
                                {/* Movie title + year */}
                                <VStack align="start" spacing={1} mt={3}>
                                    <Text fontWeight="bold" noOfLines={1}>{m.Title}</Text>
                                    <Text color="gray.500">{m.Year}</Text>
                                </VStack>
                            </Box>
                        </Link>
                    ))}
                </SimpleGrid>
            )}
        </VStack>
    );
}
