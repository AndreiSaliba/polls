import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getPoll } from "../../utils/db";
import { Center } from "@chakra-ui/react";
import Head from "next/head";
import Header from "../../components/Header";
import VoteCard from "../../components/VoteCard";
import ResultCard from "../../components/ResultCard";

const Poll = () => {
    const router = useRouter();
    const { id } = router.query;
    const [pollData, setPollData] = useState();
    const [view, setView] = useState("vote");

    const updateData = () => {
        getPoll(id).then((doc) => setPollData(doc.data()));
    };

    useEffect(() => updateData(), [id]);

    return (
        <>
            <Head>
                <title>{`${pollData?.title} - Polls`}</title>
            </Head>
            <Header />
            <Center mt="50px">
                {pollData &&
                    (view === "vote" ? (
                        <VoteCard
                            data={pollData}
                            setView={setView}
                            updateData={updateData}
                        />
                    ) : (
                        <ResultCard data={pollData} setView={setView} />
                    ))}
            </Center>
        </>
    );
};

export default Poll;
