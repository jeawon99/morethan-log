// src/api/commentReactionApi.ts
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const supabase = createClientComponentClient();


// 리액션 조회
export const getCommentReactions = async (slug: string) => {
    const { data, error } = await supabase
        .from('CommentReactions')
        .select(`
            comment_id,
            user_uuid,
            reaction_emoji,
            comment:Comments (slug)
        `)
        .filter('comment.slug', 'eq', slug);

    if (error) throw error;
    return data;
};



  
// 리액션 생성
export const addCommentReaction = async (commentId: number, reactionEmoji: string) => {
  const { data, error } = await supabase
    .from('CommentReactions')
    .insert([
      { comment_id: commentId, reaction_emoji: reactionEmoji }
    ]);

  if (error) throw error;
  return data;
};

// 리액션 삭제
export const deleteCommentReactions = async (commentId: number, reactionEmoji: string) => {
    const { data, error } = await supabase
      .from('CommentReactions')
      .delete()
      .match({ comment_id: commentId, reaction_emoji: reactionEmoji });

    if (error) {
      console.error('Error deleting comment reaction', error);
      return { error };
    }
    return { data };
};
