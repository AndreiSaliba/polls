import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getPoll } from "../../utils/db";
import { Center } from "@chakra-ui/react";
import Head from "next/head";
import Header from "../../components/Header";
import VoteCard from "../../components/VoteCard";

const Poll = () => {
    const router = useRouter();
    const { id } = router.query;
    const [pollData, setPollData] = useState();

    useEffect(() => {
        getPoll(id).then((doc) => setPollData(doc.data()));
    }, [id]);

    return (
        <>
            <Head>
                <title>{`${pollData?.title} - Polls`}</title>
            </Head>
            <Header />
            <Center mt="50px">
                {pollData && <VoteCard data={pollData} />}
            </Center>
        </>
    );
};

export default Poll;
