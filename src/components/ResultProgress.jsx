import { Box, Text, useColorMode } from "@chakra-ui/react";

const ResultProgress = ({ option, votes, total }) => {
    const { colorMode } = useColorMode();
    const percent =
        (Math.round((votes / total) * 100 + Number.EPSILON) * 100) / 100 || 0;

    return (
        <>
            <Box
                display="grid"
                minH="48px"
                mb={1.5}
                bg={colorMode === "dark" ? "whiteAlpha.200" : "gray.200"}
                borderRadius="md"
            >
                <Box
                    gridArea="1/1"
                    maxW={percent + "%"}
                    h="100%"
                    py={3}
                    bg={"blue.500"}
                    borderRadius="md"
                ></Box>
                <Text gridArea="1/1" alignSelf="center" px="5" marginR="8">
                    {option}
                </Text>
                <Text
                    px="5"
                    gridArea="1/1"
                    justifySelf="flex-end"
                    alignSelf="center"
                >
                    {percent + "%"}
                </Text>
            </Box>
        </>
    );
};

export default ResultProgress;
