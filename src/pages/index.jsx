import { Center } from "@chakra-ui/react";
import CreatePoll from "../components/CreatePoll";
import Header from "../components/Header";

const Home = () => {
    return (
        <>
            <Header />
            <Center mt="50px">
                <CreatePoll />
            </Center>
        </>
    );
};

export default Home;
