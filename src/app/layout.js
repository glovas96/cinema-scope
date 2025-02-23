import { Providers } from './providers';
import { FavoritesProvider } from './context/FavoritesContext';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                {/* Global metadata for SEO */}
                <title>CinemaScope 🎬</title>
                <meta name="description" content="Movie search app built with Next.js + Chakra UI" />
            </head>
            <body>
                {/* Favorites context wraps the app (global state for saved movies) */}
                <FavoritesProvider>
                    {/* Chakra UI provider (UI theme + components context) */}
                    <Providers>{children}</Providers>
                </FavoritesProvider>
            </body>
        </html>
    );
}
