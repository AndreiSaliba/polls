/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React, { useContext, useState } from "react";
import { AuthContext } from "../utils/Auth";
import { addVote } from "../utils/db";
import {
    Flex,
    Heading,
    Text,
    Button,
    useColorMode,
    useClipboard,
    useRadioGroup,
    useToast,
} from "@chakra-ui/react";
import moment from "moment";
import numeral from "numeral";
import VoteButton from "./VoteButton";

const VoteCard = ({ data, setView, updateData }) => {
    const { pollID, title, options, ipChecking, dateCreated } = data;
    const totalVotes = data.options.reduce(
        (totalVotes, option) => totalVotes + option.count,
        0
    );

    const { currentUser } = useContext(AuthContext);
    const [selected, setSelected] = useState("");
    const [userVotedLocal, setUserVotedLocal] = useState(
        Array.from(
            JSON.parse(localStorage.getItem("userVotes")) ?? []
        ).includes(pollID) || false
    );

    const { colorMode } = useColorMode();
    const { onCopy } = useClipboard(window.location.href);
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "Poll",
        onChange: setSelected,
    });
    const group = getRootProps();
    const toast = useToast();

    const ButtonCSS = (theme) => `
            margin-top: 5px;
            background-color: ${
                colorMode === "dark"
                    ? theme.colors.whiteAlpha[200]
                    : theme.colors.gray[200]
            };
            &:hover { 
                background-color: ${
                    colorMode === "dark"
                        ? theme.colors.whiteAlpha[300]
                        : theme.colors.gray[300]
                }
            }
            &:active { 
                background-color: ${
                    colorMode === "dark"
                        ? theme.colors.whiteAlpha[400]
                        : theme.colors.gray[400]
                }
            }
        `;

    return (
        <>
            <Flex
                w="600px"
                maxWidth="90vw"
                p="5"
                borderWidth="1px"
                backgroundColor={`${
                    colorMode === "dark" ? "whiteAlpha.200" : "gray.50"
                }`}
                borderRadius="lg"
                flexDirection="column"
                justify="space-between"
                {...group}
            >
                <Flex
                    justify="space-between"
                    align="center"
                    mb="3"
                    maxWidth="90vw"
                >
                    <Heading size="lg">{title}</Heading>
                    <Flex
                        flexDirection="column"
                        align="flex-end"
                        justify="center"
                    >
                        <Text fontSize="xs" textAlign="right" pb="2px">
                            {moment(moment.unix(dateCreated.seconds)).fromNow()}
                        </Text>
                        <Text fontSize="xs" textAlign="right">{`${numeral(
                            totalVotes
                        ).format("0.[0]a")} ${
                            totalVotes == 1 ? "vote" : "votes"
                        }${
                            ipChecking ? " - IP Duplication Checking" : ""
                        }`}</Text>
                    </Flex>
                </Flex>
                {options.map((element, idx) => {
                    const { option: value } = element;
                    const radio = getRadioProps({ value });
                    return (
                        <VoteButton key={value + idx} {...radio}>
                            {value}
                        </VoteButton>
                    );
                })}
                <Flex mt="3" justify="space-between" wrap="wrap">
                    <Flex wrap="wrap">
                        <Button
                            css={[
                                css`
                                    margin-right: 5px;
                                `,
                                ButtonCSS,
                            ]}
                            onClick={() => {
                                onCopy();
                                toast({
                                    description: "Link Copied",
                                    status: "info",
                                    duration: 3000,
                                    isClosable: true,
                                });
                            }}
                        >
                            Copy Link
                        </Button>
                        <Button
                            css={ButtonCSS}
                            onClick={() => setView("results")}
                        >
                            Results
                        </Button>
                    </Flex>

                    <Button
                        css={[
                            css`
                                min-width: 90px;
                            `,
                            ButtonCSS,
                        ]}
                        isDisabled={userVotedLocal}
                        onClick={() => {
                            if (selected) {
                                addVote(
                                    pollID,
                                    currentUser?.uid,
                                    selected
                                ).then((res) => {
                                    updateData();
                                    setUserVotedLocal(true);
                                    if (res.code === "already-voted") {
                                        toast({
                                            description: res.message,
                                            status: "error",
                                            duration: 5000,
                                            isClosable: true,
                                        });

                                        let array =
                                            JSON.parse(
                                                localStorage.getItem(
                                                    "userVotes"
                                                )
                                            ) ?? [];
                                        array.push(pollID);
                                        localStorage.setItem(
                                            "userVotes",
                                            JSON.stringify(array)
                                        );
                                    }
                                    if (res.code === "success") {
                                        toast({
                                            description:
                                                "Your vote has been counted",
                                            status: "info",
                                            duration: 3000,
                                            isClosable: true,
                                        });
                                        setView("results");
                                    }
                                });
                            }
                        }}
                    >
                        Vote
                    </Button>
                </Flex>
            </Flex>
        </>
    );
};

export default VoteCard;
