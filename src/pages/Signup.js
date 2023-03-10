import axios from "axios";
import Navbar from "../components/Navbar";
import { TextField, Button, Alert, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setLoggedIn, handleSpace, setLoggedInTime } from "..";
import { useForm } from "react-hook-form";
import { isEmail, isAlphanumeric } from "validator";
import moment from "moment";

function Signup() {
    const navigate = useNavigate();
    const url = 'https://nusgossip-api.onrender.com/signup';
    const [alert, setAlert] = useState(false);
    const [alerttext, setAlertText] = useState('');
    const [loading, setLoading] = useState(false);

    const { 
        register, 
        handleSubmit, 
        getValues, 
        formState: {errors}
    } = useForm();

    const onSubmit = (data) => {
        const { email, username, password } = data;
        setLoading(true);

        const user = {
            user: {
                email: email, 
                username: username, 
                password: password
            }
        };

        axios.post(url, user)
            .then(response => {
                localStorage.setItem('token', response.headers.authorization.split(' ')[1]);
                localStorage.setItem('user_id', response.data.user.id)
                localStorage.setItem('username', response.data.user.username);
                setLoggedIn(true);
                setLoggedInTime(moment().toISOString());
                navigate('/');
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 422) {
                    setAlert(true);
                    setAlertText(error.response.data.status.message + '.');
                    setLoading(false);
                }
            });
    };

    return (
        <div>
            <Navbar />
            <div className="main" id="signup">
                <form onSubmit={handleSubmit(onSubmit)} id="signupform">
                    <h1>Signup</h1>
                    {alert ? <Alert severity="error">{alerttext}</Alert> : <></>}
                    <TextField 
                        autoFocus
                        type="string" 
                        label="Email" 
                        id="email" 
                        onKeyDown={handleSpace}
                        error={Boolean(errors?.email)}
                        helperText={errors?.email ? errors.email.message : ""}
                        {...register("email", {
                            required: "Required field", 
                            validate: email => isEmail(email) || "Invalid email address"
                        })}
                    />
                    <TextField 
                        type="string" 
                        label="Username" 
                        id="username" 
                        onKeyDown={handleSpace}
                        error={Boolean(errors?.username)}
                        helperText={errors?.username ? errors.username.message : ""}
                        {...register("username", {
                            required: "Required field", 
                            validate: username => isAlphanumeric(username) || "No special characters"
                        })}
                    />
                    <TextField 
                        type="password" 
                        label="Password" 
                        id="password" 
                        onKeyDown={handleSpace}
                        error={Boolean(errors?.password)}
                        helperText={errors?.password ? errors.password.message : ""}
                        {...register("password", {
                            required: "Required field",  
                            minLength: {
                                value: 6, 
                                message: 'Minimum 6 characters'
                            }
                        })}
                    />
                    <TextField 
                        type="password" 
                        label="Confirm Password" 
                        id="confirmpassword" 
                        onKeyDown={handleSpace} 
                        error={Boolean(errors?.confirmpassword)}
                        helperText={errors?.confirmpassword ? errors.confirmpassword.message : ""}
                        {...register("confirmpassword", {
                            required: "Required field", 
                            validate: password => password === getValues("password") || "Password is not the same"
                        })}
                    />
                    <div className="formsubmit">
                        <Button type="submit" variant="contained">Confirm</Button>
                        {loading 
                        ? <CircularProgress />
                        : <></>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;