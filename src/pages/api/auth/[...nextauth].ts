import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      authorization: {
        params: { scope: 'read:user user:email' } // 필요한 GitHub 스코프 설정
      }
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/login',  // 사용자 정의 로그인 페이지 경로
  },
  callbacks: {
    async session({ session, token }: { session: Session, token: JWT }) {
      if (session.user) {
        session.user.email = token.email; // 세션에 사용자 ID를 저장함
        if (token.email == process.env.GITHUB_ADMIN_EMAIL) {
          session.user.role = "admin"; // 세션에 사용자 ID를 저장함
        }
      }
      return session;
    },
    async jwt({ token, account, user }: { token: JWT, account: any, user?: any }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.email = user.email;
      }
      return token;
    }
  }
}
export default NextAuth(authOptions)