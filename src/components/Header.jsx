import { useContext } from "react";
import Link from "next/link";
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
    const { currentUser } = useContext(AuthContext);

    return (
        <Flex
            align="center"
            justify={themeButtonOnly ? "flex-end" : "space-between"}
            w="90vw"
            m="auto"
            mt="7"
        >
            {themeButtonOnly ? (
                <IconButton
                    aria-label="Toggle Theme"
                    onClick={toggleColorMode}
                    borderRadius="md"
                >
                    {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </IconButton>
            ) : (
                <>
                    <Link href="/">
                        <a>
                            <Heading fontSize="3xl" fontWeight="bold">
                                Polls
                            </Heading>
                        </a>
                    </Link>

                    <Flex align="center">
                        {currentUser ? (
                            <Link href="/dashboard">
                                <a>
                                    <Avatar
                                        mr="3"
                                        w="40px"
                                        h="40px"
                                        src={currentUser?.photoURL}
                                    />
                                </a>
                            </Link>
                        ) : (
                            <Link href="/signin">
                                <a>
                                    <Button aria-label="Sign In" mr="2">
                                        Sign In
                                    </Button>
                                </a>
                            </Link>
                        )}

                        <IconButton
                            aria-label="Toggle Theme"
                            onClick={toggleColorMode}
                            borderRadius="md"
                        >
                            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                        </IconButton>
                    </Flex>
                </>
            )}
        </Flex>
    );
};

export default Header;
