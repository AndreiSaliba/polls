import { Flex, Box, Heading, Button, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Flex
            align="center"
            justify="space-between"
            maxWidth="90vw"
            m="auto"
            mt="7"
        >
            <Heading fontSize="3xl" fontWeight="bold">
                Polls
            </Heading>
            <Box>
                <Button aria-label="Toggle Theme" mr="2">
                    Log In
                </Button>
                <Button aria-label="Toggle Theme" onClick={toggleColorMode}>
                    {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
            </Box>
        </Flex>
    );
};

export default Header;
