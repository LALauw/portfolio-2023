import "../styles/globals.scss";
import "highlight.js/styles/base16/material-darker.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
