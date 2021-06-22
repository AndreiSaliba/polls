import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";

const MyApp = ({ Component, pageProps }) => {
    return (
        <ChakraProvider>
            <Head>
                <title>Polls</title>
                <meta name="description" content="Polls" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </ChakraProvider>
    );
};

export default MyApp;
