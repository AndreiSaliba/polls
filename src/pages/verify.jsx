import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Center, Box, Flex, Button, Heading, Text } from "@chakra-ui/react";
import { AuthContext } from "../utils/Auth";
import Header from "../components/Header";
import firebase from "../utils/firebase";

const Verify = () => {
    const { currentUser } = useContext(AuthContext);
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
                    maxWidth="370px"npm
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
                        To verify your account tap on the link in the email we&quot;ve sent.
                    </Text>
                    <Button
                        width="175px"
                        mt="5"
                        mb="-5"
                        onClick={() => {
                            if (!currentUser.emailVerified) {
                                firebase
                                    .auth()
                                    .currentUser.sendEmailVerification({
                                        url:
                                            process.env.NODE_ENV ===
                                            "production"
                                                ? "https://polls-as.vercel.app"
                                                : "http://localhost:3000/",
                                    });
                            } else if (currentUser.emailVerified) {
                                router.push("/");
                            }
                        }}
                    >
                        Resend Email
                    </Button>
                </Flex>
            </Center>
        </Box>
    );
};

export default Verify;
