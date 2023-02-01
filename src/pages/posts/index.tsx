import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "@/components/layout";
import utilStyles from "@/styles/utils.module.css";
import { getSortedPostsData } from "@/lib/posts";

interface PostHomeProps {
  allPostsData: any[];
}

export default function PostHome({ allPostsData }: PostHomeProps) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, excerpt, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              {excerpt && (
                <div>
                  <small>{excerpt}</small>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}
