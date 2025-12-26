import React from "react";
import { Link } from "gatsby";
import TitleRenderer from "./TitleRenderer";

interface PostListItemProps {
  post: {
    excerpt: string;
    fields: {
      slug: string;
    };
    frontmatter: {
      date: string;
      title: string;
      description: string;
    };
  };
}

const PostListItem = ({ post }: PostListItemProps) => {
  const {
    fields: { slug },
    frontmatter: { title, date, description },
    excerpt,
  } = post;

  const displayTitle = title || slug;
  const displayDescription = description || excerpt;

  return (
    <li key={slug}>
      <Link to={slug} className="post-list-item-link">
        <article
          className="post-list-item"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            <h2>
              <span itemProp="headline">
                <TitleRenderer title={displayTitle} />
              </span>
            </h2>
            <small>{date}</small>
          </header>
          <section>
            <p
              dangerouslySetInnerHTML={{ __html: displayDescription }}
              itemProp="description"
            />
          </section>
        </article>
      </Link>
    </li>
  );
};

export default PostListItem;
