// components/LoginStatus.tsx
import { useSession, signIn, signOut } from "next-auth/react";

const LoginStatus: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div>
        <p>Signed in as {session.user.email}</p>
        <p>name {session.user.name}</p>
        <p>role {session.user.role}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <p>로그인 안됨</p>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
};

export default LoginStatus;
