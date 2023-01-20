import { useState } from "react";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Delete from "./Delete";
import Share from "./Share";
import { getLoggedIn } from "..";

const MoreActions = ({ post_user_id, id, url, setOpen }) => {
    const loggedin = getLoggedIn();
    const user_id = localStorage.getItem('user_id');
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e) => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
    };
    
    const handleClose = (e) => {
        e.stopPropagation();
        setAnchorEl(null);
    };

    const buttonStyle = {
        "&.MuiButtonBase-root:hover": {
            bgcolor: "transparent"
        }
    };

    return (<>
        <IconButton onClick={handleClick}>
            <MoreVertIcon />
        </IconButton>
        {loggedin && post_user_id === user_id
        ? <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            elevation={1}
            MenuListProps={{disablePadding: true}}
        >
            <MenuItem onClick={handleClose}>
                <Share id={id} sx={buttonStyle} setOpen={setOpen} menu />
            </MenuItem>
            <Link to={"/edit/" + id}>
                <MenuItem onClick={handleClose}>
                    <Button sx={buttonStyle} disableRipple>Edit</Button>
                </MenuItem>
            </Link>
            <MenuItem onClick={handleClose}>
                <Delete url={url} sx={buttonStyle} menu />
            </MenuItem>
        </Menu>
        : <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            elevation={1}
            MenuListProps={{disablePadding: true}}
        >
            <MenuItem onClick={handleClose}>
                <Share id={id} sx={buttonStyle} setOpen={setOpen} menu />
            </MenuItem>
        </Menu>}
    </>);
};

export default MoreActions;