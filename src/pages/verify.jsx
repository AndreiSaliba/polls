import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../utils/Auth";
import firebase from "../utils/firebase";
import { Center, Box, Flex, Button, Heading, Text } from "@chakra-ui/react";
import Header from "../components/Header";

const Verify = () => {
    const { currentUser } = useContext(AuthContext);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        (currentUser?.emailVerified || !currentUser) && router.push("/");
    }, [currentUser, router]);

    return (
        <Box>
            <Header themeButtonOnly />
            <Center w="100%" h="92.5vh">
                <Flex
                    p="10"
                    maxWidth="370px"
                    borderWidth="1px"
                    borderRadius="md"
                    flexDir="column"
                    align="center"
                >
                    <Heading
                        size="md"
                        mb="2"
                        mt="-5"
                        fontSize="x-large"
                        textAlign="center"
                    >
                        Verify your email address
                    </Heading>
                    <Text textAlign="center" fontSize="md">
                        To verify your account tap on the link in the email
                        we&apos;ve sent.
                    </Text>
                    <Text color="#ff0033" mt="3">
                        {error}
                    </Text>
                        <Button mt="4"
                            width="175px"
                            mb="-5"
                            colorScheme="blue"
                            onClick={() => {
                                firebase
                                    .auth()
                                    .currentUser.reload()
                                    .then(() => {
                                        if (currentUser.emailVerified) {
                                            router.push("/");
                                        } else if (!currentUser.emailVerified) {
                                            setError(
                                                "Please verify your email."
                                            );
                                        }
                                    });
                            }}
                        >
                            Continue
                        </Button>
                </Flex>
            </Center>
        </Box>
    );
};

export default Verify;
