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
        <header id="header" className={styles["page-header"]}>
          <Navigation></Navigation>
        </header>

        <div
          id="page-content"
          className={styles["page-content"]}
          style={{ backgroundImage: `url(${banner.src})` }}
        >
          <div className="wrapper">
            <div className={classNames(["home", styles["home"]])}>
              <div className="container">
                <div className="banner">
                  <h1 className="blog-title">Living Chaplin</h1>
                  <p className="blog-author">Wayne Zheng</p>
                </div>
                <div>{children}</div>
                {home && (
                  <footer className="footer">
                    <p className="copyright">
                      <span className="copyright-flag">Copyright © 2015</span>
                      <Link href="/about" title="About me">
                        Bowei Zheng.
                      </Link>
                    </p>
                  </footer>
                )}
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
