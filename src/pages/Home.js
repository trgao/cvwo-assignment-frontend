import { useState } from 'react';
import Copied from '../components/Copied';
import Navbar from '../components/Navbar';
import Order from '../components/Order';
import PopularTags from '../components/PopularTags';
import PostsList from '../components/PostsList';

function Home() {
    const [url, setURL] = useState('https://nusgossip-api.onrender.com/api/v1/posts?');
    const [open, setOpen] = useState(false);
    const baseurl = url;

    return (
        <div>
            <Navbar />
            <div className="main">
                <PopularTags />
                <Order setURL={setURL} baseurl={baseurl} />
                <PostsList url={url} setOpen={setOpen} />
                <Copied open={open} setOpen={setOpen} />
            </div>
        </div>
    );
}

export default Home;