import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../utils/Auth";
import theme from "../utils/theme";

const MyApp = ({ Component, pageProps }) => {
    return (
        <ChakraProvider theme={theme}>
            <AuthProvider>
                <Head>
                    <title>Polls</title>
                    <meta name="description" content="Polls" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Component {...pageProps} />
            </AuthProvider>
        </ChakraProvider>
    );
};

export default MyApp;
