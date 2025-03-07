'use client';
import { useState } from 'react';
import {
    Heading,
    Button,
    Input,
    VStack,
    HStack,
    Image,
    Text,
    Skeleton,
    Select,
    useToast,
} from '@chakra-ui/react';
import Link from 'next/link';

export default function HomePage() {
    // --- State management ---
    const [query, setQuery] = useState('');     // search query
    const [movies, setMovies] = useState([]);  // movies with details
    const [loading, setLoading] = useState(false); // skeleton state
    const [genre, setGenre] = useState('');    // filter by genre
    const [year, setYear] = useState('');      // filter by year
    const [page, setPage] = useState(1);       // current page
    const [hasMore, setHasMore] = useState(false); // flag for more results
    const [totalResults, setTotalResults] = useState(0); // total movies count
    const toast = useToast();                  // notifications

    // --- Search handler ---
    const handleSearch = async (reset = true) => {
        setLoading(true); // show skeleton
        try {
            // 1. Search by title with page param
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_OMDB_API_URL}/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&s=${query}&type=movie&page=${reset ? 1 : page}`
            );
            const data = await res.json();
            const baseResults = data.Search || [];

            // 2. Fetch details for each imdbID (to get Genre/Year)
            const details = await Promise.all(
                baseResults.map((m) =>
                    fetch(
                        `${process.env.NEXT_PUBLIC_OMDB_API_URL}/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&i=${m.imdbID}`
                    ).then((r) => r.json())
                )
            );

            // 3. Apply filters (genre + year)
            const filtered = details.filter(
                (m) =>
                    (!genre || m.Genre?.includes(genre)) &&
                    (!year || m.Year === String(year))
            );

            // 4. Save results (reset or append)
            if (reset) {
                setMovies(filtered);
                setPage(2); // next page
            } else {
                setMovies((prev) => [...prev, ...filtered]);
                setPage((prev) => prev + 1);
            }

            // 5. Save total results count
            setTotalResults(Number(data.totalResults) || 0);

            // 6. Check if more results exist
            setHasMore(Number(data.totalResults) > (reset ? filtered.length : movies.length + filtered.length));

            // success toast
            toast({
                title: 'Search complete',
                description: `${filtered.length} movies loaded`,
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            // error toast
            toast({
                title: 'Error',
                description: 'Failed to fetch movies',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false); // hide skeleton
        }
    };

    return (
        <VStack spacing={6} align="stretch" p={6}>
            {/* Title */}
            <Heading size="2xl" color="blue.600">
                CinemaScope 🎬
            </Heading>

            {/* Search input + filters + buttons */}
            <HStack spacing={4} align="stretch">
                {/* Input field */}
                <Input
                    flex="1"
                    placeholder="Enter movie title..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                {/* Genre filter */}
                <Select flex="1" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
                    <option value="Action">Action</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Drama">Drama</option>
                    <option value="Horror">Horror</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                </Select>

                {/* Year filter */}
                <Select flex="1" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)}>
                    {Array.from({ length: 30 }, (_, i) => {
                        const y = 2025 - i;
                        return (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        );
                    })}
                </Select>

                {/* Search button */}
                <Button
                    colorScheme="blue"
                    onClick={() => handleSearch(true)}
                    minW="120px"
                    flexShrink={0} // prevent shrinking
                >
                    Search
                </Button>

                {/* Favorites button */}
                <Link href="/favorites">
                    <Button colorScheme="yellow" variant="outline" minW="120px" flexShrink={0}>
                        ⭐ Favorites
                    </Button>
                </Link>
            </HStack>

            {/* Render search results */}
            <VStack spacing={4} align="stretch">
                {loading ? (
                    // Skeleton loaders while fetching
                    Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} height="100px" borderRadius="md" />
                    ))
                ) : (
                    movies.map((m) => (
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
                                {/* Movie info */}
                                <VStack align="start" spacing={1}>
                                    <Text fontWeight="bold">{m.Title}</Text>
                                    <Text color="gray.500">{m.Year}</Text>
                                    <Text color="gray.600">{m.Genre}</Text>
                                </VStack>
                            </HStack>
                        </Link>
                    ))
                )}
            </VStack>

            {/* Progress indicator */}
            {totalResults > 0 && (
                <Text color="gray.600">
                    Showing {movies.length} of {totalResults} results
                </Text>
            )}

            {/* Load more button */}
            {hasMore && !loading && (
                <Button
                    onClick={() => handleSearch(false)}
                    colorScheme="blue"
                    variant="outline"
                >
                    Load more
                </Button>
            )}
        </VStack>
    );
}
