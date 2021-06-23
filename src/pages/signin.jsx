import { useContext, useState } from "react";
import {
    Center,
    Box,
    Flex,
    Button,
    Heading,
    Text,
    LightMode,
    useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaGoogle, FaGithub, FaTwitter } from "react-icons/fa";
import { AuthContext } from "../utils/Auth";
import Header from "../components/Header";

const Signin = () => {
    const [error, setError] = useState("");
    const { currentUser, signinWithGoogle, signinWithGithub } =
        useContext(AuthContext);
    const router = useRouter();
    const toast = useToast();
    currentUser && router.push("/");

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
                            onClick={() => {
                                try {
                                    signinWithGoogle();
                                } catch (error) {
                                    
                                }

                                // .catch((error) => {

                                //     // setError(
                                //     //     "Account already exists with other provider. Please Login with other provider and link new provider in your dashboard."
                                //     // );
                                // });
                            }}
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
                    {error && (
                        <Text mt="3" colorScheme="red">
                            {error}
                        </Text>
                    )}
                </Flex>
            </Center>
        </Box>
    );
};

export default Signin;
