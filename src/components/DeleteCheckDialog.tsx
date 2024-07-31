// components/DeleteCheckDialog.tsx
import React from 'react';
import { pretendard } from "src/assets"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface DeleteCheckDialogProps {
    open: boolean;
    title: string;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteCheckDialog: React.FC<DeleteCheckDialogProps> = ({ open, title, onClose, onConfirm}) => {
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
            <DialogTitle sx={{fontFamily: pretendard.style.fontFamily, fontWeight: 400 }}>{title}</DialogTitle>
            <DialogContent>
            <DialogContentText sx={{fontFamily: pretendard.style.fontFamily, fontWeight: 400 }}>
                삭제하시겠습니까?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button sx={{fontFamily: pretendard.style.fontFamily, fontWeight: 400 }} onClick={onClose} color="inherit" >취소</Button>
            <Button sx={{fontFamily: pretendard.style.fontFamily, fontWeight: 400 }} onClick={onConfirm} color="secondary" variant="contained">
                확인
            </Button>
            </DialogActions>
      </Dialog>
    );
};

export default DeleteCheckDialog;
