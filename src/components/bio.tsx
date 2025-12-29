/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import SocialLink from "./SocialLink"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile_woody.png"
        width={50}
        height={50}
        quality={95}
        alt="Logo picture"
      />
      <div className="bio-main">
        {author?.name && (
          <p>
            Written by <strong>{author.name}</strong> {author?.summary || null}
          </p>
        )}
      </div>
      <SocialLink
          href="https://github.com/SongWoody"
          imgSrc="/github-mark.svg"
          alt="GitHub 프로필"
          style={{ width: "20px", height: "20px" }}
       />
    </div>
  )
}

export default Bio
