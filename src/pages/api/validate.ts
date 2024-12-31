// pages/api/revalidate.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // 비밀 토큰 확인
    if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {
        const path = req.body.path as string; // 새로운 글의 경로를 받아옵니다.

        // 홈 페이지 재검증 (글 목록 업데이트)
        await res.revalidate('/');

        // 새로운 글의 페이지 재검증
        await res.revalidate(path);

        return res.json({ revalidated: true });
    } catch (err) {
        return res.status(500).send('Error revalidating');
    }
}