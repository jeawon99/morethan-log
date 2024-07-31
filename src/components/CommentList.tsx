import * as React from 'react';
import Comment from './Comment';
import styled from '@emotion/styled';

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

  interface CommentListProps {
    comments: CommentData[];
    onAddReaction: (commentId: number, emoji: string, userId: string) => void;
    onEdit: (commentId: number, newContent: string) => void;
    onDelete: (commentId: number) => void;
    onReplySubmit: (comment: string, parentId: number | null) => Promise<void>;
    onDetialReplySubmit: (comment: string, parentId: number | null, author: string, avatar_url:string) => Promise<void>;
  }

const CommentList: React.FC<CommentListProps> = ({ comments, onAddReaction, onEdit, onDelete, onReplySubmit, onDetialReplySubmit }) => {
    return (
      <div>
        {comments.map((comment) => (
          <div key={comment.comment_id}>
            <Comment
              comment_id={comment.comment_id}
              parent_id={comment.parent_id} // 추가된 부분
              author={comment.author}
              date={comment.date}
              content={comment.content}
              avatarUrl={comment.avatarUrl}
              reactions={comment.reactions}
              user_uuid={comment.user_uuid}
              onAddReaction={onAddReaction}
              onEdit={onEdit}
              onDelete={onDelete}
              onReplySubmit={onReplySubmit} // 추가된 부분
              onDetialReplySubmit={onDetialReplySubmit}
            />
            {comment.replies && comment.replies.length > 0 && (
              <div style={{ paddingLeft: '35px' }}>
                <CommentList
                  comments={comment.replies}
                  onAddReaction={onAddReaction}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onReplySubmit={onReplySubmit} // 추가된 부분
                  onDetialReplySubmit={onDetialReplySubmit}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
const StyledWrapper = styled.div`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  border-radius: 1.5rem;
  max-width: 56rem;
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray4};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin: 2rem auto 0 auto;
  > article {
    margin: 0 auto;
    max-width: 42rem;
  }
`
export default CommentList;


