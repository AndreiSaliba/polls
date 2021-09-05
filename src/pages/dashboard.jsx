import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../utils/Auth";
import {
    Avatar,
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Tabs,
    Tab,
    TabList,
    TabPanels,
    TabPanel,
} from "@chakra-ui/react";
import firebase from "../utils/firebase";
import Head from "next/head";
import Header from "../components/Header";
import PollCard from "../components/Dashboard/PollCard";
import AuthCard from "../components/Dashboard/AuthCard";

const Dashboard = () => {
    const [pollsEmpty, setPollsEmpty] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const { currentUser } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(() => {
            !currentUser && router.push("/");
        }, 500);
        return () => clearTimeout(timeout);
    }, [currentUser, router]);

    useEffect(() => {
        pollsEmpty && setTabIndex(1);
    }, [pollsEmpty]);

    return (
        <>
            <Head>
                <title>{"Dashboard"}</title>
            </Head>
            <Box>
                <Header />
                <Center mt="10" mb="10">
                    <Flex flexDirection="column" alignItems="center">
                        <Flex
                            flexDir="column"
                            align="center"
                            w="500px"
                            maxW="90vw"
                            p="5"
                        >
                            <Avatar
                                size="xl"
                                mb="3"
                                src={currentUser?.photoURL}
                            />
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
                        <Tabs
                            index={tabIndex}
                            onChange={setTabIndex}
                            w="600px"
                            maxW="90vw"
                        >
                            <TabList>
                                <Tab
                                    _focus={{ boxShadow: "none" }}
                                    isDisabled={pollsEmpty}
                                >
                                    Polls
                                </Tab>
                                <Tab _focus={{ boxShadow: "none" }}>
                                    Connections
                                </Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel p="0">
                                    <PollCard setEmpty={setPollsEmpty} />
                                </TabPanel>
                                <TabPanel p="0">
                                    <AuthCard />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Flex>
                </Center>
            </Box>
        </>
    );
};

export default Dashboard;
