import { VStack, Heading } from "@chakra-ui/react";
import HomeActions from "./HomeActions";

export default function HomePageServer() {
    return (
        <VStack spacing={6} align="stretch" p={6}>
            {/* Page title */}
            <Heading size="2xl" color="blue.600">
                Search Movies
            </Heading>

            {/* Client component for interactive search */}
            <HomeActions />
        </VStack>
    );
}
