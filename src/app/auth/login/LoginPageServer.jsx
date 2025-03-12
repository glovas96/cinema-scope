import { Box, Heading } from "@chakra-ui/react";
import LoginActions from "./LoginActions";

export default function LoginPageServer() {
    return (
        <Box maxW="400px" mx="auto" mt="80px">
            {/* Page title */}
            <Heading mb="6" textAlign="center">
                Login
            </Heading>

            {/* Client component renders interactive form */}
            <LoginActions />
        </Box>
    );
}
