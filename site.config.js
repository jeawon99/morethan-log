const CONFIG = {
  // profile setting (required)
  profile: {
    name: "J.Lim",
    image: "/avatar.svg", // If you want to create your own notion avatar, check out https://notion-avatar.vercel.app
    role: "Suno AI director",
    bio: "Suno로 음악을 만듭니다.",
    email: "rok585858@gmail.com",
    linkedin: "",
    github: "jeawon99",
    instagram: "",
  },
  projects: [
    {
      name: `Suno J.Lim`,
      href: "https://suno.com/@jlim",
    },
  ],
  // blog setting (required)
  blog: {
    title: "AI Music 가이드",
    description: "welcome to AI Music 가이드!",
    scheme: "dark", // 'light' | 'dark' | 'system'
  },

  // CONFIG configration (required)
  link: "https://aimg.kr",
  since: 2024, // If leave this empty, current year will be used.
  lang: "ko-KR", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app/AI%20Music%20%EA%B0%80%EC%9D%B4%EB%93%9C.png?theme=light&md=0&fontSize=200px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-color-logo.svg&images=https%3A%2F%2Fouch-cdn2.icons8.com%2F8Ab4avEYH7If_IO6fTodwMzfYlEVuFO1WdJmq71V4to%2Frs%3Afit%3A368%3A368%2FczM6Ly9pY29uczgu%2Fb3VjaC1wcm9kLmFz%2Fc2V0cy9wbmcvNDMw%2FL2FjNWU2NjUxLWRj%2FMGItNDJlNy05NTAy%2FLWJlM2EyMDhkMDVk%2FNS5wbmc.png&images=https%3A%2F%2Fouch-cdn2.icons8.com%2FOqOu0fwz3Wl6ZPjYPBcv94Bwu131EkcxO5yzRcblOFE%2Frs%3Afit%3A368%3A368%2FczM6Ly9pY29uczgu%2Fb3VjaC1wcm9kLmFz%2Fc2V0cy9wbmcvMjE0%2FL2IyNzk5ZGM0LWUy%2FMjUtNDRjZC05NGE1%2FLTI0Y2IwNTk2Y2Vi%2FYS5wbmc.png&widths=300&widths=300&widths=300&heights=300&heights=300&heights=300", // The link to generate OG image, don't end with a slash

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: false,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  naverSearchAdvisor: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: false,
    config: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO || "",
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "", // Embed Code -> data-app-id value
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  revalidateTime: 3600, // revalidate time for [slug], index
}

module.exports = { CONFIG }
