import axios from 'axios';
import Navbar from "../components/Navbar";
import { TextField, Button, Alert, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { setLoggedIn } from "..";
import { useForm } from "react-hook-form";

function Login() {
    const url = 'https://nusgossip-api.onrender.com/login';
    const navigate = useNavigate();
    const { state } = useLocation();
    const { from } = state.from.pathname === '/signup' ? { from: '/' } : state;
    const [alert, setAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm();

    const onSubmit = (data) => {
        const user = {
            user: data
        };
        setLoading(true);

        axios.post(url, user)
            .then(response => {
                if (response.headers.authorization) {
                    localStorage.setItem('token', response.headers.authorization.split(' ')[1]);
                    localStorage.setItem('user_id', response.data.status.user.id)
                    localStorage.setItem('username', response.data.status.user.username);
                    setLoggedIn(true);
                    navigate(from);
                } else {
                    setAlert(true);
                    setLoading(false);
                }
            })
            .catch(error => console.log(error));
    };

    const handleSpace = (e) => {
        if (e.key === ' ') {
            e.preventDefault();
        }
    }

    return (
        <div>
            <Navbar />
            <div className="main" id="login">
                <form onSubmit={handleSubmit(onSubmit)} id="loginform">
                    <h1>Login</h1>
                    {alert ? <Alert severity="error">Wrong email or password</Alert> : <></>}
                    <TextField 
                        autoFocus
                        type="string" 
                        label="Username" 
                        id="username" 
                        onKeyDown={handleSpace}
                        error={Boolean(errors?.username)}
                        {...register("username", {required: true})}
                    />
                    <TextField 
                        type="password" 
                        label="Password" 
                        id="password" 
                        onKeyDown={handleSpace}
                        error={Boolean(errors?.password)}
                        {...register("password", {required: true})}
                    />
                    <p>Don't have an account? <Link to='/signup' style={{textDecoration: 'underline', color: 'blue'}}>Sign Up</Link></p>
                    <div className="formsubmit">
                        <Button type="submit" variant="contained">Confirm</Button>
                        {loading 
                        ? <CircularProgress />
                        : <></>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;