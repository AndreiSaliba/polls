/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../utils/Auth";
import firebase from "../utils/firebase";
import { Button, Flex, Heading, Text, useColorMode } from "@chakra-ui/react";
import { FaGoogle, FaGithub, FaTwitter } from "react-icons/fa";

const AuthConnection = ({ providerId, bottom }) => {
    const { currentUser } = useContext(AuthContext);
    const { colorMode } = useColorMode();
    const [type, setType] = useState();

    let name;
    let provider;

    switch (providerId) {
        case "google.com":
            name = "Google";
            provider = new firebase.auth.GoogleAuthProvider();
            break;
        case "twitter.com":
            name = "Twitter";
            provider = new firebase.auth.TwitterAuthProvider();
            break;
        case "github.com":
            name = "Github";
            provider = new firebase.auth.GithubAuthProvider();
            break;
    }

    const AuthIcon = ({ name }) => {
        if (name === "Google") {
            return (
                <FaGoogle
                    css={css`
                        width: 34px;
                        height: 34px;
                    `}
                />
            );
        } else if (name === "Twitter") {
            return (
                <FaTwitter
                    css={css`
                        width: 34px;
                        height: 34px;
                    `}
                />
            );
        } else if (name === "Github") {
            return (
                <FaGithub
                    css={css`
                        width: 34px;
                        height: 34px;
                    `}
                />
            );
        }
    };

    useEffect(() => {
        setType(
            currentUser?.providerData.find(
                (element) => element.providerId === providerId
            )
                ? "disconnect"
                : "connect"
        );
    }, [currentUser]);

    const buttonCSS = (theme) =>
        `
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

    const emailTextCSS = css`
        @media only screen and (max-width: 500px) {
            display: none;
        }
    `;

    return (
        <Flex w="100%" mb={bottom ? "0" : "7"} justify="space-between">
            <Flex align="center">
                <AuthIcon name={name} />
                <Flex ml="3" flexDirection="column">
                    <Heading size="sm">{name}</Heading>
                    <Text fontSize="14px" css={emailTextCSS}>
                        {
                            firebase
                                .auth()
                                .currentUser?.providerData.find(
                                    (element) =>
                                        element.providerId === providerId
                                )?.email
                        }
                    </Text>
                </Flex>
            </Flex>
            <Button
                w="125px"
                variant={type === "connect" ? "solid" : "outline"}
                css={[
                    (theme) => `
                    ${
                        type === "connect"
                            ? `
                            background-color: ${
                                colorMode === "dark"
                                    ? theme.colors.whiteAlpha[200]
                                    : theme.colors.gray[200]
                            };`
                            : `
                            border-width: 2px;
                            border-color: ${
                                colorMode === "dark"
                                    ? theme.colors.whiteAlpha[200]
                                    : theme.colors.gray[200]
                            };`
                    }

                `,
                    buttonCSS,
                ]}
                onClick={() => {
                    type === "connect"
                        ? firebase
                              .auth()
                              .currentUser.linkWithPopup(provider)
                              .then(() => {
                                  setType("disconnect");
                              })
                        : firebase
                              .auth()
                              .currentUser.unlink(providerId)
                              .then(() => {
                                  setType("connect");
                              });
                }}
            >
                {type === "connect" ? "Connect" : "Disconnect"}
            </Button>
        </Flex>
    );
};

export default AuthConnection;