// interfaces.ts

import { formatDistanceToNow, parseISO } from 'date-fns';

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
function formatCommentDate(dateIsoString: string): string {
    const date = parseISO(dateIsoString);
    const now = new Date();
    const differenceInMinutes = (now.getTime() - date.getTime()) / (1000 * 60);
  
    if (differenceInMinutes < 60) {
      return `${Math.floor(differenceInMinutes)}분 전`;
    } else if (differenceInMinutes < 1440) {
      return `${Math.floor(differenceInMinutes / 60)}시간 전`;
    } else if (differenceInMinutes < 10080) {
      return `${Math.floor(differenceInMinutes / 1440)}일 전`;
    }
  
    return `${date.toISOString().split('T')[0]} ${date.toTimeString().split(':')[0]}:${date.toTimeString().split(':')[1]}`;
}


export function processComments(comments: any[], reactions: any[], currentUserUuid: string): CommentData[] {
    const reactionMap = reactions.reduce((acc: Map<number, Reaction[]>, reaction) => {
      const { comment_id, user_uuid, reaction_emoji } = reaction;
      const existing = acc.get(comment_id) || [];
      const foundReaction = existing.find(r => r.emoji === reaction_emoji);
  
      if (foundReaction) {
        foundReaction.count++;
        if (user_uuid === currentUserUuid) {
          foundReaction.participating = true;
        }
      } else {
        existing.push({
          emoji: reaction_emoji,
          count: 1,
          participating: user_uuid === currentUserUuid
        });
      }
  
      acc.set(comment_id, existing);
      return acc;
    }, new Map<number, Reaction[]>());
  
    const commentMap = comments.reduce((acc: Map<number, CommentData>, comment) => {
      const commentData: CommentData = {
        comment_id: comment.id,
        slug: comment.slug,
        parent_id: comment.parent_id,
        author: comment.author,
        date: formatCommentDate(comment.created_at),
        content: comment.content,
        avatarUrl: comment.avatar_url,
        user_uuid: comment.user_uuid,
        reactions: reactionMap.get(comment.id) || [],
        replies: []
      };
      acc.set(comment.id, commentData);
      return acc;
    }, new Map<number, CommentData>());
  
    commentMap.forEach(comment => {
      if (comment.parent_id !== null) {
        const parent = commentMap.get(comment.parent_id);
        if (parent) {
          parent.replies.push(comment);
        }
      }
    });
  
    return Array.from(commentMap.values()).filter(comment => comment.parent_id === null);
  }
  