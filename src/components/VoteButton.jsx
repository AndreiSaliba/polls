import { Box, useColorMode } from "@chakra-ui/react";

const VoteButton = ({ checked, children }) => {
    const { colorMode } = useColorMode();

    return (
        <Box
            px={5}
            py={3}
            mb={1.5}
            bg={
                checked
                    ? colorMode === "dark"
                        ? "blue.500"
                        : "blue.400"
                    : colorMode === "dark"
                    ? "whiteAlpha.200"
                    : "gray.200"
            }
            borderRadius="md"
            cursor="pointer"
        >
            {children}
        </Box>
    );
};

export default VoteButton;
