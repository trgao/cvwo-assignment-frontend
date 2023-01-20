import Navbar from "../components/Navbar";
import PostForm from "../components/PostForm";

function New() {
    const url = 'https://nusgossip-api.onrender.com/api/v1/posts';

    return (
        <div>
            <Navbar />
            <div className="main">
                <PostForm url={url}/>
            </div>
        </div>
    );
}

export default New;