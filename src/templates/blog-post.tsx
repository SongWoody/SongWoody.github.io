import * as React from "react"
import { Link, graphql, PageProps } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import TitleRenderer from "../components/TitleRenderer";
import "../components/TagList.css"

import { GatsbyImage, getImage } from "gatsby-plugin-image";

const BlogPostTemplate = ({ data, location }: PageProps) => {
  const { previous, next, site, markdownRemark: post } = data as any;
  const siteTitle = site.siteMetadata?.title || `Title`
  const { featuredImage } = post.frontmatter;
  const image = featuredImage && getImage(featuredImage);

  return (
    <Layout location={location} title={siteTitle}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        {featuredImage && (
            (featuredImage.extension === 'svg' && featuredImage.publicURL) ?
                <img src={featuredImage.publicURL} alt={post.frontmatter.title} style={{ marginBottom: '1rem', width: '100%', borderRadius: '1.6rem' }}/> :
                (image && <GatsbyImage image={image} alt={post.frontmatter.title} style={{ marginBottom: '1rem', borderRadius: '1.6rem' }}/>)
        )}
        <header>
          <h1 itemProp="headline"><TitleRenderer title={post.frontmatter.title} /></h1>
          <p style={{ fontSize: '1rem' }}>{post.frontmatter.date}</p>
          {post.frontmatter.tags && (
            <div className="tags">
              {post.frontmatter.tags.map((tag, index) => (
                <Link key={index} to={`/tags/${tag}`} className="tag">
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </header>
        <section style={{ marginTop: '2rem' }}
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
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
                ← <TitleRenderer title={previous.frontmatter.title} />
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                <TitleRenderer title={next.frontmatter.title} /> →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export const Head = ({ data }: PageProps) => {
  const { markdownRemark: post } = data as any;
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
          publicURL
          extension
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
