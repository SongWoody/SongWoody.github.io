import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import "./TagList.css"

const TagList = () => {
  const data = useStaticQuery(graphql`
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
  const tags = [...new Set(posts.flatMap(post => post.frontmatter.tags || []))].sort()

  return (
    <div className="tag-list">
      <h4>Tags</h4>
      <div className="tags">
        {tags.map((tag, index) => (
          <Link key={index} to={`/tags/${tag}`} className="tag">
            #{tag}
          </Link>
        ))}
      </div>
    </div>
  )
}

TagList.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          frontmatter: PropTypes.shape({
            tags: PropTypes.arrayOf(PropTypes.string),
          }),
        })
      ),
    }),
  }).isRequired,
}

export default TagList 