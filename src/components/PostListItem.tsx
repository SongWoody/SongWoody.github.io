import React from "react";
import { Link } from "gatsby";
import TitleRenderer from "./TitleRenderer";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as styles from "./PostListItem.module.css";
import { PostNode } from "../types/post";

interface PostListItemProps {
  post: PostNode;
}

const PostListItem = ({ post }: PostListItemProps) => {
  const {
    fields: { slug },
    frontmatter: { title, date, description, featuredImage, subject },
    excerpt,
  } = post;

  const displayTitle = title || slug;
  const displayDescription = description || excerpt;
  const image = featuredImage && getImage(featuredImage.childImageSharp);

  return (
    <li key={slug}>
      <Link to={slug} className={styles.link}>
        <article
          className={styles.item}
          itemScope
          itemType="http://schema.org/Article"
        >
          <div className={styles.content}>
            <header>
              <h2>
                <span itemProp="headline">
                  <TitleRenderer title={displayTitle} subject={subject} />
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
          </div>
          {featuredImage && (
            <div className={styles.imageContainer}>
              {featuredImage.extension === 'svg' && featuredImage.publicURL ? (
                <img src={featuredImage.publicURL} alt={title} className={styles.image} />
              ) : (
                image && <GatsbyImage image={image} alt={title} className={styles.image} />
              )}
            </div>
          )}
        </article>
      </Link>
    </li>
  );
};

export default PostListItem;
