import Head from "next/head";
import { useEffect, useState } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import Cookie from "js-cookie";
import Layout from "@/components/layout";
import { ArticleItem } from "@/components/article";
import { getPostIds, getPostData } from "@/lib/posts";

interface PostProps {
  postData: Record<string, any>;
  likeCount: number;
}

function LikeButton({
  postId,
  likeCount,
}: {
  postId: string;
  likeCount: number;
}) {
  const [hasLike, setHasLike] = useState(false);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
  async function onClickLike(postId: string = "") {
    const userClientUuid = Cookie.get("client_uuid") || null;
    const res = await fetch("/blog/api/likes", {
      method: "POST",
      body: JSON.stringify({
        postId: postId,
        userClientUuid,
        nickname: "zaibeiwo",
        targetType: "post",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setCurrentLikeCount(currentLikeCount + 1);
    }
  }

  useEffect(() => {
    fetch(`/blog/api/likes?postId=${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ hasLike }) => {
        setHasLike(hasLike);
      });

    fetch(`/blog/api/likes/count?postId=${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ likeCount }) => {
        setCurrentLikeCount(likeCount);
      });
  }, [postId]);

  return (
    <div onClick={() => onClickLike(postId)}>
      <span>{hasLike ? "dislike" : "like"}</span>
      <span> - {currentLikeCount}</span>
    </div>
  );
}

export default function Post({ postData, likeCount }: PostProps) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <ArticleItem post={postData} single showContent>
        <LikeButton postId={postData.title} likeCount={likeCount}></LikeButton>
      </ArticleItem>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPostIds();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{}, { id: string }> = async ({
  params,
}) => {
  const postId = params?.id || "";
  const postData = await getPostData(postId);

  return {
    props: {
      postData,
    },
  };
};
