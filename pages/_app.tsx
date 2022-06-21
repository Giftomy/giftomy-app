import "../styles/globals.css";
import chakraTheme from "../theme";
import { useApollo } from "@/apollo/apolloClient";
import SubgraphController from "@/components/controller/subgraph.ctrl";
import { ModalProvider } from "@/context/ModalProvider";
import { UserProvider } from "@/context/UserProvider";
import { GeneralProvider } from "@/context/general.context";
import { PriceProvider } from "@/context/price.context";
import { store } from '@/features/store';
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { ExternalProvider, Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { AppLayout } from "components/app-layouts/app";
import { NextPage } from "next";
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import React, { ReactElement, ReactNode, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { MoralisProvider } from 'react-moralis';
import { Provider } from 'react-redux';


type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function getLibrary(provider: ExternalProvider) {
  return new Web3Provider(provider);
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const apolloClient = useApollo(pageProps);

  useEffect(() => {
    const handleStart = (url: string) => {
      console.log(`Loading: ${url}`);
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  // const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Provider store={store}>
        <GeneralProvider>
          <ApolloProvider client={apolloClient}>
            <Web3ReactProvider getLibrary={getLibrary}>
              <PriceProvider>
                <UserProvider>
                  <ModalProvider>
                    <ChakraProvider theme={chakraTheme}>
                      <MoralisProvider
                        serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
                        appId={process.env.NEXT_PUBLIC_APP_ID}
                      >
                        <SubgraphController />
                        <AppLayout>
                          <Component {...pageProps} />
                        </AppLayout>
                        {/* {getLayout(<Component {...pageProps} />)} */}
                      </MoralisProvider>
                    </ChakraProvider>
                  </ModalProvider>
                </UserProvider>
              </PriceProvider>
            </Web3ReactProvider>
          </ApolloProvider>
        </GeneralProvider>
      </Provider>
      <Toaster containerStyle={{ top: "80px" }} />
    </>
  );
}

export default MyApp;