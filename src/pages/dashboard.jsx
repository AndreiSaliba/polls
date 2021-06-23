import { useContext, useEffect } from "react";
import { Avatar, Box, Button, Center, Flex, Heading } from "@chakra-ui/react";
import { AuthContext } from "../utils/Auth";
import Header from "../components/Header";
import firebase from "../utils/firebase";
import { useRouter } from "next/router";

const Dashboard = () => {
    const { currentUser } = useContext(AuthContext);
    const router = useRouter();
    useEffect(() => {
        !currentUser && router.push("/");
    }, [currentUser, router]);

    return (
        <Box>
            <Header />
            <Center mt="20">
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
                    <Button mt="5" onClick={() => firebase.auth().signOut()}>
                        Sign Out
                    </Button>
                </Flex>
            </Center>
        </Box>
    );
};

export default Dashboard;
