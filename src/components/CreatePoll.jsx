/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../utils/Auth";
import { createPoll, generateID } from "../utils/db";
import {
    Flex,
    Box,
    Button,
    Input,
    useColorMode,
    Checkbox,
} from "@chakra-ui/react";
import router from "next/router";

const CreatePoll = () => {
    const { colorMode } = useColorMode();
    const { currentUser } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [fields, setFields] = useState(["", ""]);
    const [ipChecking, setIpChecking] = useState(false);

    const submitPoll = () => {
        const optionArray = fields
            .filter((item) => item !== "")
            .map((element) => {
                return { option: element, count: 0 };
            });
        if (optionArray.length > 1) {
            const id = generateID();
            createPoll(currentUser?.uid, id, {
                title: title,
                options: optionArray,
                authorID: currentUser?.uid ?? null,
                dateCreated: new Date(),
                ipChecking,
            }).then(router.push(`/poll/${id}`));
            setTitle("");
            setFields(["", ""]);
            setIpChecking(false);
        }
    };

    const onChange = (e) => {
        const index = e.target.dataset.index;
        const tempArray = Array.from(fields);
        tempArray[index] = e.target.value;
        setFields(tempArray);
    };

    useEffect(() => {
        if (fields[fields.length - 1] !== "" && fields.length < 10) {
            setFields([...fields, ""]);
        }
    }, [fields]);

    const InputCSS = (theme) => `
        margin-bottom: 10px;
        border-color: ${theme.colors.gray[400]};
        &::placeholder {
            color: ${
                colorMode === "dark"
                    ? theme.colors.gray[200]
                    : theme.colors.gray[600]
            };
        }
    `;

    return (
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
            <Box>
                <Input
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                    css={InputCSS}
                />
                <Box mt="2">
                    {fields.map((element, idx) => {
                        const num = idx + 1;
                        return (
                            <Input
                                key={idx}
                                data-index={idx}
                                placeholder={`Option ${num}`}
                                value={element}
                                onChange={onChange}
                                mb="10px"
                                borderColor={"gray.400"}
                                _placeholder={{
                                    color:
                                        colorMode === "dark"
                                            ? "gray.200"
                                            : "gray.600",
                                }}
                            />
                        );
                    })}
                </Box>
            </Box>
            <Flex align="center" justify="space-between" mt="5">
                {/* <Flex
                    // flexDirection="column"
                    // justifyContent="space-between"
                    minH="100%"
                > */}
                {/* <Checkbox
                        mb="0.5"
                        isChecked={multipleAnswers}
                        onChange={(e) => setMultipleAnswers(e.target.checked)}
                    >
                        Allow multiple poll answers
                    </Checkbox> */}
                <Checkbox
                    isChecked={ipChecking}
                    onChange={(e) => setIpChecking(e.target.checked)}
                >
                    IP Duplication Checking
                </Checkbox>
                {/* </Flex> */}
                <Button
                    onClick={submitPoll}
                    css={(theme) => `
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
                    `}
                >
                    Create Poll
                </Button>
            </Flex>
        </Flex>
    );
};

export default CreatePoll;