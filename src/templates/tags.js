import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const TagsPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const tags = [...new Set(posts.flatMap(post => post.frontmatter.tags || []))].sort()

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Tags" />
      <h1>Tags</h1>
      <div className="tags">
        {tags.map((tag, index) => (
          <Link key={index} to={`/tags/${tag}`} className="tag">
            #{tag}
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          tags
        }
      }
    }
  }
` 