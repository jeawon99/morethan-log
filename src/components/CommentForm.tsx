
import React, { useState } from 'react';
import { IconButton, Typography, Input, Box, Avatar, styled, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputBase } from '@mui/material';
import { grey } from '@mui/material/colors';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import { pretendard } from "src/assets"
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from 'next/router';
import LoginRequiredDialog from './LoginRequiredDialog';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';

interface CommentFormProps {
    parentId: number | null;
    onSubmit: (comment: string, parentId: number | null) => Promise<void>; // 반환 타입을 Promise<void>로 변경
    onDetialReplySubmit: (comment: string, parentId: number | null, author: string, avatar_url: string) => Promise<void>; // 반환 타입을 Promise<void>로 변경
  }

const CommentForm: React.FC<CommentFormProps> = ({ parentId, onSubmit, onDetialReplySubmit }) => {
  const [comment, setComment] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [checked, setChecked] = React.useState(true);

  const user = useUser(); //useUser훅을 통해 유저데이터를 받아옴
//   const router = useRouter();

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    if (!checked) {
        await onSubmit(comment, parentId);
    } else {
        await onDetialReplySubmit(comment, parentId, "", "");
    }
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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
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

const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&::before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&::after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
  }));
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
            <>
            <Avatar sx={{ bgcolor: grey[500], marginRight: 2, width: 30, height: 30 }} src={user?user.user_metadata.avatar_url:""} aria-label="profile">
            {user? user.user_metadata.full_name[0]: "A"}
            </Avatar>
            
            {/* <Avatar sx={{ bgcolor: grey[500], marginRight: 2, width: 30, height: 30 }} src={user?user.user_metadata.avatar_url:""} aria-label="profile">
            {user? user.user_metadata.full_name[0]: "A"}
            </Avatar> */}
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
            </>
            <div>
                <Android12Switch defaultChecked onChange={handleChange} />
                <Typography sx={{ ml: 2, flex: 1,fontFamily: pretendard.style.fontFamily, fontWeight: 400, fontSize:14, marginTop: -1 }}>익명</Typography>
            </div>
        </Box>
    </>
  );
}
export default CommentForm;
