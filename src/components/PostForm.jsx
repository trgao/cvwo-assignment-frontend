import axios from "axios";
import { Button, TextField, Autocomplete, Chip, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

const PostForm = ({ url, id }) => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    const username = localStorage.getItem('username');
    const [tags, setTags] = useState([]);
    const [info, setInfo] = useState({});
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const {
        handleSubmit, 
        control, 
        formState: { errors }, 
        reset
    } = useForm({
        defaultValues: {
            title: "", 
            body: "", 
            tags: []
        }
    });

    useEffect(() => {
        //getting popular tags to set as options for dropdown menu
        axios.get('https://nusgossip-api.onrender.com/api/v1/tags')
            .then(response => setOptions(response.data.map(tag => tag.name)))
            .catch(error => console.log(error));

        //checks if user is editing thread or posting new thread
        if (id) {
            axios.get(url)
                .then(response => {
                    setTags(response.data.tags.map(tag => tag.name));
                    setInfo(response.data);
                    reset({
                        title: response.data.title, 
                        body: response.data.body, 
                        tags: response.data.tags.map(tag => tag.name)
                    });
                })
                .catch(error => console.log(error));
        } else {
            setTags([]);
        }
    }, [reset]);

    const onSubmit = (data) => {
        setLoading(true);
        if (id) {
            const post = {
                title: data.title.trim(), 
                body: data.body.trim(), 
                user_id: info.user_id, 
                author: info.username, 
                tags: JSON.stringify(tags)
            };

            axios.put(url, post, {headers: {"Authorization": 'Bearer ' + token}})
                .then(response => {
                    navigate('/post/' + response.data.id);
                })
                .catch(error => console.log(error.response.data));
        } else {
            const post = {
                title: data.title.trim(), 
                body: data.body.trim(), 
                user_id: user_id, 
                author: username, 
                tags: JSON.stringify(tags)
            };

            axios.post(url, post, {headers: {"Authorization": 'Bearer ' + token}})
                .then(response => {
                    navigate('/post/' + response.data.id);
                })
                .catch(error => console.log(error.response.data));
        }
    };

    const handleCancel = () => {
        if (id) {
            navigate('/post/' + id);
        } else {
            navigate('/');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="title"
                rules={{ required: true }}
                render={({ field }) => (
                    <TextField
                        autoFocus
                        id="title"
                        label="Title"
                        type="text"
                        error={Boolean(errors?.title)}
                        helperText={errors?.title ? "Required field" : ""}
                        {...field}
                    />
                )}
            />
            <Autocomplete
                multiple
                id="tags-filled"
                options={options}
                freeSolo
                filterSelectedOptions
                value={tags}
                onChange={(e, value) => setTags(value.map(tag => tag.trim()))}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Tags"
                    />
                )}
            />
            <Controller
                control={control}
                name="body"
                rules={{ required: true }}
                render={({ field }) => (
                    <TextField
                        id="body"
                        label="Main Text"
                        multiline
                        minRows={15}
                        maxRows={20}
                        error={Boolean(errors?.body)}
                        helperText={errors?.body ? "Required field" : ""}
                        {...field}
                    />
                )}
            />
            <div className="formsubmit">
                <Button type="submit" variant="contained">Post</Button>
                <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                {loading 
                ? <CircularProgress />
                : <></>}
            </div>
        </form>
    );
};

export default PostForm;