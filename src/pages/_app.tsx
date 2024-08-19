import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NextProgress from "nextjs-progressbar";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} basePath="/blog/api/auth">
      <NextProgress
        color="#63a67f"
        height={1}
        options={{ showSpinner: false }}
      />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
