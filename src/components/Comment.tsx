import * as React from 'react';
import { useState } from 'react';
import { grey } from '@mui/material/colors';
import CommentActions from './CommentActions';
import { Avatar, Typography, styled, Divider, Box, Button, InputBase } from '@mui/material';
import { pretendard } from "src/assets";
import CommentForm from './CommentForm'; // CommentForm import
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import { useUser } from "@supabase/auth-helpers-react";
import LoginRequiredDialog from './LoginRequiredDialog';

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

interface CommentProps {
  comment_id: number;
  parent_id: number | null; // 추가된 parent_id prop
  author: string;
  date: string;
  content: string;
  avatarUrl: string;
  reactions: Reaction[];
  user_uuid: string;
  onAddReaction: (commentId: number, emoji: string, userId: string) => void;
  onEdit: (commentId: number, newContent: string) => void; // onEdit 수정
  onDelete: (commentId: number) => void;
  onReplySubmit: (comment: string, parentId: number | null) => Promise<void>;
  onDetialReplySubmit: (comment: string, parentId: number | null, author: string, avatar_url: string) => Promise<void>; 
}
const CommentContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column'
}));

const UserInfo = styled('div')({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',  // Ensure that the container can be positioned relative to this
  width: '100%'  // Take full width to position actions correctly
});

const CommentText = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 36, // Adjust based on the avatar size and margin to align text as needed
});

const VerticalDivider = styled(Divider)(({ theme }) => ({
  position: 'absolute',
  left: 'calc(15px)', // Adjusted to center at the bottom of Avatar
  top: '56px', // Adjusted to start just below the Avatar (Avatar height + padding top)
  bottom: 0,
  width: 1,
}));

const ActionsContainer = styled('div')({
  position: 'absolute',
  right: 8, // Distance from the right edge of the UserInfo
  top: 8 // Distance from the top edge of the UserInfo
});

// Pretendard 폰트를 적용할 Typography 스타일 컴포넌트
const StyledAuthor = styled(Typography)`
  font-family: ${pretendard.style.fontFamily};  // 폰트 객체 직접 사용
  font-weight: 500;  // 원하는 폰트 가중치 설정
`;

const StyledDate = styled(Typography)`
  font-family: ${pretendard.style.fontFamily};  // 폰트 객체 직접 사용
  font-weight: 500;  // 원하는 폰트 가중치 설정
`;
const StyledContent = styled(Typography)`
  font-family: ${pretendard.style.fontFamily};  // 폰트 객체 직접 사용
  font-weight: 400;  // 원하는 폰트 가중치 설정
  // color: #37352F; // 예를 들어, 파란색으로 설정
  font-size: 15px; // 폰트 크기를 16px로 설정
`
const StyledEmoji= styled(Typography)`
  font-family: ${pretendard.style.fontFamily};  // 폰트 객체 직접 사용
  font-weight: 400;  // 원하는 폰트 가중치 설정
  font-size: 15px; // 폰트 크기를 16px로 설정
  color: #37352F; // 예를 들어, 파란색으로 설정
`


interface ReactionButtonProps {
  participating: string;
}



  
const ReactionContainer = styled(Box)`
display: flex;
align-items: center;
margin-top: 8px;
flex-wrap: wrap;
overflow: hidden; // 기본적으로 overflow를 숨김
transition: max-height 0.3s ease; // 애니메이션 효과 추가
`;

const ReactionButton = styled(Box)<ReactionButtonProps>(({ theme, participating }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '1px 6px',
    background: participating==="true" ? theme.palette.info.main : '#f0f0f0',
    borderRadius: '16px',
    cursor: 'pointer',
    marginRight: '8px',
  }));

const Comment: React.FC<CommentProps> = ({ comment_id, parent_id, author, date, content, avatarUrl, reactions, user_uuid, onAddReaction, onEdit, onDelete, onReplySubmit, onDetialReplySubmit }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const user = useUser();
  const user_id = user? user.id : "-1"
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);


  const [showAll, setShowAll] = useState(false);

  const topReactions = reactions
    .filter(reaction => reaction.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const allReactions = reactions.filter(reaction => reaction.count > 0);

  const reactionsToShow = showAll ? allReactions : topReactions;



  const handleAddReaction = (emoji: string) => {
    if (!user) {
      setOpenModal(true);
    } else {
      onAddReaction(comment_id, emoji, user_id);
    }
  };
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSaveEdit = () => {
    onEdit(comment_id, editedContent);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(comment_id);
  };

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };
  return (
    <>
      <LoginRequiredDialog open={openModal} onClose={handleModalClose} />
      <CommentContainer>
      <UserInfo>
        <Avatar src={avatarUrl} sx={{ bgcolor: grey[500], marginRight: 1, marginBottom: 1, width: 30, height: 30 }} aria-label="profile">
          {author[0]}
        </Avatar>
        <StyledAuthor variant="subtitle1">
          {author}
        </StyledAuthor>
        <StyledDate variant="body2" color="text.secondary" sx={{ fontSize: '0.7rem', marginLeft: 0.8, paddingTop: 0 }}>
          {date}
        </StyledDate>
        <ActionsContainer>
          <CommentActions onAddReaction={handleAddReaction} onEdit={handleEdit} onDelete={handleDelete} is_author={user_id==user_uuid} />
        </ActionsContainer>
      </UserInfo>
      <VerticalDivider orientation="vertical" flexItem />
      <CommentText>
        {isEditing ? (
          <>
            <InputBase
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              fullWidth
              multiline
              sx={{ fontFamily: pretendard.style.fontFamily, fontWeight: 400, fontSize: 15 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 1 }}>
              <Button color="primary" onClick={handleCancelEdit} sx={{ marginRight: 1 }}>취소</Button>
              <Button color="primary" onClick={handleSaveEdit} variant="contained" >저장</Button>
            </Box>
          </>
        ) : (
          <StyledContent variant="body2">{content}</StyledContent>
        )}
        <ReactionContainer>
        {parent_id === null && (
            <Button
            sx={{ paddingRight: 1.2, borderRadius: '16px', padding: 0 }}
            onClick={toggleReplyForm}
            >
            답글
            </Button>
        )}
        {reactionsToShow.map((reaction) => (
            <ReactionButton
            participating={reaction.participating ? "true" : "false"}
            key={reaction.emoji}
            onClick={() => handleAddReaction(reaction.emoji)}
            >
            <StyledEmoji>
                <span role="img" aria-label="emoji" style={{ fontSize: '1rem', marginRight: '2px' }}>
                {reaction.emoji}
                </span>
                {reaction.count}
            </StyledEmoji>
            </ReactionButton>
        ))}
        {allReactions.length > 5 && (
            <Button onClick={() => setShowAll(!showAll)}>
            {showAll ? '간략히 보기' : '더보기'}
            </Button>
        )}
        </ReactionContainer>
        {showReplyForm && <CommentForm parentId={comment_id} onSubmit={onReplySubmit} onDetialReplySubmit={onDetialReplySubmit}/>}
      
      </CommentText>
    </CommentContainer>
    </>

  );
};

export default Comment;
