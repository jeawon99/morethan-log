// pages/admin.tsx
// import { useSession, getSession } from "next-auth/react"
// import { GetServerSideProps } from "next"

// export default function AdminPage() {
//   const { data: session } = useSession()

//   if (session?.user?.role === "admin") {
//     return <div>Welcome to the Admin Panel, {session.user.email}</div>;
//   } else {
//     return <div>Access Denied</div>;
//   }
// }

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession(context);

//   if (!session || session?.user?.role !== "admin") {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session }
//   };
// }
// pages/admin.tsx
import { useSession, getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useState } from "react";
import AuthContent from "../components/AuthContent"
import { log } from "console";
import { useUser } from "@supabase/auth-helpers-react";

export default function AdminPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const user = useUser();
  // console.log(user?.email);
  // console.log(process.env.GITHUB_ADMIN_EMAIL);
  // console.log(process.env.NEXT_PUBLIC_ADMIN_EMAIL);
  if (!user || user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    return <div>Loading...</div>;
  }

  const revalidate = async (path = '') => {
    setLoading(true);
    const secret = process.env.NEXT_PUBLIC_REVALIDATE_SECRET; // 환경 변수로 관리
    const url = path
      ? `/api/revalidate?secret=${secret}&path=${path}`
      : `/api/revalidate?secret=${secret}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.revalidated) {
      console.log('Page revalidated successfully!');
    } else {
      console.error('Failed to revalidate the page');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Welcome to the Admin Panel, {session?.user.email}</h1>
      <button onClick={() => revalidate('/feed')}>
        {loading ? 'Revalidating...' : 'Revalidate /feed'}
      </button>
      <button onClick={() => revalidate()}>
        {loading ? 'Revalidating...' : 'Revalidate All Posts'}
      </button>
      <div>
        <AuthContent></AuthContent>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  // 크롬 콘솔에 로그 띄우기
  // if (!session) {
  //   console.log('Session is null. User might not be authenticated.');
  // }
  // if (!session || session.user.role !== "admin") {
  //   return {
  //     redirect: {
  //       destination: '/login', // 미인증 사용자를 로그인 페이지로 리다이렉트
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: { session },
  };
};
