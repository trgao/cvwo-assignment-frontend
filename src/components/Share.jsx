import { Button } from "@mui/material";

const Share = ({ id, sx, setOpen, menu }) => {
    const copyURL = () => {
        setOpen(true);
        if (menu) {
            const url = 'https://nusgossip.netlify.app/post/' + id;
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