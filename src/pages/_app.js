import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../utils/Auth";

const MyApp = ({ Component, pageProps }) => {
    return (
        <ChakraProvider>
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
