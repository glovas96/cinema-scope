import MovieDetails from '../../components/MovieDetails';

export default async function MoviePage({ params }) {
    const { id } = await params;

    // Fetch movie data on the server
    try {
        const res = await fetch(
            `${process.env.OMDB_API_URL}/?apikey=${process.env.OMDB_API_KEY}&i=${id}`,
            { cache: 'no-store' }
        );

        // check HTTP response
        if (!res.ok) throw new Error;

        const movie = await res.json();

        return (
            <main>
                {/* Client component renders interactive UI */}
                <MovieDetails movie={movie} />
            </main>
        );

    } catch (error) {
        // fallback UI when error
        return <p>Error loading movie details 😢</p>;
    }
}



