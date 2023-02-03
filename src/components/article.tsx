import Link from "next/link";
import classNames from "classnames";
import { useRef, useEffect, ReactElement } from "react";
import highlight from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/github.css";

highlight.configure({ ignoreUnescapedHTML: true });
highlight.registerLanguage("javascript", javascript);

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
  const postContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    postContentRef.current?.querySelectorAll("pre code").forEach((el) => {
      highlight.highlightElement(el as HTMLDivElement);
    });
  }, []);

  return (
    <div className={classNames({ single })}>
      <article className="single-post">
        <header>
          {single ? (
            <header>
              <h1 className="title">{post.title}</h1>
            </header>
          ) : (
            <h3 className="title">
              <Link
                href={`/posts/${encodeURIComponent(post.id)}`}
                title={post.title}
              >
                {post.title}
              </Link>
            </h3>
          )}
          <div className="datetime">{post.time}</div>
          {post.tag && (
            <div className="tags">
              {post.tag.map((item: string) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          )}
        </header>
        {!single && <p className="excerpt">{post.excerpt}</p>}
        {showContent && (
          <div
            className="art-content"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            ref={postContentRef}
          ></div>
        )}
      </article>
      {children}
    </div>
  );
}
