// import { useEffect } from "react"
// import mermaid from "mermaid"

// const useMermaidEffect = () => {
//   useEffect(() => {
//     mermaid.initialize({
//       startOnLoad: true,
//     })
//     if (!document) return
//     const elements: HTMLCollectionOf<Element> =
//       document.getElementsByClassName("language-mermaid")
//     if (!elements) return

//     for (let i = 0; i < elements.length; i++) {
//       mermaid.render(
//         "mermaid" + i,
//         elements[i].textContent || "",
//         (svgCode: string) => {
//           elements[i].innerHTML = svgCode
//         }
//       )
//     }
//   }, [])

//   return
// }

// export default useMermaidEffect

import { useEffect } from "react";
import mermaid from "mermaid";

const useMermaidEffect = () => {
  useEffect(() => {
    // mermaid 초기화
    mermaid.initialize({
      startOnLoad: false,  // 자동 렌더링 비활성화
      theme: "default",    // 기본 테마 설정
      securityLevel: 'loose', // HTML 태그 허용 및 클릭 이벤트 활성화
    });

    // 렌더링 함수 정의
    const renderMermaid = async () => {
      const elements = document.querySelectorAll<HTMLElement>(".language-mermaid");

      for (const element of elements) {
        const graphDefinition = element.textContent || "";
        const { svg } = await mermaid.render('mermaidGraph', graphDefinition);
        element.innerHTML = svg; // SVG로 렌더링된 그래프를 해당 요소에 설정
      }
    };

    // 문서 로드 완료 후 렌더링 실행
    if (document.readyState === 'loading') {
      document.addEventListener("DOMContentLoaded", renderMermaid);
    } else {
      renderMermaid();
    }

    // 이벤트 리스너 제거
    return () => {
      document.removeEventListener("DOMContentLoaded", renderMermaid);
    };
  }, []);

  return;
};

export default useMermaidEffect;
