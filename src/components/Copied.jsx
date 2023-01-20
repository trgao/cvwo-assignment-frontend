import { IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Copied = ({ open, setOpen }) => {
    const handleClose = () => {
        setOpen(false);
    };

    const action = (
        <IconButton onClick={handleClose}>
            <CloseIcon sx={{color: "white"}}/>
        </IconButton>
    );

    return (
        <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            message="Copied URL to clipboard"
            action={action}
        />
    );
};

export default Copied;