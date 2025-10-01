import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Button
} from "@mui/material";

type ConfirmModalProps = {
    open: boolean;
    title: string;
    message: string;
    onClose: () => void;
    onConfirm: () => void;
}

export default function ConfirmationModal({ open, title, message, onClose, onConfirm }: ConfirmModalProps) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ textAlign: "center" }}>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    color='inherit'
                    sx={{
                        fontWeight: 500,
                        height: '28px',
                        borderRadius: '7px',
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    sx={{
                        fontWeight: 500,
                        height: '28px',
                        borderRadius: '7px',
                        backgroundColor: '#1F2E59',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#25386cff',
                        },
                    }}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );

}