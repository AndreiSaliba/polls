import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getPoll } from "../../utils/db";
import { Center } from "@chakra-ui/react";
import Head from "next/head";
import Header from "../../components/Header";
import VoteCard from "../../components/VoteCard";
import ResultCard from "../../components/ResultCard";
import sha256 from "crypto-js/sha256";

const Poll = ({ ip }) => {
    const [view, setView] = useState("vote");
    const [pollData, setPollData] = useState();
    const router = useRouter();
    const { id } = router.query;

    const updateData = () => {
        getPoll(id).then((doc) => {
            setPollData(doc.data());
            Array.from(
                JSON.parse(localStorage.getItem("userVotes")) ?? []
            ).includes(doc.data()?.pollID) && setView("results");
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
                            ipAddress={ip}
                        />
                    ) : (
                        <ResultCard data={pollData} setView={setView} />
                    ))}
            </Center>
        </>
    );
};

export default Poll;

export const getServerSideProps = async ({ req }) => {
    const ip = req.headers["x-real-ip"] || null;
    return {
        props: { ip: sha256(ip + process.env.IP_HASH_SECRET).toString() },
    };
};
