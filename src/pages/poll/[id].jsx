import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getPoll } from "../../utils/db";
import { Center } from "@chakra-ui/react";
import Head from "next/head";
import Header from "../../components/Header";
import VoteCard from "../../components/VoteCard";
import ResultCard from "../../components/ResultCard";

const Poll = ({ ip }) => {
    const router = useRouter();
    const { id } = router.query;
    const [pollData, setPollData] = useState();
    const [view, setView] = useState("vote");

    console.log(ip);

    const updateData = () => {
        getPoll(id).then((doc) => {
            setPollData(doc.data());
            if (
                Array.from(
                    JSON.parse(localStorage.getItem("userVotes")) ?? []
                ).includes(doc.data()?.pollID) ||
                false
            ) {
                setView("results");
            }
        });
    };

    useEffect(() => updateData(), [id]);

    return (
        <>
            <Head>
                <title>{pollData?.title}</title>
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

Poll.getInitialProps = async ({ req, res }) => {
    const ip = req.connection.remoteAddress;
    return { ip };
};
