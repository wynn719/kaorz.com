import Link from "next/link";
import classNames from "classnames";
import { ReactElement } from "react";
import "highlight.js/styles/atom-one-dark.css";

export interface TagProps {
  children: ReactElement | string;
}

export function Tag({ children }: TagProps) {
  return (
    <span className="text-xs text-slate-100 bg-green inline-block py-0.5 px-1.5 transition-all mr-1.5">
      {children}
    </span>
  );
}

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
    <div
      className={classNames(
        single ? ["bg-gray-50 dark:bg-[#222831] py-16"] : ""
      )}
    >
      <article
        className={classNames(
          "mx-7 mb-10",
          "lg:mx-20 lg:mb-16",
          "tracking-widest"
        )}
      >
        <header>
          {single ? (
            <header>
              <h1 className="text-2xl font-normal text-slate-800 dark:text-slate-300 mb-3">
                {post.title}
              </h1>
            </header>
          ) : (
            <h3 className="text-xl font-normal text-slate-800 dark:text-slate-300">
              <Link
                className="no-underline "
                href={`/posts/${encodeURIComponent(post.id)}`}
                title={post.title}
              >
                {post.title}
              </Link>
            </h3>
          )}
          <div className="text-sm mt-1 mb-1 text-slate-500">{post.time}</div>
          {post.tag && (
            <div className="my-1.5">
              {post.tag.map((item: string) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          )}
        </header>
        {!single && (
          <p className="text-slate-400 dark:text-slate-400 line-clamp-3">
            {post.excerpt}
          </p>
        )}
        {showContent && (
          <div
            className={classNames(
              "art-content",
              "text-slate-800 dark:text-slate-300",
              "py-4",
              "tracking-widest"
            )}
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          ></div>
        )}
      </article>
      {children}
    </div>
  );
}
