import React, { useState } from "react"
import { Link } from "gatsby"
import "./CategoryTree.css"

// TypeScript 인터페이스 정의
interface Post {
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
    categories?: string[]
  }
}

interface Category {
  name: string
  children: Record<string, Category>
  posts: Post[]
}

interface CategoryNodeProps {
  category: Category
  posts: Post[]
  level?: number
}

interface CategoryTreeProps {
  data: {
    allMarkdownRemark: {
      nodes: Post[]
    }
  }
}


const CategoryNode = ({ category, posts, level = 0 }: CategoryNodeProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = Object.keys(category.children).length > 0
  const hasPosts = posts.length > 0
  const isCategory = hasChildren || hasPosts
  const maxDepth = 3 // 최대 뎁스 제한

  // 최대 뎁스에 도달하면 자식 카테고리를 현재 레벨에 병합
  if (level >= maxDepth && hasChildren) {
    return (
      <>
        <div className="category-header">
          <span className="category-name">{category.name}</span>
          {hasPosts && (
            <span className="post-count">({posts.length})</span>
          )}
        </div>
        <div className="category-content">
          {Object.values(category.children).map((child: Category) => (
            <CategoryNode
              key={child.name}
              category={child}
              posts={child.posts}
              level={level}
            />
          ))}
          {hasPosts && (
            <div className="posts">
              {posts.map((post: Post) => (
                <Link
                  key={post.fields.slug}
                  to={post.fields.slug}
                  className="post-link"
                >
                  {post.frontmatter.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </>
    )
  }

  return (
    <div className="category-node">
      <button 
        className="category-header"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsOpen(!isOpen)
          }
        }}
      >
        {isCategory && (
          <span className={`arrow ${isOpen ? 'open' : ''}`}>▶</span>
        )}
        <span className="category-name">{category.name}</span>
        {hasPosts && (
          <span className="post-count">({posts.length})</span>
        )}
      </button>
      {isOpen && (
        <div className="category-content">
          {hasChildren && (
            <div className="subcategories">
              {Object.values(category.children).map((child: Category) => (
                <CategoryNode
                  key={child.name}
                  category={child}
                  posts={child.posts}
                  level={level + 1}
                />
              ))}
            </div>
          )}
          {hasPosts && (
            <div className="posts">
              {posts.map((post: Post) => (
                <Link
                  key={post.fields.slug}
                  to={post.fields.slug}
                  className="post-link"
                >
                  {post.frontmatter.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}


const CategoryTree = ({ data }: CategoryTreeProps) => {
  const posts = data.allMarkdownRemark.nodes
  const categoryTree: Record<string, Category> = {}

  // 카테고리 트리 구조 생성
  posts.forEach((post: Post) => {
    if (post.frontmatter.categories) {
      let currentLevel = categoryTree
      post.frontmatter.categories.forEach((category: string, index: number) => {
        if (!currentLevel[category]) {
          currentLevel[category] = {
            name: category,
            children: {},
            posts: []
          }
        }
        if (index === post.frontmatter.categories.length - 1) {
          currentLevel[category].posts.push(post)
        }
        currentLevel = currentLevel[category].children
      })
    }
  })

  return (
    <div className="category-tree">
      <h4>Categories</h4>
      {Object.values(categoryTree).map((category) => (
        <CategoryNode
          key={category.name}
          category={category}
          posts={category.posts}
        />
      ))}
    </div>
  )
}


export default CategoryTree 