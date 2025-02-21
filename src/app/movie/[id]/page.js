import MovieDetails from './MovieDetails';

export default async function MoviePage({ params }) {
    const { id } = await params;

    // Fetch movie data on the server
    const res = await fetch(
        `${process.env.OMDB_API_URL}/?apikey=${process.env.OMDB_API_KEY}&i=${id}`,
        { cache: 'no-store' }
    );
    const movie = await res.json();

    return (
        <main>
            {/* Client component renders interactive UI */}
            <MovieDetails movie={movie} />
        </main>
    );
}