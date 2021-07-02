import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../utils/Auth";
import firebase from "../utils/firebase";
import {
    Avatar,
    Box,
    Button,
    Center,
    Flex,
    Heading,
    useColorMode,
} from "@chakra-ui/react";
import Header from "../components/Header";
import AuthConnection from "../components/AuthConnection";

const Dashboard = () => {
    const { currentUser } = useContext(AuthContext);
    const { colorMode } = useColorMode();
    const router = useRouter();
    useEffect(() => {
        !currentUser && router.push("/");
    }, [currentUser, router]);

    return (
        <Box>
            <Header />
            <Center mt="10">
                <Flex flexDirection="column" alignItems="center">
                    <Flex
                        p="5"
                        width="500px"
                        maxWidth="90vw"
                        flexDir="column"
                        align="center"
                    >
                        <Avatar size="xl" mb="3" src={currentUser?.photoURL} />
                        <Heading>{currentUser?.displayName}</Heading>
                        <Heading size="sm" fontWeight="semibold">
                            {currentUser?.email}
                        </Heading>
                        <Button
                            mt="5"
                            onClick={() => firebase.auth().signOut()}
                        >
                            Sign Out
                        </Button>
                    </Flex>
                    <Flex
                        flexDirection="column"
                        width="600px"
                        maxWidth="90vw"
                        marginTop="7"
                        padding="5"
                        borderRadius="lg"
                        borderWidth="1px"
                        backgroundColor={
                            colorMode === "dark" ? "whiteAlpha.200" : "gray.50"
                        }
                    >
                        <AuthConnection providerId="google.com" />
                        <AuthConnection providerId="twitter.com" />
                        <AuthConnection providerId="github.com" bottom />
                    </Flex>
                </Flex>
            </Center>
        </Box>
    );
};

export default Dashboard;
