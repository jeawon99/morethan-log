// src/api/commentApi.ts
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const supabase = createClientComponentClient();

// 댓글 생성
export const createComment = async (parentId: number | null, content: string, slug: string) => {
  const result = await supabase
    .from('Comments')
    .insert([
      { parent_id: parentId, content, slug}
    ]);

//   console.log(result);

  if (result.error) throw result.error;
  return result.data;
};

//댓글 생성 세부적으로
export const createDetailComment = async (parentId: number | null, content: string, slug: string, author: string, avatar_url: string) => {
    const result = await supabase
      .from('Comments')
      .insert([
        { parent_id: parentId, content, slug, author, avatar_url}
      ]);
  
  //   console.log(result);
  
    if (result.error) throw result.error;
    return result.data;
  };

// 댓글 조회
export const getComments = async (slug: string) => {

    const result = await supabase
            .from('Comments')
            .select(`
            id,
            parent_id,
            content,
            created_at,
            slug,
            author,
            avatar_url,
            user_uuid
            `)
            .eq('slug', slug)
            .order('created_at', { ascending: true });
  
    // console.log(result);
  
    if (result.error) throw result.error;
    return result.data;
  };
  

// 댓글 수정
export const updateComment = async (commentId: number, content: string) => {
  const { data, error } = await supabase
    .from('Comments')
    .update({ content })
    .eq('id', commentId);

  if (error) throw error;
  return data;
};

// 댓글 익명, 삭제 처리
export const anonymizeComment = async (commentId: number, content: string) => {
    const { data, error } = await supabase
      .from('Comments')
      .update({ content, author: "익명", avatar_url: ""})
      .eq('id', commentId);
  
    if (error) throw error;
    return data;
  };

// 댓글 삭제
export const deleteComment = async (commentId: number) => {
    const result = await supabase
    .from('Comments')
    .delete()
    .eq('id', commentId);

    // console.log(result);
    if (result.error) throw result.error;
    return result.data;
};
