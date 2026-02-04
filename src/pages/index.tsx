import * as React from "react"
import { graphql, PageProps } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import PostListItem from "../components/PostListItem"
import { SiteMetadata, PostNode } from "../types/post"

interface DataProps {
  site: {
    siteMetadata: Pick<SiteMetadata, "title">
  }
  allMarkdownRemark: {
    nodes: PostNode[]
  }
}

import * as styles from "./index.module.css"

const BlogIndex = ({ data, location }: PageProps<DataProps>) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.nodes

  if (!posts.length) {
    return (
      <Layout location={location} title={siteTitle}>
        <div className="bio-container">
          <Bio />
        </div>
        <p>No blog posts found. Add markdown posts to "content/blog".</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <div className="bio-container">
        <Bio />
      </div>
      <ol className={styles.postList}>
        {posts.map(post => (
          <PostListItem key={post.fields.slug} post={post} />
        ))}
      </ol>
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          subject
          description
          featuredImage {
            childImageSharp {
              gatsbyImageData(width: 213, height: 120, layout: CONSTRAINED)
            }
            publicURL
            extension
          }
        }
      }
    }
  }
`
