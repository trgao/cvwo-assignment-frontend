import { TextField, Button, Alert } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const Username = ({ setEdit }) => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const url = 'https://nusgossip-api.onrender.com/api/v1/users/' + username;
    const [alert, setAlert] = useState(false);

    const {
        handleSubmit, 
        control, 
        formState: {errors}
    } = useForm({
        defaultValues: {username: username}
    });

    const onSubmit = (data) => {
        axios.put(url, data, {headers: {"Authorization": 'Bearer ' + token}})
            .then(response => {
                localStorage.setItem('username', data.username);
                window.location.reload(false);
            })
            .catch(error => {
                console.log(error);
                setAlert(true);
            });
    };

    const handleSpace = (e) => {
        if (e.key === ' ') {
            e.preventDefault();
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {alert
            ? <Alert severity="error">Username is already taken</Alert>
            : <></>}
            <Controller
                control={control}
                name="username"
                rules={{ required: true }}
                render={({ field }) => (
                    <TextField
                        autoFocus
                        id="changeusername"
                        label="Change Username"
                        onKeyDown={handleSpace}
                        error={Boolean(errors?.username)}
                        helperText={errors?.username ? "Required field" : ""}
                        {...field}
                    />
                )}
            />
            <div className="formbuttons">
                <Button type="submit" variant="contained">Confirm</Button>
                <Button variant="outlined" onClick={() => setEdit(false)}>Cancel</Button>
            </div>
        </form>
    )
};

export default Username;