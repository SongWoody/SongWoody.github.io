import React from "react";
import { Link } from "gatsby";
import TitleRenderer from "./TitleRenderer";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as styles from "./PostListItem.module.css";

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
      featuredImage?: {
        childImageSharp: {
          gatsbyImageData: any;
        };
        publicURL: string;
        extension: string;
      } | null;
    };
  };
}

const PostListItem = ({ post }: PostListItemProps) => {
  const {
    fields: { slug },
    frontmatter: { title, date, description, featuredImage },
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
