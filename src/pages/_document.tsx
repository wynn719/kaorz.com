import { Html, Head, Main, NextScript } from "next/document";
import Analytic from "@/components/analytic";

const isProduction = process.env.NODE_ENV === "production";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        {isProduction && <Analytic />}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
