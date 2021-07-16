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
    Box,
} from "@chakra-ui/react";
import moment from "moment";
import VoteButton from "./VoteButton";

const VoteCard = ({ data }) => {
    const { pollID, title, options, ipChecking, dateCreated } = data;
    const { currentUser } = useContext(AuthContext);
    const [selected, setSelected] = useState("");
    const { colorMode } = useColorMode();
    const { onCopy } = useClipboard(window.location.href);
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "Poll",
        onChange: setSelected,
    });
    const group = getRootProps();

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
                    align="flex-end"
                    mb="3"
                    maxWidth="90vw"
                >
                    <Heading size="lg">{title}</Heading>
                    <Text fontSize="xs" pb="2px">
                        {`${moment(
                            moment.unix(dateCreated.seconds)
                        ).fromNow()} ${
                            ipChecking ? "- IP Duplication Checking" : ""
                        }`}
                    </Text>
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
                        >
                            Results
                        </Button>
                        <Button css={ButtonCSS} onClick={onCopy}>
                            Copy Link
                        </Button>
                    </Flex>

                    <Button
                        css={[
                            css`
                                min-width: 90px;
                            `,
                            ButtonCSS,
                        ]}
                        onClick={() => {
                            if (selected) {
                                addVote(
                                    pollID,
                                    currentUser?.uid,
                                    selected,
                                    ipChecking
                                );
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
