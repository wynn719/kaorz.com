import Layout from "@/components/layout";
import { getPostTags } from "@/lib/posts";
import { GetStaticProps } from "next";
import Link from "next/link";

interface TagsHomeProps {
  tags: string[];
}

export default function TagsHome({ tags }: TagsHomeProps) {
  return (
    <Layout home={false}>
      <div className="tags-page">
        <section className="tags">
          {tags.map((tag) => (
            <Link
              className="tag"
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
            >
              {tag}
            </Link>
          ))}
        </section>

        <section className="tag-posts">
          <h2 className="tag-name"></h2>
          <div className="loading hide">loading...</div>
          <ul className="posts"></ul>
        </section>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const tags = await getPostTags();

  return {
    props: {
      tags,
    },
  };
};
