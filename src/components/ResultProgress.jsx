import { Box, Text, useColorMode, useRadio } from "@chakra-ui/react";

const ResultProgress = ({ option, votes, total }) => {
    const { colorMode } = useColorMode();
    const percent =
        (Math.round((votes / total) * 100 + Number.EPSILON) * 100) / 100 || 0;
    return (
        <>
            <Box
                mb={1.5}
                h="48px"
                bg={colorMode === "dark" ? "whiteAlpha.200" : "gray.200"}
                borderRadius="md"
                display="grid"
            >
                <Box
                    w={percent + "%"}
                    h="100%"
                    py={3}
                    bg={"blue.500"}
                    borderRadius="md"
                    boxShadow="sm"
                    gridArea="1/1"
                ></Box>
                <Text
                    px="5"
                    gridArea="1/1"
                    alignSelf="center"
                >
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
