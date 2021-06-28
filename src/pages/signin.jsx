import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../utils/Auth";
import {
    Center,
    Box,
    Flex,
    Button,
    Heading,
    LightMode,
} from "@chakra-ui/react";
import { FaGoogle, FaGithub, FaTwitter } from "react-icons/fa";
import Header from "../components/Header";

const Signin = () => {
    const {
        currentUser,
        signinWithGoogle,
        signinWithGithub,
        signinWithTwitter,
    } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        currentUser && router.push("/");
    }, [router]);

    return (
        <Box>
            <Header themeButtonOnly />
            <Center w="100%" h="92.5vh">
                <Flex
                    p="10"
                    borderWidth="1px"
                    borderRadius="md"
                    flexDir="column"
                    align="center"
                >
                    <Heading size="md" mb="5" mt="-5">
                        Sign in with
                    </Heading>
                    <LightMode>
                        <Button
                            leftIcon={<FaGoogle />}
                            m="1"
                            w="250px"
                            h="12"
                            size="lg"
                            color="black"
                            _hover={{ backgroundColor: "gray.200" }}
                            onClick={signinWithGoogle}
                        >
                            Google
                        </Button>
                        <Button
                            leftIcon={<FaTwitter />}
                            m="1"
                            w="250px"
                            h="12"
                            size="lg"
                            colorScheme="twitter"
                            _hover={{ backgroundColor: "twitter.700" }}
                            onClick={signinWithTwitter}
                        >
                            Twitter
                        </Button>
                        <Button
                            leftIcon={<FaGithub />}
                            m="1"
                            w="250px"
                            h="12"
                            size="lg"
                            color="white"
                            backgroundColor="black"
                            _hover={{ backgroundColor: "#0a0a0a" }}
                            _active={{ backgroundColor: "#0a0a0a" }}
                            onClick={signinWithGithub}
                        >
                            Github
                        </Button>
                    </LightMode>
                </Flex>
            </Center>
        </Box>
    );
};

export default Signin;
