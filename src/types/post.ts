import { IGatsbyImageData } from "gatsby-plugin-image"

export interface PostFrontmatter {
    title: string
    date: string
    description?: string
    subject?: string
    tags?: string[]
    featuredImage?: {
        childImageSharp: {
            gatsbyImageData: IGatsbyImageData
        }
        publicURL: string
        extension: string
    } | null
}

export interface PostNode {
    id?: string
    excerpt: string
    html?: string
    headings?: Array<{
        depth: number
        id: string
        value: string
    }>
    fields: {
        slug: string
    }
    frontmatter: PostFrontmatter
}

export interface SiteMetadata {
    title: string
    siteUrl: string
    description: string
    author: {
        name: string
        summary: string
    }
}

export interface MarkdownRemarkConnection {
    nodes: PostNode[]
}

export interface AllMarkdownRemarkResponse {
    allMarkdownRemark: MarkdownRemarkConnection
    site: {
        siteMetadata: SiteMetadata
    }
}
