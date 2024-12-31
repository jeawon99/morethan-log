// pages/api/revalidate.ts

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // 보안상의 이유로 비밀 토큰을 확인합니다.
    if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    try {
        // 재검증하려는 경로를 지정합니다. '/'는 홈 페이지를 의미합니다.
        await res.revalidate('/')
        return res.json({ revalidated: true })
    } catch (err) {
        // 에러 발생 시 처리합니다.
        return res.status(500).send('Error revalidating')
    }
}
