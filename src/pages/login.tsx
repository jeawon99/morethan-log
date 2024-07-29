import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa, ThemeMinimal } from "@supabase/auth-ui-shared";
import { MyCustomTheme } from '../styles/themePurple'; // ThemePurple을 import
import { useTheme } from "@emotion/react"
import styled from "@emotion/styled"
import { useRouter } from 'next/router';

const SignIn = () => {
  const supabaseClient = useSupabaseClient();
  const theme  = useTheme().scheme;  // 현재 테마를 가져옵니다.
  const router = useRouter();
  const { redirect } = router.query; // 쿼리에서 redirect 값을 추출
  // console.log(decodeURIComponent(redirect as string));
  return (
    <StyledWrapper>
    <article>
      <Auth
        redirectTo={decodeURIComponent(redirect as string)}
        supabaseClient={supabaseClient}
        appearance={{
          theme: MyCustomTheme,
          style: { 
            container: { width: "auto"},
            button: { 
                // background: 'red', 
                // color: 'white', 
                // border: '2px black', 
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box", // 패딩과 보더를 포함하도록 설정
                borderRadius: '0.9rem' 
            },
            input : {
                borderRadius: '0.9rem',
            }
        
        },
        }}
        providers={["kakao", "github", "google"]} /*카카오로 설정해주어야 함.*/
        localization={{
            variables: {
              sign_in: {
                email_label: '',
                password_label: '',
                button_label: "로그인",
                email_input_placeholder: "email",
                password_input_placeholder: "password",
                social_provider_text: "{{provider}}로 로그인",
                link_text: "돌아가기",
              },
              sign_up: {
                email_label: '',
                password_label: '',
                button_label: "회원가입",
                email_input_placeholder: "email",
                password_input_placeholder: "password",
                social_provider_text: "{{provider}}로 로그인",
                link_text: "회원가입",
              },
              forgotten_password: {
                link_text: "비밀번호 찾기",
                button_label: "비밀번호 재설정 이메일 보내기",
                
                
              },
            },
          }}
        theme={theme}
      />
    </article>
    </StyledWrapper>
  );
};
 
export default SignIn;


const StyledWrapper = styled.div`
  marginb
  margin-top: 2.5rem;
  position: relative;  // 상대 위치 설정
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  border-radius: 1.5rem;
  max-width: 26rem;
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray4};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin: 4rem auto 0;

  // 가상 요소로 보라색 빛 효과 생성
  &::before {
    content: "";
    position: absolute;  // 절대 위치 설정
    top: 50%;  // 상위 요소 대비 중앙
    left: 50%;  // 상위 요소 대비 중앙
    transform: translate(-50%, -50%);  // 중앙 정렬 보정
    width: 80%;
    height: 50%;
    border-radius: 1.5rem;  // StyledWrapper와 같은 border-radius
    background: rgba(128, 0, 128, 0.3);  // 보라색 배경
    box-shadow: 0 0 80px 0px rgba(128, 0, 128, 0.9);  // 보라색 코로나 효과
    z-index: -1;  // 로그인 창 뒤에 위치하도록 z-index 설정
  }

  > article {
    position: relative;  // 상위 z-index를 위해 relative 설정
    z-index: 1;  // 로그인 창이 가상 요소 위에 오도록 설정
  }
`;
