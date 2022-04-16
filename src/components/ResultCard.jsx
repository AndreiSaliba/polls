/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React, { useState } from "react";
import {
    Flex,
    Button,
    Heading,
    Text,
    useColorMode,
    useClipboard,
    useToast,
    Tooltip,
} from "@chakra-ui/react";
import moment from "moment";
import numeral from "numeral";
import ResultProgress from "./ResultProgress";

const ResultCard = ({ data, setView }) => {
    const { pollID, title, options, ipChecking, dateCreated } = data;
    const totalVotes = data.options.reduce(
        (totalVotes, option) => totalVotes + option.count,
        0
    );

    const { onCopy } = useClipboard(window.location.href);
    const { colorMode } = useColorMode();
    const toast = useToast();

    const [hasVotedLocal] = useState(
        Array.from(
            JSON.parse(localStorage.getItem("userVotes")) ?? []
        ).includes(pollID)
    );

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
                flexDirection="column"
                justify="space-between"
                w="600px"
                maxW="90vw"
                p="5"
                bg={`${colorMode === "dark" ? "whiteAlpha.200" : "gray.50"}`}
                borderRadius="lg"
                borderWidth="1px"
            >
                <Flex justify="space-between" align="center" maxW="90vw" mb="3">
                    <Heading size="lg">{title}</Heading>
                    <Flex
                        flexDirection="column"
                        align="flex-end"
                        justify="center"
                        ml="3"
                    >
                        <Tooltip
                            label={moment(
                                moment.unix(dateCreated.seconds)
                            ).format("Do MMMM YYYY - H:mm")}
                            placement="top"
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
                {options.map((element, idx) => {
                    const { option, count } = element;
                    return (
                        <ResultProgress
                            key={idx}
                            option={option}
                            votes={count}
                            total={totalVotes}
                        />
                    );
                })}
                <Flex justify="space-between" wrap="wrap" mt="3">
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
                        {!hasVotedLocal && (
                            <Button
                                css={ButtonCSS}
                                onClick={() => setView("vote")}
                            >
                                Vote
                            </Button>
                        )}
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
};

export default ResultCard;
