import { Providers } from './providers';
import { FavoritesProvider } from './context/FavoritesContext';
import { AuthProvider } from '@/features/auth/AuthContext';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <title>CinemaScope 🎬</title>
                <meta
                    name="description"
                    content="Movie search app built with Next.js + Chakra UI"
                />
            </head>
            <body>
                {/* AuthProvider must wrap everything */}
                <AuthProvider>
                    {/* Favorites depends on user, so it goes inside AuthProvider */}
                    <FavoritesProvider>
                        {/* Chakra UI provider */}
                        <Providers>{children}</Providers>
                    </FavoritesProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
