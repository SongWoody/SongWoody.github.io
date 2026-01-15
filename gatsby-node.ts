/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

import path from 'path'
import { GatsbyNode } from 'gatsby'
import { createFilePath } from 'gatsby-source-filesystem'

// Define the template for blog post
const blogPost = path.resolve(`./src/templates/blog-post.tsx`)
const tagTemplate = path.resolve(`./src/templates/tag-page.tsx`)
const tagsTemplate = path.resolve(`./src/templates/tags.tsx`)

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const draftFilter = { frontmatter: { draft: { ne: true } } }
  // Get all markdown blog posts sorted by date
  const result = await graphql<{
    allMarkdownRemark: {
      nodes: Array<{
        id: string
        fields: {
          slug: string
        }
        frontmatter: {
          tags?: string[]
        }
      }>
    }
  }>(
    `
      query GetBlogPosts($draftFilter: MarkdownRemarkFilterInput) {
        allMarkdownRemark(
          sort: { frontmatter: { date: DESC } }
          limit: 1000
          filter: $draftFilter
        ) {
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
      }
    `,
    { draftFilter }
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data?.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts && posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  // Create tag pages
  const tags = new Set<string>()
  posts?.forEach(post => {
    if (post.frontmatter.tags) {
      post.frontmatter.tags.forEach(tag => tags.add(tag))
    }
  })

  // Create tags list page
  createPage({
    path: `/tags`,
    component: tagsTemplate,
    context: {
      tags: Array.from(tags),
    },
  })

  // Create individual tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${tag}`,
      component: tagTemplate,
      context: {
        tag,
      },
    })
  })
}

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions, getNode, reporter }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent as string);
    const sourceInstanceName = fileNode?.sourceInstanceName;

    let computedSlug: string;

    if (sourceInstanceName === 'blog') {
      // For 'blog' source, slug is mandatory in frontmatter
      if (!node.frontmatter || !(node.frontmatter as { slug?: string }).slug) {
        reporter.panicOnBuild(
          `Markdown file "${fileNode?.relativePath}" in the 'blog' source is missing a 'slug' field in its frontmatter. 'slug' is mandatory for blog posts.`
        );
        return;
      }
      const rawSlug = (node.frontmatter as { slug: string }).slug
      let fmSlug = rawSlug.startsWith('/') ? rawSlug.substring(1) : rawSlug;
      computedSlug = `/${sourceInstanceName}/${fmSlug}`;
      computedSlug = computedSlug.endsWith('/') ? computedSlug : `${computedSlug}/`;

    } else {
      // For other source types (not 'blog'), use createFilePath as default behavior
      computedSlug = createFilePath({ node, getNode });
      // If a sourceInstanceName exists and createFilePath gives a relative path, prepend it
      if (sourceInstanceName && !computedSlug.startsWith(`/${sourceInstanceName}`)) {
        computedSlug = `/${sourceInstanceName}${computedSlug.startsWith('/') ? '' : '/'}${computedSlug}`;
      }
      // Ensure trailing slash
      computedSlug = computedSlug.endsWith('/') ? computedSlug : `${computedSlug}/`;
    }
    
    createNodeField({
      name: `slug`,
      node,
      value: computedSlug,
    })
  }
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      tags: [String]
      draft: Boolean
      featuredImage: File @fileByRelativePath
      slug: String # Add slug field to Frontmatter type
    }

    type Fields {
      slug: String
    }
  `)
}