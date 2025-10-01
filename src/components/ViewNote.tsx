import {
    DialogActions,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Button
} from "@mui/material";

type ViewNoteProps = {
    open: boolean
    message: string;
    onClose: () => void;
}

export default function ViewNote({ open, message, onClose }: ViewNoteProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth='sm'
        >
            <DialogTitle
                sx={{ textAlign: "center" }}
            >
                Note
            </DialogTitle>
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
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}