import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PostsList from "../components/PostsList";
import Copied from "../components/Copied";
import Order from "../components/Order";
import axios from "axios";
import Tags from "../components/Tags";
import Users from "../components/Users";

function Search() {
    const urlparam = useSearchParams()[0];
    const [url, setURL] = useState('https://nusgossip-api.onrender.com/api/v1/posts?q=' + urlparam.get('q'));
    const baseurl = url;
    const tagurl = 'https://nusgossip-api.onrender.com/api/v1/tags?q=' + urlparam.get('q');
    const userurl = 'https://nusgossip-api.onrender.com/api/v1/users?q=' + urlparam.get('q');
    const [open, setOpen] = useState(false);
    const [tags, setTags] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setURL('https://nusgossip-api.onrender.com/api/v1/posts?q=' + urlparam.get('q'));
        axios.get(tagurl)
            .then(response => {
                setTags(response.data);
            })
            .catch(error => console.log(error));
        axios.get(userurl)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => console.log(error));
    }, [tagurl, userurl, urlparam]);

    return (
        <div>
            <Navbar />
            <div className="main">
                <h1>Search for "{urlparam.get('q')}"</h1>
                {tags.length === 0
                ? <></>
                : <>
                    <h4>Tags</h4>
                    <Tags tags={tags} />
                </>}
                {users.length === 0
                ? <></>
                : <>
                    <h4>Users</h4>
                    <Users users={users} />
                </>}
                <Order setURL={setURL} baseurl={baseurl} />
                <PostsList url={url} setOpen={setOpen} />
                <Copied open={open} setOpen={setOpen} />
            </div>
        </div>
    );
}

export default Search;