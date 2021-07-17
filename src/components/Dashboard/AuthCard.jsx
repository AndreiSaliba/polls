import { Flex, useColorMode } from "@chakra-ui/react";
import AuthConnection from "../AuthConnection";

const AuthCard = () => {
    const { colorMode } = useColorMode();
    return (
        <Flex
            flexDirection="column"
            width="600px"
            maxWidth="90vw"
            marginTop="5"
            padding="5"
            borderRadius="lg"
            borderWidth="1px"
            backgroundColor={
                colorMode === "dark" ? "whiteAlpha.200" : "gray.50"
            }
        >
            <AuthConnection providerId="google.com" />
            <AuthConnection providerId="twitter.com" />
            <AuthConnection providerId="github.com" bottom />
        </Flex>
    );
};

export default AuthCard;
