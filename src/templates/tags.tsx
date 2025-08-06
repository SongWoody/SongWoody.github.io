import * as React from "react"
import { Link, graphql, PageProps } from "gatsby"

import Layout from "../components/Layout"
import Seo from "../components/Seo"

const TagsPage = ({ data, location }: PageProps<any>) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const tags: string[] = [
    ...new Set(
      (posts as any[])
        .flatMap((post: any) => post.frontmatter?.tags || [])
        .filter((tag): tag is string => Boolean(tag))
    )
  ].sort()

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