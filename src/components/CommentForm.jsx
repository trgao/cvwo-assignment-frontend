import axios from 'axios';
import { Button, TextField, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const CommentForm = ({ text, id, setEditable }) => {
    const {
        handleSubmit, 
        control, 
        formState: { errors }
    } = useForm({
        defaultValues: {comment: text ? text : ""}
    });

    const urlparam = useParams();
    const url = 'https://nusgossip-api.onrender.com/api/v1/comments';
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    const username = localStorage.getItem('username');
    const [loading, setLoading] = useState(false);

    const onSubmit = (value) => {
        const data = {
            body: value.comment.trim(), 
            post_id: urlparam.id,
            user_id: user_id, 
            author: username
        };
        setLoading(true);

        if (text) {
            axios.put(url + '/' + id, data, {headers: {"Authorization": 'Bearer ' + token}})
            .then(response => {
                console.log(response);
                window.location.reload(false);
            })
            .catch(error => console.log(error.response.data));
        } else {
            axios.post(url, data, {headers: {"Authorization": 'Bearer ' + token}})
            .then(response => {
                console.log(response);
                window.location.reload(false);
            })
            .catch(error => console.log(error.response.data));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="comment"
                rules={{ required: true }}
                render={({ field }) => (
                    <TextField
                        autoFocus
                        id="comment"
                        label="Comment"
                        type="comment"
                        multiline
                        minRows={4}
                        maxRows={8}
                        error={Boolean(errors?.comment)}
                        helperText={errors?.comment ? "Required field" : ""}
                        {...field}
                    />
                )}
            />
            <div className="formsubmit">
                <Button type="submit" variant="contained">Post</Button>
                {setEditable
                ? <Button variant="outlined" onClick={setEditable}>Cancel</Button>
                : <></>}
                {loading 
                ? <CircularProgress />
                : <></>}
            </div>       
        </form>
    );
};

export default CommentForm;