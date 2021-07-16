import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import { deletePoll, getUserPolls } from "../../utils/db";
import { AuthContext } from "../../utils/Auth";
import DeleteAlert from "../Dashboard/DeleteAlert";

const PollCard = () => {
    const { currentUser } = useContext(AuthContext);
    const { colorMode } = useColorMode();
    const router = useRouter();
    const [userPolls, setUserPolls] = useState();

    const delPoll = (pollID) => {
        deletePoll(currentUser?.uid, pollID).then(() =>
            setUserPolls(userPolls.filter((item) => item.pollID != pollID))
        );
    };

    useEffect(() => {
        if (currentUser) {
            getUserPolls(currentUser.uid).then((userPolls) =>
                setUserPolls(userPolls)
            );
        }
    }, [currentUser]);

    return userPolls ? (
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
            {userPolls.map((element, idx) => {
                const { pollID, title } = element;
                return (
                    <Flex
                        key={pollID}
                        justify="space-between"
                        w="100%"
                        mb={idx == userPolls.length - 1 ? "0" : "4"}
                    >
                        <Text>{title}</Text>
                        <Flex>
                            <Button
                                onClick={() => router.push(`/poll/${pollID}`)}
                            >
                                View Poll
                            </Button>
                            <DeleteAlert deletePoll={delPoll} pollID={pollID} />
                        </Flex>
                    </Flex>
                );
            })}
        </Flex>
    ) : (
        <></>
    );
};

export default PollCard;