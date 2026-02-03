import * as React from "react"
import { Link } from "gatsby"
import TitleRenderer from "./TitleRenderer"

interface BlogPostNavProps {
  previous: {
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
      subject?: string;
    };
  } | null;
  next: {
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
      subject?: string;
    };
  } | null;
}

const BlogPostNav: React.FC<BlogPostNavProps> = ({ previous, next }) => {
  return (
    <nav className="blog-post-nav">
      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← <TitleRenderer title={previous.frontmatter.title} subject={previous.frontmatter.subject} />
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              <TitleRenderer title={next.frontmatter.title} subject={next.frontmatter.subject} /> →
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default BlogPostNav
