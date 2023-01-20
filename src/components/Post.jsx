import { Link, useNavigate } from "react-router-dom";
import MoreActions from "./MoreActions";
import PostedBy from "./PostedBy";
import Tags from "./Tags";

const Post = ({ data, setOpen }) => {
    const navigate = useNavigate();
    const post = { 
        id: data.id, 
        title: data.title, 
        body: data.body.length > 300 
            ? data.body.substring(0, 300) + '...'
            : data.body, 
        created_at: data.created_at,
        author: data.author, 
        user_id: data.user_id.toString(), 
        likes_count: data.likes_count, 
        comments_count: data.comments_count, 
        tags: data.tags
    };

    const { id, title, body, created_at, likes_count, comments_count, author, user_id, tags } = post;
    const url = 'https://nusgossip-api.onrender.com/api/v1/posts/' + id;

    const handleClick = (e) => {
        navigate('/post/' + id);
    };

    return (
        <div className="post" onClick={handleClick}>
            <div className="cardheader">
                <h1><Link to={"/post/" + id}>{title}</Link></h1>
                <MoreActions url={url} id={id} post_user_id={user_id} setOpen={setOpen} />
            </div>
            <Tags tags={tags} />
            <p>{body}</p>
            <PostedBy author={author} created_at={created_at} likes_count={likes_count} comments_count={comments_count} icon />
        </div>
    );
}

export default Post;