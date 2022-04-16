/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../utils/Auth";
import { addVote } from "../utils/db";
import {
    Flex,
    Heading,
    Text,
    Button,
    useColorMode,
    useClipboard,
    useToast,
    Tooltip,
} from "@chakra-ui/react";
import { RadioGroup } from "@headlessui/react";
import moment from "moment";
import numeral from "numeral";
import VoteButton from "./VoteButton";

const VoteCard = ({ data, setView, updateData, ipAddress, hasVoted }) => {
    const { pollID, title, options, ipChecking, dateCreated } = data;
    const totalVotes = data.options.reduce(
        (totalVotes, option) => totalVotes + option.count,
        0
    );

    const { currentUser } = useContext(AuthContext);
    const [selected, setSelected] = useState("");
    const [hasVotedLocal, setHasVotedLocal] = useState(
        Array.from(
            JSON.parse(localStorage.getItem("userVotes")) ?? []
        ).includes(pollID)
    );

    const { onCopy } = useClipboard(window.location.href);
    const { colorMode } = useColorMode();
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
                // {...group}
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
                        <Tooltip
                            label={moment(
                                moment.unix(dateCreated.seconds)
                            ).format("Do MMMM YYYY - H:mm")}
                            placement="top"
                            gutter={3}
                            bg={colorMode === "dark" ? "gray.600" : "gray.300"}
                            color={colorMode === "dark" ? "white" : "black"}
                        >
                            <Text fontSize="xs" textAlign="right" pb="2px">
                                {moment(
                                    moment.unix(dateCreated.seconds)
                                ).fromNow()}
                            </Text>
                        </Tooltip>

                        <Tooltip
                            label="IP addresses are stored as SHA256 salted hashes."
                            placement="top"
                            gutter={3}
                            bg={colorMode === "dark" ? "gray.600" : "gray.300"}
                            color={colorMode === "dark" ? "white" : "black"}
                        >
                            <Text fontSize="xs" textAlign="right">{`${numeral(
                                totalVotes
                            ).format("0.[0]a")} ${
                                totalVotes == 1 ? "vote" : "votes"
                            }${
                                ipChecking ? " - IP Duplication Checking" : ""
                            }`}</Text>
                        </Tooltip>
                    </Flex>
                </Flex>
                <RadioGroup value={selected} onChange={setSelected}>
                    {options.map((element) => {
                        const { id, option } = element;
                        return (
                            <RadioGroup.Option value={id}>
                                {({ checked }) => (
                                    <VoteButton key={id} checked={checked}>
                                        {option}
                                    </VoteButton>
                                )}
                            </RadioGroup.Option>
                        );
                    })}
                </RadioGroup>
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
                        isDisabled={hasVotedLocal}
                        onClick={() => {
                            if (selected) {
                                addVote(
                                    pollID,
                                    currentUser?.uid,
                                    selected,
                                    ipAddress
                                ).then((res) => {
                                    updateData();
                                    setHasVotedLocal(true);
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
