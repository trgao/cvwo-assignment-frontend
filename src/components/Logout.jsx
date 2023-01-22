import axios from "axios";
import { setLoggedIn, setLoggedInTime } from "..";
import { Link, useNavigate } from "react-router-dom";
import { MenuItem } from "@mui/material";

const Logout = ({ handleClose }) => {
    const navigate = useNavigate();
    const url = 'https://nusgossip-api.onrender.com/logout';
    const token = localStorage.getItem('token');

    const handleClick = () => {
        axios.delete(url, {headers:{"Authorization": 'Bearer ' + token}})
            .then(response => {
                setLoggedIn(false);
                setLoggedInTime('');
                localStorage.setItem('token', '');
                localStorage.setItem('user_id', '');
                localStorage.setItem('username', '');
                navigate('/');
            })
            .catch(error => console.log(error));
    };

    return (
        <Link onClick={handleClick}><MenuItem onClick={handleClose}>Logout</MenuItem></Link>
    );
}

export default Logout;