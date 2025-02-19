'use client';
import { ChakraProvider } from '@chakra-ui/react';

export function Providers({ children }) {
    // Provide Chakra UI context for all client components
    return <ChakraProvider>{children}</ChakraProvider>;
}

