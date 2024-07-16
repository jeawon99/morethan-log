// import { signIn } from "next-auth/react";

// export default function LoginPage() {
//   return (
//     <div>
//       <h1>Login</h1>
//       <button onClick={() => signIn('github')}>Login with GitHub</button>
//       {/* 추가적인 제공자 로그인 버튼을 여기에 배치할 수 있습니다. */}
//     </div>
//   );
// }
// pages/auth/signin.tsx
// pages/auth/signin.tsx
import { getProviders, signIn } from "next-auth/react";
import type { GetServerSideProps } from "next";
import type { ClientSafeProvider, LiteralUnion, SignInResponse } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import LoginStatus from "../components/LoginStatus";

interface SignInProps {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>;
}

const SignIn: React.FC<SignInProps> = ({ providers }) => {
  return (
    <div>
        <div>
        <h1>Home Page</h1>
        <LoginStatus />
        </div>
      <h1>관리자 로그인</h1>
      {providers && Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default SignIn;
