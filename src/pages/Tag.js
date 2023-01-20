import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PostsList from "../components/PostsList";
import Copied from "../components/Copied";
import Order from "../components/Order";

function Tag() {
    const urlparam = useParams();
    const name = urlparam.name.split('_').join(' ')
    const [url, setURL] = useState('https://nusgossip-api.onrender.com/api/v1/tags/' + name + '?');
    const baseurl = url;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const name = urlparam.name.split('_').join(' ');
        setURL('https://nusgossip-api.onrender.com/api/v1/tags/' + name + '?');
    }, [urlparam.name]);

    return (
        <div>
            <Navbar />
            <div className="main">
                <h1>#{name}</h1>
                <Order setURL={setURL} baseurl={baseurl} />
                <PostsList url={url} setOpen={setOpen} />
                <Copied open={open} setOpen={setOpen} />
            </div>
        </div>
    );
}

export default Tag;