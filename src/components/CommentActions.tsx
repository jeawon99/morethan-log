import * as React from 'react';
import { Button, ButtonGroup, Menu, MenuItem, Typography, styled, Popover, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { pretendard } from "src/assets";
import { useUser } from "@supabase/auth-helpers-react";
import LoginRequiredDialog from './LoginRequiredDialog';

interface CommentActionsProps {
  onAddReaction: (reaction: string) => void;
  onEdit: () => void;
  onDelete: () => void;
  is_author: boolean;
}

const emojis = [
    "😂", "❤️", "🤣", "👍", "😭", "🙏", "😘", "🥰", "😍", "😊",
    "🎉", "😁", "💕", "🥺", "😅", "🔥", "☺️", "🤦", "♥️", "🤷",
    "🙄", "😆", "🤗", "😉", "🎂", "🤔", "👏", "🙂", "😳", "🥳",
    "😎", "👌", "💜", "😔", "💪", "✨", "💖", "👀", "😋", "😏",
    "😢", "👉", "💗", "😩", "💯", "🌹", "💞", "🎈", "💙", "😃",
    "😡", "💐", "😜", "🙈", "🤞", "😄", "🤤", "🙌", "🤪", "❣️",
    "😀", "💋", "💀", "👇", "💔", "😌", "💓", "🤩", "🙃", "😬",
    "😱", "😴", "🤭", "😐", "🌞", "😒", "😇", "🌸", "😈", "🎶",
    "✌️", "🎊", "🥵", "😞", "💚", "☀️", "🖤", "💰", "😚", "👑",
    "🎁", "💥", "🙋", "☹️", "😑", "🥴", "👈", "💩"
  ];

export const CommentActions: React.FC<CommentActionsProps> = ({
  onAddReaction,
  onEdit,
  onDelete,
  is_author,
}) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [editMenuAnchorEl, setEditMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const [emojiPopoverAnchorEl, setEmojiPopoverAnchorEl] = React.useState<null | HTMLElement>(null);
    const user = useUser(); //useUser훅을 통해 유저데이터를 받아옴

    const handleEditMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setEditMenuAnchorEl(event.currentTarget);
    };

    const handleEditMenuClose = () => {
        setEditMenuAnchorEl(null);
    };

    const handleEmojiPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setEmojiPopoverAnchorEl(event.currentTarget);
    };

    const handleEmojiPopoverClose = () => {
        setEmojiPopoverAnchorEl(null);
    };

    const handleEmojiClick = (emoji: string) => {
        if (!user) {
            setOpenModal(true);  // 로그인이 필요한 모달 창을 엽니다
        } else {
            // console.log(user);
            onAddReaction(emoji);
            handleEmojiPopoverClose();
        }
    };

    const handleModalClose = () => {
        setOpenModal(false);
      };

    const Styleddate = styled(Typography)`
        font-family: ${pretendard.style.fontFamily};  // 폰트 객체 직접 사용
        font-weight: 500;  // 원하는 폰트 가중치 설정
    `;
    return (
        <>
            <LoginRequiredDialog open={openModal} onClose={handleModalClose} />
            <ButtonGroup size="small" color="inherit" variant="contained">
                <Button color="inherit" onClick={handleEmojiPopoverOpen} sx={{ width: 20, height: 20 }}>
                <AddReactionOutlinedIcon sx={{ fontSize: 15 }}/>
                </Button>

                {is_author && (
                <Button color="inherit" onClick={handleEditMenuOpen} sx={{ width: 20, height: 20 }}>
                <MoreHorizIcon sx={{ fontSize: 15 }}/>
                </Button>
                )}
                {/* <Button color="inherit" onClick={handleEditMenuOpen} sx={{ width: 20, height: 20 }}>
                <MoreHorizIcon sx={{ fontSize: 15 }}/>
                </Button> */}
            </ButtonGroup>
            <Menu
                anchorEl={editMenuAnchorEl}
                open={Boolean(editMenuAnchorEl)}
                onClose={handleEditMenuClose}
                PaperProps={{
                style: {
                    borderRadius: 10,
                },
                }}
            >
                <MenuItem onClick={onEdit}>
                    <EditIcon />
                    <Styleddate sx={{ marginLeft: 0.5 }}>편집</Styleddate>
                </MenuItem>
                <MenuItem onClick={onDelete}>
                    <DeleteIcon />
                    <Styleddate sx={{ marginLeft: 0.5 }}>삭제</Styleddate>
                </MenuItem>
            </Menu>


                <Popover
                    open={Boolean(emojiPopoverAnchorEl)}
                    anchorEl={emojiPopoverAnchorEl}
                    onClose={handleEmojiPopoverClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    slotProps={{
                        paper: {
                        sx: {
                            borderRadius: '16px', // 둥근 모서리를 설정합니다.
                        },
                        },
                    }}
                >
                    <div style={{ maxWidth: '30vh', maxHeight: '30vh', overflowY: 'auto', padding: '8px' }}>
                        <Grid container spacing={0} justifyContent="center">
                        {emojis.map((emoji) => (
                            <Grid item key={emoji} style={{ padding: '1px' }}>
                            <Button
                                onClick={() => handleEmojiClick(emoji)}
                                sx={{ fontSize: 24, minWidth: 32, minHeight: 32, padding: 0, margin: 0 }} // 이모지 크기와 버튼 크기를 조정합니다.
                            >
                                {emoji}
                            </Button>
                            </Grid>
                        ))}
                        </Grid>
                    </div>
                </Popover>
        </>
    );
};

export default CommentActions;
