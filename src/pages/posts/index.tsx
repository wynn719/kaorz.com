import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "@/components/layout";
import { getSortedPostsData } from "@/lib/posts";

interface PostHomeProps {
  allPostsData: any[];
}

interface ArticleItemProps {
  post: any;
}

function ArticleItem({ post }: ArticleItemProps) {
  return (
    <article className="single-post life-single-post">
      <header>
        <h3 className="title">
          <Link href={`/posts/${post.id}`} title={post.title}>
            {post.title}
          </Link>
        </h3>
        <div className="tags">
          {post.tag?.map((item: string) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </header>
      <div className="datetime"></div>
      {post.excerpt && <p className="art-content">{post.excerpt}</p>}
    </article>
  );
}

export default function PostHome({ allPostsData }: PostHomeProps) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className="content">
        <section id="tech-posts">
          <div className="section-header">
            <h1 className="section-title">Recent Post</h1>
          </div>
          <div className="tech-posts">
          {allPostsData.map((postItem) => (
            <ArticleItem key={postItem.id} post={postItem}></ArticleItem>
          ))}
          </div>
        </section>
      </div>
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
