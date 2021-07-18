import { Box, useColorMode, useRadio } from "@chakra-ui/react";

const VoteButton = (props) => {
    const { getInputProps, getCheckboxProps } = useRadio(props);
    const input = getInputProps();
    const checkbox = getCheckboxProps();
    const { colorMode } = useColorMode();

    return (
        <Box as="label">
            <input {...input} />
            <Box
                {...checkbox}
                px={5}
                py={3}
                mb={1.5}
                bg={colorMode === "dark" ? "whiteAlpha.200" : "gray.200"}
                borderRadius="md"
                cursor="pointer"
                _checked={{
                    bg: "blue.500",
                    color: "white",
                }}
            >
                {props.children}
            </Box>
        </Box>
    );
};

export default VoteButton;
