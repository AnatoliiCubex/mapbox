import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";

import { ThemeProvider } from "~/providers/theme.provider";
import createEmotionCache from "~/theme/create-emotion-cache";

import type { EmotionCache } from "@emotion/react";
import type { AppProps } from "next/app";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <>
      <Head>
        <title>starter</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <ThemeProvider emotionCache={emotionCache}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
