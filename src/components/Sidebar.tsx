import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import { useSidebar } from "./sidebarContext"
import CategoryTree from "./CategoryTree"
import "./sidebarStyle.css"

// TypeScript 인터페이스 정의
interface TagListProps {
  tags: string[]
}

interface SidebarData {
  allMarkdownRemark: {
    nodes: {
      frontmatter: {
        tags?: string[]
        categories?: string[]
        title: string
      }
      fields: {
        slug: string
      }
    }[]
  }
}

const TagList = ({ tags }: TagListProps) => (
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
      render={(data: SidebarData) => {
        const posts = data.allMarkdownRemark.nodes;
        const tags: string[] = [...new Set(posts.flatMap((post) => post.frontmatter.tags || []))].sort();

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