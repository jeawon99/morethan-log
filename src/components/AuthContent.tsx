import { useRouter } from "next/navigation";
 
import { useUser } from "@supabase/auth-helpers-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createComment, getComments  } from '../apis/supabase/commentApi'
import { getCommentReactions  } from '../apis/supabase/commentReactionApi'
import { processComments } from '../libs/utils/supabase/processComments'
import { generateKoreanPhrase } from '../libs/generateKoreanPhrase';

const AuthContent = () => {
  const supabase = createClientComponentClient(); //로그아웃 메서드를 받아오기 위해서 사용
  const router = useRouter();
  const user = useUser(); //useUser훅을 통해 유저데이터를 받아옴
 
  const handleAuth = async () => {
    if (user) {
      const { error } = await supabase.auth.signOut(); //로그아웃
      if (error) {
        console.error(error);
      }
      console.log(user);
    }
    if (!user) {
      router.push("/login");
    }
  };

  const handlePrivatePage = async () => {
    console.log(user);
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.log(error);
    } else {
      console.log("no problem");
      console.log(data);
    }
  };
  const handlecreateComment = async () => {
    if (!user) {
      console.log('User is not logged in');
      return;
    }

    try {
      const parentId = null; // 필요에 따라 설정
      const content = "test1test1test1test1test1test1"
      const slug = "index1"
      const data = await createComment(parentId, content, slug);
      console.log(data);
      // 여기에 추가적인 처리 로직을 넣을 수 있습니다.
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };
  const handlecreComment = async () => {
    if (!user) {
      console.log('User is not logged in');
      return;
    }

    try {
      const data = await getComments("index1");
      console.log(data);
      // 여기에 추가적인 처리 로직을 넣을 수 있습니다.
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };


  const handleGetReaction = async () => {
    if (!user) {
      console.log('User is not logged in');
      return;
    }

    try {
      const data = await getCommentReactions("index1");
      console.log(data);


      // 여기에 추가적인 처리 로직을 넣을 수 있습니다.
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleandProecess = async () => {
    try {
      const Commentdata = await getComments("index1");
      const Reactiondata = await getCommentReactions("index1");
      const currentUserUuid = user ? user.id : '';;

      console.log(processComments(Commentdata, Reactiondata, currentUserUuid));

      // 여기에 추가적인 처리 로직을 넣을 수 있습니다.
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };
  const generateKorean = async () => {
    const userId = user? user.id:"123";
    const slug  = "index1"
    const phrase = generateKoreanPhrase(userId, slug);
    console.log(phrase);
  };
  return (
    <div className="font-semibold h-full flex flex-col items-center justify-center">
      {user && <div>안녕하세요 {user?.user_metadata.full_name}님</div>}
      <br/>
      {user && <div>안녕하세요 {user?.user_metadata.email}님</div>}
      <div>
        <button
          className="border border-neutral-400 rounded-lg px-4 py-1 hover:bg-neutral-100 hover:border-neutral-500 transition"
          onClick={handleAuth}>
          {user ? "로그아웃" : "로그인"}
        </button>
        <br/>
        <br/>
        <button onClick={handlePrivatePage}>Check User</button>
        <br/>
        <br/>
        <button onClick={handlecreateComment}> create comment </button>
        <br/>
        <br/>
        <button onClick={handlecreComment}> get comment </button>
        <br/>
        <br/>
        <button onClick={handleGetReaction}> get reaction </button>
        <br/>
        <br/>
        <button onClick={handleandProecess}> Proecess </button>
        <br/>
        <br/>
        <button onClick={generateKorean}> 한국어 생성 </button>
      </div>
    </div>
  );
};
 
export default AuthContent;
