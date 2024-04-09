import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import banner from "@/assets/imgs/banner/banner.jpg";
import { Navigation } from "@/components/navigation";
import { TopDown } from "@/components/top-down";
import classNames from "classnames";
import { Analytic } from "@/components/analytic";

const isProduction = true || process.env.NODE_ENV === "production";

function Banner() {
  return (
    <div className="text-center h-32 mb-24">
      <h1 className="text-5xl leading-normal mt-9 font-normal font-mono text-white">
        Living <br /> Chaplin
      </h1>
      <p className="text-lg leading-normal text-white italic tracking-widest">
        Wayne Zheng
      </p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="h-10 bg-slate-200 pt-2 pb-8">
      <p className="h-5 text-center text-gray-600">
        <span className="mr-1">
          Copyright © 2015 - {new Date().getFullYear()}
        </span>
        <Link className="text-green" href="/about" title="About me">
          Bowei Zheng.
        </Link>
      </p>
    </footer>
  );
}

export const siteTitle = "Live meta";
export const siteDesc = "Blog, life, photos and others about wynn";

interface Layout {
  children: ReactNode;
  showBanner?: boolean;
  showNavigation?: boolean;
}

export default function Layout({
  children,
  showBanner = true,
  showNavigation = true,
}: Layout) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={siteDesc} />
        <meta name="og:title" content={siteTitle} />
        <meta name="og:description" content={siteDesc} />
        <meta name="og:type" content="blog" />
        {/* <meta name="og:image" content="" /> */}
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
      </Head>
      <main>
        {showNavigation && <Navigation></Navigation>}

        <div
          className={classNames(
            "w-full",
            showNavigation ? "pt-[452px]" : "",
            "bg-fixed",
            "bg-center",
            "bg-top",
            "bg-no-repeat",
            "bg-[length:2000px]"
          )}
          style={{ backgroundImage: `url(${banner.src})` }}
        >
          <div className={classNames("relative", "w-full", "mx-auto", "my-0")}>
            <div
              className={classNames(
                "absolute left-0 w-full",
                showNavigation ? "-top-[419px]" : ""
              )}
            >
              {showBanner && <Banner></Banner>}
              <div className="mx-auto max-w-4xl">{children}</div>
              <Footer></Footer>
            </div>
          </div>
        </div>

        <TopDown></TopDown>
      </main>
      {isProduction && <Analytic></Analytic>}
    </div>
  );
}
