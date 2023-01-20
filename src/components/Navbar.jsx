import { Link, useLocation, useNavigate } from "react-router-dom";
import { getLoggedIn } from "..";
import Logout from "./Logout";
import { Fragment, useState } from "react";
import { Autocomplete, TextField, Button, Menu, MenuItem, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useEffect } from "react";
import axios from "axios";
import uuid from "react-uuid";

const Navbar = () => {
    const location = useLocation();
    const loggedin = getLoggedIn();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [tags, setTags] = useState([]);
    const [users, setUsers] = useState([]);
    const [darkmode, setDarkMode] = useState(JSON.parse(localStorage.getItem('darkmode')));
    const tagurl = 'https://nusgossip-api.onrender.com/api/v1/tags?q=';
    const userurl = 'https://nusgossip-api.onrender.com/api/v1/users?q=';

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleInputChange = (e, value, reason) => {
        if (e.type === 'click') {
            if (reason === 'clear') {
                setTags([]);
                setUsers([]);
                setSearch('');
            }
        }
    }

    const handleChange = (e, value) => {
        if (e.type === 'click' && value !== null){
            if (value.name) {
                setRefresh(bool => !bool);
                setSearch('');
                navigate('/tag/' + value.name);
            } else if (value.username) {
                setRefresh(bool => !bool);
                setSearch('');
                navigate('/user/' + value.username);
            } else {
                setRefresh(bool => !bool);
                setSearch('');
                navigate('/search/?q=' + value);
            }
        } else if (e.key === 'Enter') {
            setRefresh(bool => !bool);
            setSearch('');
            navigate('/search/?q=' + value);
        }
    }

    const handleDarkMode = () => {
        setDarkMode(bool => !bool);
    };

    useEffect(() => {
        axios.get(tagurl + search)
            .then(response => {
                setTags(response.data);
            })
            .catch(error => console.log(error));
        axios.get(userurl + search)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => console.log(error));
    }, [search]);

    useEffect(() => {
        localStorage.setItem('darkmode', darkmode);
        if (darkmode) {
            document.documentElement.classList.add('dark');
            document.documentElement.style.setProperty('--darkmode', 1);
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.style.setProperty('--darkmode', 0);
        }
    }, [darkmode]);

    return (
        <nav>
            <div id="logo">
                <Link to="/">NUSGossip</Link>
            </div>
            <Autocomplete
                key={refresh} 
                freeSolo
                onInputChange={handleInputChange}
                onChange={handleChange}
                options={search === '' ? [...tags, ...users] : [...tags, ...users, search]}
                getOptionLabel={(option) => option.name ? option.name : option.username ? option.username : option}
                groupBy={(option) => option.name ? 'Tags' : option.username ? 'Users' : ''}
                renderOption={(props, option) => {
                    if (option.name) {
                        return (
                            <li {...props} key={uuid()}>{option.name}</li>
                        );
                    } else if (option.username) {
                        return (
                            <li {...props} key={uuid()}>{option.username}</li>
                        );     
                    } else {
                        return (
                            <Fragment key="0">
                                {tags.length === 0 && users.length === 0 ? <></> : <hr/>}
                                <li 
                                    {...props}  
                                    style={{
                                        paddingLeft: "15px", 
                                        paddingTop: "10px"}}>
                                    Search for: {search}
                                </li>
                            </Fragment>
                        );
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Search"
                        size="small"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: <SearchIcon sx={{fontSize: '20px'}} />, 
                            style: {width: '45vw', fontSize: '15px'}
                        }}
                    />
                )}
            />
            {loggedin
            ? <div>
                <IconButton onClick={handleDarkMode} id="darkmode">
                    {darkmode
                    ? <LightModeIcon />
                    : <DarkModeIcon />}
                </IconButton>
                <Button
                    onClick={handleClick}
                    style={{textTransform: "none", color: "#003882"}}
                >
                    {localStorage.getItem('username')}
                    <ArrowDropDownIcon />
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    disableScrollLock={true}
                    elevation={1}
                    MenuListProps={{disablePadding: true}}
                    style={{zIndex: "9999"}}
                >
                    <Link to="/user"><MenuItem onClick={handleClose}>My Profile</MenuItem></Link>
                    <Link to="/new"><MenuItem onClick={handleClose}>New Thread</MenuItem></Link>
                    <Logout handleClose={handleClose} />
                </Menu>
            </div>
            : <div>
                <IconButton onClick={handleDarkMode} id="darkmode">
                    {darkmode
                    ? <LightModeIcon />
                    : <DarkModeIcon />}
                </IconButton>
                <Link to="/login" state={{from: location}}><Button variant="contained">Login</Button></Link>
            </div>}
        </nav>
    );
};

export default Navbar;