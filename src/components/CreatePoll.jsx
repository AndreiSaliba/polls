import { AddIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    IconButton,
    Input,
    useColorMode,
} from "@chakra-ui/react";

const CreatePoll = () => {
    const { colorMode } = useColorMode();

    return (
        <Flex
            w="600px"
            maxWidth="90vw"
            p="5"
            backgroundColor={`${
                colorMode === "dark" ? "whiteAlpha.200" : "gray.50"
            }`}
            borderWidth="1px"
            borderRadius="lg"
            flexDirection="column"
            justify="space-between"
        >
            <Box>
                <Box
                    contentEditable
                    placeholder="Title"
                    pl="4"
                    fontSize="xl"
                    fontWeight="semibold"
                    css={`
                        outline: none;
                        &:empty::before {
                            content: attr(placeholder);
                        }
                    `}
                ></Box>
                <Box mt="2">
                    <Input placeholder="Enter poll option" mt="3" />
                    <Input placeholder="Enter poll option" mt="3" />
                    <Input placeholder="Enter poll option" mt="3" />
                    <Input placeholder="Enter poll option" mt="3" />
                    <Input placeholder="Enter poll option" mt="3" />
                    <Flex mt="3">
                        <Input placeholder="Enter poll option" />
                        <IconButton
                            ml="3"
                            borderRadius="md"
                            backgroundColor=""
                            _hover={{ backgroundColor: "gray.300" }}
                            _active={{ backgroundColor: "gray.400" }}
                        >
                            <AddIcon />
                        </IconButton>
                    </Flex>
                </Box>
            </Box>
            <Flex justify="flex-end" mt="7">
                <Button>Create Poll</Button>
            </Flex>
        </Flex>
    );
};

export default CreatePoll;
