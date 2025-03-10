import { Providers } from "@/components/ui/Providers";
import { FavoritesProvider } from "@/features/favorites/FavoritesContext";
import { AuthProvider } from '@/features/auth/AuthContext';
import { Header } from "@/components/ui/Header";

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
                        <Providers>
                            {/* Global header visible on all pages */}
                            <Header />
                            {/* Page content */}
                            {children}
                        </Providers>
                    </FavoritesProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
