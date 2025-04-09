import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import { useSidebar } from "./sidebarContext"
import CategoryTree from "./CategoryTree"
import "./sidebarStyle.css"

const TagList = ({ tags }) => (
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
);

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const Sidebar = () => {
  const { isMenuOpen, toggleMenu } = useSidebar();

  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
            nodes {
              frontmatter {
                tags
                categories
                title
              }
              fields {
                slug
              }
            }
          }
        }
      `}
      render={data => {
        const posts = data.allMarkdownRemark.nodes;
        const tags = [...new Set(posts.flatMap(post => post.frontmatter.tags || []))].sort();

        return (
          <aside className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
            <button 
              className="close-button" 
              onClick={toggleMenu} 
              aria-label="Close Menu"
            >
              <span className="close-icon" />
            </button>
            <nav className="sidebar-content">
              <CategoryTree data={data} />
              <TagList tags={tags} />
            </nav>
          </aside>
        );
      }}
    />
  );
};

export default Sidebar;