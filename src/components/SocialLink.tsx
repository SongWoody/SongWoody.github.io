import React from "react"

interface SocialLinkProps {
  href: string
  imgSrc: string
  alt: string
  style?: React.CSSProperties
}

const SocialLink: React.FC<SocialLinkProps> = ({
  href,
  imgSrc,
  alt,
  style,
}) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <img src={imgSrc} alt={alt} style={style} />
    </a>
  )
}

export default SocialLink
