import React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import MenuButton from "./MenuButton"
import { useSidebar } from "./SidebarContext"

// TypeScript 인터페이스 정의
interface HeaderProps {
  title: string
  rootPath: string
}

const Header = ({ title, rootPath }: HeaderProps) => {
    const { isMenuOpen, toggleMenu } = useSidebar();

    return (
        <header style={headerStyle}>
            <Link to={rootPath} style={logoStyle}>
                <StaticImage
                    style={logoImageStyle}
                    layout="fixed"
                    formats={["auto", "webp", "avif"]}
                    src="../images/nini_woody_15.png"
                    width={38}
                    height={25}
                    quality={95}
                    alt="Logo picture"
                />
                {title}
            </Link>
            <MenuButton isOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </header>
    )
}

const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", // 로고 왼쪽, 메뉴 오른쪽 배치
    width: "100%",
    padding: "8px 20px",
    backgroundColor: "#ffffff", // 흰 배경
};

const logoStyle = {
    display: "flex",
    alignItems: "center", // 로고와 텍스트를 한 줄로 배치
    textDecoration: "none", // 밑줄 제거
    color: "#333", // 어두운 색 (블랙 계열)
    fontSize: "18px", // 적당한 크기
    fontWeight: "bold", // 굵은 폰트
    letterSpacing: "0.5px", // 글자 간격 약간 추가
};

const logoImageStyle = {
    borderRadius: "10%", // 로고를 동그랗게 만들기
    marginRight: "8px", // 텍스트와 간격 조정
};

export default Header