import Head from "next/head";
import styles from "./layout.module.css";
import Link from "next/link";
import { ReactNode } from "react";
import banner from "@/assets/imgs/banner/banner.jpg";
import { Navigation } from "@/components/navigation";
import { TopDown } from "@/components/top-down";
import classNames from "classnames";
import { Analytic } from "@/components/analytic";

const name = "Live meta";
export const siteTitle = "Live meta";

const isProduction = process.env.NODE_ENV === "production";

function Banner() {
  return (
    <div className="text-center h-32 mb-24">
      <h1 className="text-5xl leading-normal mt-9 font-normal font-mono text-white">
        Living Chaplin
      </h1>
      <p className="text-lg leading-normal text-white italic tracking-widest">
        Wayne Zheng
      </p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="h-5 bg-slate-200 pt-2 pb-8">
      <p className="h-5 text-center text-gray-600">
        <span className="mr-1">Copyright © 2015</span>
        <Link className="text-green" href="/about" title="About me">
          Bowei Zheng.
        </Link>
      </p>
    </footer>
  );
}

interface Layout {
  children: ReactNode;
  home: boolean;
}

export default function Layout({ children, home }: Layout) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main>
        <Navigation></Navigation>

        <div
          id="page-content"
          className={classNames(
            "w-full",
            "pt-[452px]",
            "bg-fixed",
            "bg-center",
            "bg-top",
            "bg-no-repeat",
            "bg-[length:2000px]"
          )}
          style={{ backgroundImage: `url(${banner.src})` }}
        >
          <div className="wrapper">
            <div
              className={classNames(
                ["home"],
                "relative",
                "w-full",
                "mx-auto",
                "my-0"
              )}
            >
              <div className="container absolute left-0 -top-[419px] w-full">
                <Banner></Banner>
                <div>{children}</div>
                {home && <Footer></Footer>}
              </div>
            </div>
          </div>
        </div>

        <TopDown></TopDown>
      </main>
      {isProduction && <Analytic></Analytic>}
    </div>
  );
}
