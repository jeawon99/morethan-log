
import React, { useState } from 'react';
import { IconButton, Input, Box, Avatar, styled, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputBase } from '@mui/material';
import { grey } from '@mui/material/colors';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import { pretendard } from "src/assets"
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from 'next/router';
import LoginRequiredDialog from './LoginRequiredDialog';

interface CommentFormProps {
    parentId: number | null;
    onSubmit: (comment: string, parentId: number | null) => Promise<void>; // 반환 타입을 Promise<void>로 변경
  }

const CommentForm: React.FC<CommentFormProps> = ({ parentId, onSubmit }) => {
  const [comment, setComment] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const user = useUser(); //useUser훅을 통해 유저데이터를 받아옴
//   const router = useRouter();

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    await onSubmit(comment, parentId); // 비동기 실행을 기다립니다
    setComment(''); // 댓글 제출 후 입력 필드 초기화
  };
  const handleFocus = () => {
    if (!user) {
      setOpenModal(true);  // 로그인이 필요한 모달 창을 엽니다
    }
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // 엔터 키로 인한 줄바꿈 방지
      await handleSubmit();
    }
  };

//   const handleLoginRedirect = () => {
//     router.push('/login');
//   };

  const Styledcontent = styled(InputBase)`
  font-family: ${pretendard.style.fontFamily};  // 폰트 객체 직접 사용
  font-weight: 400;  // 원하는 폰트 가중치 설정
  font-size: 15px; // 폰트 크기를 16px로 설정

`;
  return (
    <>
        <LoginRequiredDialog open={openModal} onClose={handleModalClose} />
        <Box component="form" sx={{
            display: 'flex',
            alignItems: 'flex-start', // Avatar를 상단에 고정
            background: 'none', // 배경 없음
            boxShadow: 'none', // 그림자 없음
            border: 0, // 경계선 없음
            width: 'auto',
            marginY: 2, // 상하 여백
        }}>
            <Avatar sx={{ bgcolor: grey[500], marginRight: 2, width: 30, height: 30 }} src={user?user.user_metadata.avatar_url:""} aria-label="profile">
            {user? user.user_metadata.full_name[0]: "A"}
            </Avatar>
            <Input
            sx={{ ml: 1, flex: 1, fontFamily: pretendard.style.fontFamily, fontWeight: 400 }}
            placeholder="댓글 작성..."
            inputProps={{ 'aria-label': 'write comment' }}
            value={comment}
            onChange={handleCommentChange}
            multiline={true}
            color='secondary'
            onKeyDown={handleKeyDown}
            onClick={handleFocus}

            />
            <IconButton aria-label="send" onClick={handleSubmit}>
            <ArrowUpwardRoundedIcon />
            </IconButton>
        </Box>
    </>
  );
}
export default CommentForm;
