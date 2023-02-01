import Head from "next/head";
import styles from "./layout.module.css";
import Link from "next/link";
import { ReactNode } from "react";
import banner from "@/assets/imgs/banner/banner.jpg";

console.log(banner);

const name = "Live meta";
export const siteTitle = "Live meta";

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
        <div id="page-content" style={{ backgroundImage: `url(${banner.src})` }}>
          <div className="wrapper">
            <div className="home">
              <div className="container">
                <div className="banner">
                  <h1 className="blog-title">Living Chaplin</h1>
                  <p className="blog-author">Wayne Zheng</p>
                </div>
                <div>{children}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}
