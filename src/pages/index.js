import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import "./index.css"

const BlogIndex = ({ data, location }) => {
  const { title: siteTitle } = data.site.siteMetadata
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
      <ol style={{ listStyle: "none", padding: 0 }}>
        {posts.map(({ fields: { slug }, frontmatter: { title, date, description }, excerpt }) => (
          <li key={slug}>
            <Link to={slug} className="post-list-item-link">
              <article className="post-list-item" itemScope itemType="http://schema.org/Article">
                <header>
                  <h2>
                    <span itemProp="headline">{title || slug}</span>
                  </h2>
                  <small>{date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{ __html: description || excerpt }}
                    itemProp="description"
                  />
                </section>
              </article>
            </Link>
          </li>
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
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
