// import { NextApiRequest, NextApiResponse } from "next"
// import { getPosts } from "../../apis"
// import { filterPosts } from "src/libs/utils/notion"

// // for all path revalidate, https://<your-site.com>/api/revalidate?secret=<token>
// // for specific path revalidate, https://<your-site.com>/api/revalidate?secret=<token>&path=<path>
// // example, https://<your-site.com>/api/revalidate?secret=이것은_키&path=feed
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { secret, path } = req.query
//   // if (secret !== process.env.TOKEN_FOR_REVALIDATE) {
//   //   return res.status(401).json({ message: "Invalid token" })
//   // }

//   try {
//     if (path && typeof path === "string") {
//       await res.revalidate(path)
//     } else {
//       const posts = await getPosts()
//       const feedPosts = filterPosts(posts)

//       const revalidateRequests = feedPosts.map((row) =>
//         res.revalidate(`/${row.slug}`)
//       )
//       await Promise.all(revalidateRequests)
//     }

//     res.json({ revalidated: true })
//   } catch (err) {
//     return res.status(500).send("Error revalidating")
//   }
// }

import { NextApiRequest, NextApiResponse } from 'next';
import { getPosts } from '../../apis';
import { filterPosts } from 'src/libs/utils/notion';

// for all path revalidate, https://<your-site.com>/api/revalidate?secret=<token>
// for specific path revalidate, https://<your-site.com>/api/revalidate?secret=<token>&path=<path>
// example, https://<your-site.com>/api/revalidate?secret=이것은_키&path=/feed
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { secret, path } = req.query;

  // 비밀 토큰 확인
  if (secret !== process.env.TOKEN_FOR_REVALIDATE) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    if (path && typeof path === 'string') {
      // 특정 경로 재검증
      await res.revalidate(path);
      return res.json({ revalidated: true, revalidatedPath: path });
    } else {
      // 전체 페이지 재검증

      // 재검증할 경로 목록 생성
      const pathsToRevalidate: string[] = [];

      // 홈 페이지 재검증
      pathsToRevalidate.push('/');

      // 필요한 경우 다른 정적 페이지 경로 추가 (예: '/about', '/contact')
      // pathsToRevalidate.push('/about');
      // pathsToRevalidate.push('/contact');

      // 모든 포스트 가져오기
      const posts = await getPosts();
      const feedPosts = filterPosts(posts);

      // 각 포스트의 경로 추가
      feedPosts.forEach((post) => {
        pathsToRevalidate.push(`/${post.slug}`);
      });

      // 모든 경로에 대해 재검증 수행
      await Promise.all(
        pathsToRevalidate.map(async (path) => {
          try {
            await res.revalidate(path);
            console.log(`Successfully revalidated: ${path}`);
          } catch (err) {
            console.error(`Error revalidating path: ${path}`, err);
          }
        })
      );

      return res.json({ revalidated: true, revalidatedPaths: pathsToRevalidate });
    }
  } catch (err) {
    console.error('Error during revalidation:', err);
    return res.status(500).send('Error revalidating');
  }
}