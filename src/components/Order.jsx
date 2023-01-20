import { Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';

const Order = ({ setURL, baseurl }) => {
    const [sortby, setSortBy] = useState('Newest');
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeOrder = (e) => {
        const order = e.target.innerText;
        setAnchorEl(null);
        setSortBy(order);
        setURL(baseurl + '&order=' + order);
    }

    return (
        <div className="order">
            <Button 
                onClick={handleClick} 
                style={{textTransform: "none", color: "black"}}
                disableRipple>
                Sort By: {sortby}
                <ArrowDropDownIcon />
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                elevation={1}
                MenuListProps={{disablePadding: true}}
            >
                <MenuItem onClick={changeOrder}>Top</MenuItem>
                <MenuItem onClick={changeOrder}>Discussion</MenuItem>
                <MenuItem onClick={changeOrder}>Newest</MenuItem>
                <MenuItem onClick={changeOrder}>Oldest</MenuItem>
            </Menu>
            <hr/>
        </div>
    );
};

export default Order;