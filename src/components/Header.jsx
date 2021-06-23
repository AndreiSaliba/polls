import { useContext } from "react";
import NextLink from "next/link";
import { AuthContext } from "../utils/Auth";
import {
    Flex,
    Heading,
    Button,
    IconButton,
    Avatar,
    useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Header = ({ themeButtonOnly }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { currentUser, signOut } = useContext(AuthContext);

    return (
        <Flex
            align="center"
            justify={themeButtonOnly ? "flex-end" : "space-between"}
            width="90vw"
            m="auto"
            mt="7"
        >
            {!themeButtonOnly && (
                <Heading fontSize="3xl" fontWeight="bold">
                    Polls
                </Heading>
            )}

            {themeButtonOnly ? (
                <IconButton
                    aria-label="Toggle Theme"
                    onClick={toggleColorMode}
                    borderRadius="md"
                >
                    {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </IconButton>
            ) : (
                <Flex align="center">
                    {currentUser ? (
                        <Flex align="center">
                            <Heading mr="2" size="sm" fontWeight="semibold">
                                {currentUser?.displayName}
                            </Heading>
                            <Avatar
                                mr="3"
                                w="40px"
                                h="40px"
                                src={currentUser?.photoURL}
                                onClick={signOut}
                            />
                        </Flex>
                    ) : (
                        <NextLink href="/signin">
                            <Button aria-label="Sign In" mr="2">
                                Sign In
                            </Button>
                        </NextLink>
                    )}

                    <IconButton
                        aria-label="Toggle Theme"
                        onClick={toggleColorMode}
                        borderRadius="md"
                    >
                        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                    </IconButton>
                </Flex>
            )}
        </Flex>
    );
};

export default Header;
