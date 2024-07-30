import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import { useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';

import { useUser } from "@supabase/auth-helpers-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createComment, getComments, deleteComment, updateComment, anonymizeComment  } from '../apis/supabase/commentApi'
import { addCommentReaction, deleteCommentReactions } from '../apis/supabase/commentReactionApi'
import { getCommentReactions  } from '../apis/supabase/commentReactionApi'
import { processComments } from '../libs/utils/supabase/processComments'



export interface Reaction {
  emoji: string;
  count: number;
  participating: boolean;
}

export interface CommentData {
  comment_id: number;
  slug: string;
  parent_id: number | null;
  author: string;
  date: string;
  content: string;
  avatarUrl: string;
  reactions: Reaction[];
  user_uuid: string;
  replies: CommentData[];
}


export default function App() {
  const [comments, setComments] = useState<CommentData[]>([]);


  // const handleAddReaction = async (commentId: number, emoji: string, userId: string) => {
  //   var participating = false;
  //   const addReactionToComment = (comment: CommentData): CommentData => {
  //     if (comment.comment_id === commentId) {
  //       let reactionIndex = comment.reactions.findIndex(reaction => reaction.emoji === emoji);

  //       if (reactionIndex !== -1) {
  //         // 반응이 이미 있으면
  //         let reaction = comment.reactions[reactionIndex];
  //         if (reaction.participating) {
  //           // 참여 중인 경우, 카운트 감소
  //           reaction = { ...reaction, count: reaction.count - 1, participating: false };
  //           participating = true;
  //         } else {
  //           // 참여 중이지 않은 경우, 카운트 증가
  //           reaction = { ...reaction, count: reaction.count + 1, participating: true };
  //           participating = false;
  //         }
  //         // 갱신된 반응 배열 생성
  //         const updatedReactions = [
  //           ...comment.reactions.slice(0, reactionIndex),
  //           reaction,
  //           ...comment.reactions.slice(reactionIndex + 1)
  //         ];
  //         return { ...comment, reactions: updatedReactions };
  //       } else {
  //         // 새로운 반응 추가
  //         participating = false;
  //         return {
  //           ...comment,
  //           reactions: [...comment.reactions, { emoji, count: 1, participating: true }]
  //         };
  //       }
  //     } else {
  //       // 재귀적으로 답글 처리
  //       return {
  //         ...comment,
  //         replies: comment.replies.map(reply => addReactionToComment(reply))
  //       };
  //     }
  //   };
  //   // 전체 댓글 목록 업데이트
  //   setComments(prevComments => prevComments.map(comment => addReactionToComment(comment)));

  //   if (participating) {
  //     await deleteCommentReactions(commentId, emoji);
  //   } else {
  //     await addCommentReaction(commentId, emoji);
  //   }
  // };
  const handleAddReaction = async (commentId: number, emoji: string, userId: string) => {
    var participating = false;
    const addReactionToComment = (comment: CommentData): CommentData => {
      if (comment.comment_id === commentId) {
        let reactionIndex = comment.reactions.findIndex(reaction => reaction.emoji === emoji);

        if (reactionIndex !== -1) {
          // 반응이 이미 있으면
          let reaction = comment.reactions[reactionIndex];
          if (reaction.participating) {
            // 참여 중인 경우, 카운트 감소
            reaction = { ...reaction, count: reaction.count - 1, participating: false };
            participating = true;
          } else {
            // 참여 중이지 않은 경우, 카운트 증가
            reaction = { ...reaction, count: reaction.count + 1, participating: true };
            participating = false;
          }
          // 갱신된 반응 배열 생성
          const updatedReactions = [
            ...comment.reactions.slice(0, reactionIndex),
            reaction,
            ...comment.reactions.slice(reactionIndex + 1)
          ];
          return { ...comment, reactions: updatedReactions };
        } else {
          return {
            ...comment,
            reactions: [...comment.reactions, { emoji, count: 1, participating: true }]
          };
        }
      } else {
        // 재귀적으로 답글 처리
        return {
          ...comment,
          replies: comment.replies.map(reply => addReactionToComment(reply))
        };
      }
    };
    // 전체 댓글 목록 업데이트
    setComments(prevComments => prevComments.map(comment => addReactionToComment(comment)));

    if (participating) {
      await deleteCommentReactions(commentId, emoji);
    } else {
      await addCommentReaction(commentId, emoji);
    }
  };
  const handleAddComment = async (content: string, parentId: number | null) => {
    try {
      const slug = "index1"
      // 새 댓글을 서버에 전송
      await createComment(parentId, content, slug);
  
      // 댓글 추가 후 데이터를 다시 로드하는 기존 로직 호출
      loadInitialData();
    } catch (error) {
      // 댓글 추가 중 발생한 에러를 로깅
      console.error('Error adding comment:', error);
    }
  };

  const handleEditComment = async (commentId: number, newContent: string) => {
    try {
      await updateComment(commentId, newContent);
      loadInitialData();
    } catch (error) {
      // 댓글 추가 중 발생한 에러를 로깅
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      // 최상위 댓글에서 해당 댓글 찾기
      const commentIndex = comments.findIndex(comment => comment.comment_id === commentId && comment.parent_id === null);
      if (commentIndex !== -1) {
        const comment = comments[commentIndex];
        if (comment.replies.length > 0) {
          // 대댓글이 존재하면 내용을 "삭제된 메시지입니다"로 업데이트
          // await updateCommentContent(commentId, "삭제된 메시지입니다");
          await anonymizeComment(commentId, "삭제된 메시지입니다.");
        } else {
          // 대댓글이 없으면 현재 댓글 바로 삭제
          await deleteComment(commentId);
        }
      } else {
        // 대댓글일 경우 바로 삭제
        await deleteComment(commentId);
      }

      await loadInitialData();

    } catch (error) {
      console.error("Error handling comment operation:", error);
    }
  };


  const theme = createTheme({
    palette: {
      mode: useTheme().scheme, // 'dark'도 가능
    },
  });
  const loadInitialData = async () => {
    try {
      const Commentdata = await getComments("index1");
      const Reactiondata = await getCommentReactions("index1");
      const currentUserUuid = user?.id || '';

      // 서버에서 받은 데이터를 처리하여 상태를 초기화
      const processedData = processComments(Commentdata, Reactiondata, currentUserUuid);
      console.log(processedData);
      setComments(processedData);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };
  const user = useUser();
  useEffect(() => {
    loadInitialData();
  }, [user]); // 의존성 배열에 user를 추가하여 유저 정보가 변경될 때마다 데이터를 새로 불러옴

  return (
    <ThemeProvider theme={theme}>
      <CommentList
        comments={comments}
        onAddReaction={handleAddReaction}
        onEdit={handleEditComment}
        onDelete={handleDeleteComment}
        onReplySubmit={handleAddComment} // 추가된 부분
      />
      <CommentForm parentId={null} onSubmit={handleAddComment}/>
    </ThemeProvider>
  );
}
