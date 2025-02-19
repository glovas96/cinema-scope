import { Providers } from './providers';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                {/* Global metadata for SEO */}
                <title>CinemaScope 🎬</title>
                <meta name="description" content="Movie search app built with Next.js + Chakra UI" />
            </head>
            <body>
                {/* Wrap all children with ChakraProvider */}
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}