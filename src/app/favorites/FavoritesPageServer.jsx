import { VStack, Heading } from "@chakra-ui/react";
import FavoritesActions from "./FavoritesActions";

export default function FavoritesPageServer() {
    return (
        <VStack spacing={6} align="stretch" p={6}>
            {/* Page title */}
            <Heading size="2xl" color="blue.600">
                My Favorites ⭐
            </Heading>

            {/* Client component renders interactive list */}
            <FavoritesActions />
        </VStack>
    );
}