import React from "react"

interface SocialLinkProps {
  href: string
  imgSrc: string
  alt: string
  style?: React.CSSProperties
  className?: string
}

const SocialLink: React.FC<SocialLinkProps> = ({
  href,
  imgSrc,
  alt,
  style,
  className,
}) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <img src={imgSrc} alt={alt} style={style} className={className} />
    </a>
  )
}

export default SocialLink
