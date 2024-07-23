import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { ExtendedRecordMap } from "notion-types"
import useScheme from "src/hooks/useScheme"

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css"

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css"

// used for rendering equations (optional)

import "katex/dist/katex.min.css"
import { FC } from "react"
import styled from "@emotion/styled"

const _NotionRenderer = dynamic(
  () => import("react-notion-x").then((m) => m.NotionRenderer),
  { ssr: false }
)

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m) =>  m.Code )
)

const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
)
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
)

const mapPageUrl = (id: string) => {
  return "https://www.notion.so/" + id.replace(/-/g, "")
}

type Props = {
  recordMap: ExtendedRecordMap
}

const NotionRenderer: FC<Props> = ({ recordMap }) => {
  const [scheme] = useScheme()
  return (
    <StyledWrapper>
      <_NotionRenderer
        darkMode={scheme === "dark"}
        recordMap={recordMap}
        fullPage={false}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
          nextImage: Image,
          nextLink: Link,
        }}
        mapPageUrl={mapPageUrl}
      />
    </StyledWrapper>
  )
}

export default NotionRenderer

const StyledWrapper = styled.div`
  /* // TODO: why render? */
  .notion-collection-page-properties {
    display: none !important;
  }
  .notion-page {
    padding: 0;
  }
  blockquote {
      position: fixed;
      right: 30px; /* 오른쪽에서 20px 떨어진 위치에 고정 */
      top: 50%; /* 화면의 중간에 위치 */
      transform: translateY(-50%); /* 수직 중앙 정렬 */
      width: 350px; /* 필요에 따라 조정 */
      z-index: 1000; /* 다른 요소들 위에 위치 */
  }
  /* 태블릿 및 모바일 (가로 폭 1600px 이하) */
  @media screen and (max-width: 1600px) {
      blockquote {
          position: static; /* 고정 위치 해제 */
          right: auto;
          top: auto;
          width: 100%;
          transform: none;
          width: 100%;
      }
  }

  /* 모바일 (가로 폭 768px 이하) */
  @media screen and (max-width: 768px) {
      blockquote {
          position: static; /* 고정 위치 해제 */
          right: auto;
          top: auto;
          transform: none;
          width: 100%;
      }
  }
  .notion-quote {
      padding: 20px; /* 패딩 */
      border: 1px solid #ddd; /* 테두리 */
      border-radius: 15px; /* 모서리 둥글게 */
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  }

`
