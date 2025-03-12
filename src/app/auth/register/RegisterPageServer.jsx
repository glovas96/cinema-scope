import { Box, Heading } from "@chakra-ui/react";
import RegisterActions from "./RegisterActions";

export default function RegisterPageServer() {
    return (
        <Box maxW="400px" mx="auto" mt="80px">
            {/* Page title */}
            <Heading mb="6" textAlign="center">
                Register
            </Heading>

            {/* Client component renders interactive form */}
            <RegisterActions />
        </Box>
    );
}
