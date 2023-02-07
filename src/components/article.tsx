import Link from "next/link";
import classNames from "classnames";
import { ReactElement } from "react";
import styles from "./article.module.css";
import "highlight.js/styles/github.css";

export interface ArticleItemProps {
  post: Record<string, any>;
  single?: boolean;
  showContent?: boolean;
  children?: ReactElement;
}

export function ArticleItem({
  post,
  single,
  showContent,
  children,
}: ArticleItemProps) {
  return (
    <div className={classNames({ single })}>
      <article className={styles["single-post"]}>
        <header>
          {single ? (
            <header>
              <h1 className={styles["title"]}>{post.title}</h1>
            </header>
          ) : (
            <h3 className={styles["title"]}>
              <Link
                href={`/posts/${encodeURIComponent(post.id)}`}
                title={post.title}
              >
                {post.title}
              </Link>
            </h3>
          )}
          <div className={styles["datetime"]}>{post.time}</div>
          {post.tag && (
            <div className={styles["tags"]}>
              {post.tag.map((item: string) => (
                <span className={styles["tag"]} key={item}>
                  {item}
                </span>
              ))}
            </div>
          )}
        </header>
        {!single && <p className={styles["excerpt"]}>{post.excerpt}</p>}
        {showContent && (
          <div
            className={styles["art-content"]}
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          ></div>
        )}
      </article>
      {children}
    </div>
  );
}
