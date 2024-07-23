import NavBar from "./NavBar";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { zIndexes } from "src/styles/zIndexes";
import { hexToRgba } from "src/utils/color"; // 유틸리티 함수 가져오기
import { useRouter } from "next/router"; // Import useRouter

type Props = {
  fullWidth: boolean;
};

const Header: React.FC<Props> = ({ fullWidth }) => {
  const [scrollWidth, setScrollWidth] = useState(0);
  const router = useRouter(); // Use useRouter to access the path

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    setScrollWidth(scrollPercent);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StyledWrapper scrollWidth={scrollWidth}>
      <div data-full-width={fullWidth} className="container">
        <Logo />
        <div className="nav">
          <ThemeToggle />
          <NavBar />
        </div>
      </div>
      {router.pathname !== '/' && ( // Conditional rendering based on the path
        <div className="progress-bar" style={{ width: `${scrollWidth}%` }} />
      )}
    </StyledWrapper>
  );
};

export default Header;

const StyledWrapper = styled.div<{ scrollWidth: number }>`
  z-index: ${zIndexes.header};
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => hexToRgba(theme.colors.gray2, 0.7)};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  .container {
    position: relative;
    display: flex;
    padding-left: 1rem;
    padding-right: 1rem;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1120px;
    height: 4rem;
    margin: 0 auto;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: inherit;
      backdrop-filter: blur(10px);
      z-index: -1;
    }

    &[data-full-width="true"] {
      @media (min-width: 768px) {
        padding-left: 6rem;
        padding-right: 6rem;
      }
    }
    .nav {
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }
    .css-0 {
      font-size: 1.3rem;
      font-weight: bolder;
    }
  }

  .progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    // background: #670fdf; /* 막대 색상 */
    background: #a374db;
    transition: width 0.2s ease-out;
  }
`;
