import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Button, Flex, Heading, Text, useColorMode } from "@chakra-ui/react";
import { deletePoll, getUserPolls } from "../../utils/db";
import { AuthContext } from "../../utils/Auth";
import DeleteAlert from "../Dashboard/DeleteAlert";

const PollCard = ({ setEmpty }) => {
    const [userPolls, setUserPolls] = useState();
    const { currentUser } = useContext(AuthContext);
    const { colorMode } = useColorMode();
    const router = useRouter();

    useEffect(() => {
        if (currentUser) {
            getUserPolls(currentUser.uid).then((userPolls) => {
                setUserPolls(userPolls);
            });
        }
    }, [currentUser]);

    useEffect(() => {
        setEmpty(userPolls?.length <= 0);
    }, [userPolls]);

    return userPolls?.length > 0 ? (
        <Flex
            flexDirection="column"
            w="600px"
            maxW="90vw"
            mt="5"
            p="5"
            bg={colorMode === "dark" ? "whiteAlpha.200" : "gray.50"}
            borderRadius="lg"
            borderWidth="1px"
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
                        <Text fontSize="lg" fontWeight="semibold">
                            {title}
                        </Text>
                        <Flex>
                            <Button
                                onClick={() => router.push(`/poll/${pollID}`)}
                            >
                                View Poll
                            </Button>
                            <DeleteAlert
                                pollID={pollID}
                                deletePoll={(pollID) => {
                                    deletePoll(currentUser?.uid, pollID).then(
                                        () =>
                                            setUserPolls(
                                                userPolls.filter(
                                                    (item) =>
                                                        item.pollID != pollID
                                                )
                                            )
                                    );
                                }}
                            />
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
