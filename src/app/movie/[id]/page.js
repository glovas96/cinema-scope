import MoviePageServer from "./MoviePageServer";

export default async function Page({ params }) {
    const { id } = await params;

    // Fetch movie data on the server
    try {
        const res = await fetch(
            `${process.env.OMDB_API_URL}/?apikey=${process.env.OMDB_API_KEY}&i=${id}`,
            { cache: 'no-store' }
        );

        // check HTTP response
        if (!res.ok) throw new Error();

        const movie = await res.json();

        return (
            <main>
                {/* Client component renders interactive UI */}
                <MoviePageServer movie={movie} />
            </main>
        );

    } catch (error) {
        // fallback UI when error
        return <p>Error loading movie details 😢</p>;
    }
}
