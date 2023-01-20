import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import PostsList from "../components/PostsList";
import Copied from "../components/Copied";
import Order from "../components/Order";
import Username from "../components/Username";
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

function User() {
    const username = localStorage.getItem('username');
    const urlparam = useParams();
    const others = urlparam.username ? true : false;
    const [url, setURL] = useState(others 
                                   ? 'https://nusgossip-api.onrender.com/api/v1/posts?author=' + urlparam.username 
                                   : 'https://nusgossip-api.onrender.com/api/v1/posts?author=' + username);
    const baseurl = url;
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (others) {
            setURL('https://nusgossip-api.onrender.com/api/v1/posts?author=' + urlparam.username);
            axios.get('https://nusgossip-api.onrender.com/api/v1/users/' + urlparam.username)
                .then(response => {
                    console.log(response);
                    if (response.data !== null) {
                        setName(urlparam.username);
                    }
                })
                .catch(error => console.log(error));
        } else {
            setName(username);
        }
    }, [urlparam]);

    const handleClick = () => {
        setEdit(true);
    };

    return (
        <div>
            <Navbar />
            {name === ''
            ? <div className="main">
                <h1>User not found</h1>
            </div>
            : <div className="main">
                {edit
                ? <Username setEdit={setEdit} />
                : <h1>
                    user/{name} 
                    {others 
                    ? <></> 
                    : <IconButton onClick={handleClick}>
                        <EditIcon />
                    </IconButton>}
                </h1>}
                <Order setURL={setURL} baseurl={baseurl} />
                <PostsList url={url} setOpen={setOpen} />
                <Copied open={open} setOpen={setOpen} />
            </div>}
        </div>
    );
}

export default User;