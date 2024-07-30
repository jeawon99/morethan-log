// components/LoginRequiredDialog.tsx
import React from 'react';
import { pretendard } from "src/assets"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useRouter } from 'next/router';

interface LoginRequiredDialogProps {
    open: boolean;
    onClose: () => void;
}

const LoginRequiredDialog: React.FC<LoginRequiredDialogProps> = ({ open, onClose}) => {
    const router = useRouter();
    const handleLoginRedirect = () => {
        // const currentPath = router.asPath;
        const currentUrl = window.location.href;
        router.push(`/login?redirect=${encodeURIComponent(currentUrl)}`);
    };
    

    return (
        <Dialog
        open={open}
        onClose={onClose}
        sx={{
            '& .MuiPaper-root': { // Dialog 내부의 Paper 컴포넌트에 스타일 적용
            borderRadius: '16px', // 모서리를 둥글게
            paddingBottom: '5px',
            paddingRight: '5px'
            }
        }}
        >
            <DialogTitle sx={{fontFamily: pretendard.style.fontFamily, fontWeight: 400 }}>로그인 필요</DialogTitle>
            <DialogContent>
            <DialogContentText sx={{fontFamily: pretendard.style.fontFamily, fontWeight: 400 }}>
                로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button sx={{fontFamily: pretendard.style.fontFamily, fontWeight: 400 }} onClick={onClose} color="inherit" >돌아가기</Button>
            <Button sx={{fontFamily: pretendard.style.fontFamily, fontWeight: 400 }} onClick={handleLoginRedirect} color="secondary" variant="contained">
                로그인하러 가기
            </Button>
            </DialogActions>
      </Dialog>
    );
};

export default LoginRequiredDialog;
