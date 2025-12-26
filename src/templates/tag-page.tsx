/**
 * TagPage - 특정 태그에 해당하는 블로그 포스트 목록을 보여주는 페이지 템플릿
 * URL: /tags/{태그명} (예: /tags/javascript)
 * 기능: 해당 태그가 붙은 모든 포스트를 날짜순으로 정렬하여 표시
 */
import * as React from "react"
import { Link, graphql, PageProps } from "gatsby"

import Layout from "../components/Layout"
import Seo from "../components/Seo"
import PostListItem from "../components/PostListItem";

const TagPage = ({ data, location, pageContext }: PageProps<any, { tag: string }>) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const { tag } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={`Posts tagged with #${tag}`} />
      <h1>Posts tagged with #{tag}</h1>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => (
          <PostListItem key={post.fields.slug} post={post} />
        ))}
      </ol>
      <Link to="/tags">← All tags</Link>
    </Layout>
  )
}

export default TagPage

export const pageQuery = graphql`
  query ($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
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