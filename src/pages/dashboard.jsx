import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../utils/Auth";
import { Avatar, Box, Button, Center, Flex, Heading } from "@chakra-ui/react";
import firebase from "../utils/firebase";
import Header from "../components/Header";
import PollCard from "../components/Dashboard/PollCard";
import AuthCard from "../components/Dashboard/AuthCard";

const Dashboard = () => {
    const { currentUser } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(() => {
            !currentUser && router.push("/");
        }, 500);

        return () => clearTimeout(timeout);
    }, [currentUser, router]);

    return (
        <Box>
            <Header />
            <Center mt="10" mb="10">
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
                    <AuthCard />
                    <PollCard />
                </Flex>
            </Center>
        </Box>
    );
};

export default Dashboard;
