import axios from "axios";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useState } from "react";

const Delete = ({ url, sx, menu }) => {
    const [open, setOpen] = useState(false);

    const handleClick = (e) => {
        e.stopPropagation();
        setOpen(true);
    }

    const handleConfirm = () =>  {
        const token = localStorage.getItem('token');

        axios.delete(url, {headers:{"Authorization": 'Bearer ' + token}})
            .then(response => {
                console.log(response);
                window.location.reload();
            })
            .catch(error => console.log(error));
    };

    return (
        <span>
            <Button onClick={handleClick} sx={sx} disableRipple={menu ? true : false}>Delete</Button>
            <Dialog open={open}>
                <DialogContent>Are you sure you want to delete?</DialogContent>
                <DialogActions style={{justifyContent: 'center', marginBottom: '10px'}}>
                    <Button variant="contained" onClick={handleConfirm}>Confirm</Button>
                    <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </span>
    );
};

export default Delete;