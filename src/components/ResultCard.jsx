/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React, { useContext, useState } from "react";
import { AuthContext } from "../utils/Auth";
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
import ResultProgress from "./ResultProgress";

const ResultCard = ({ data, setView }) => {
    const { title, options, ipChecking, dateCreated } = data;
    const totalVotes = data.options.reduce(
        (totalVotes, option) => totalVotes + option.count,
        0
    );

    const { colorMode } = useColorMode();
    const { onCopy } = useClipboard(window.location.href);
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
                        ml="3"
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
                <Flex mt="3" justify="space-between" wrap="wrap">
                    <Flex wrap="wrap">
                        <Button css={ButtonCSS} onClick={onCopy}>
                            Copy Link
                        </Button>
                        <Button
                            css={[
                                css`
                                    margin-left: 5px;
                                `,
                                ButtonCSS,
                            ]}
                            onClick={() => setView("vote")}
                        >
                            Vote
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
};

export default ResultCard;
