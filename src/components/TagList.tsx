import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import "./TagList.css"

// TypeScript 인터페이스 정의
interface TagListData {
  allMarkdownRemark: {
    nodes: {
      frontmatter: {
        tags?: string[]
      }
    }[]
  }
}

const TagList = () => {
  const data: TagListData = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        nodes {
          frontmatter {
            tags
          }
        }
      }
    }
  `)

  const posts = data.allMarkdownRemark.nodes
  const tags: string[] = [...new Set(posts.flatMap((post) => post.frontmatter.tags || []))].sort()

  return (
    <div className="tag-list">
      <h4>Tags</h4>
      <div className="tags">
        {tags.map((tag: string, index: number) => (
          <Link key={index} to={`/tags/${tag}`} className="tag">
            #{tag}
          </Link>
        ))}
      </div>
    </div>
  )
}


export default TagList 