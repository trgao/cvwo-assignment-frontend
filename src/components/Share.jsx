import { Button } from "@mui/material";

const Share = ({ id, sx, setOpen, menu }) => {
    const copyURL = () => {
        setOpen(true);
        if (menu) {
            const url = 'http://localhost:3001/post/' + id;
            navigator.clipboard.writeText(url);
        } else {
            navigator.clipboard.writeText(window.location);
        }
    }

    return (
        <Button onClick={copyURL} sx={sx} disableRipple={menu ? true : false}>Share</Button>
    );
};

export default Share;