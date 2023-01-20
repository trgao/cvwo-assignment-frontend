import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";
import Post from "./Post";
import uuid from 'react-uuid';

const PostsList = ({ url, setOpen }) => {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [empty, setEmpty] = useState(false);

    useEffect(() => {
        setEmpty(false);
        axios.get(url)
            .then(response => {
                if (response.data.length === 0) {
                    setEmpty(true);
                } else {
                    setPosts(posts => response.data);
                }
            })
            .catch(error => {
                console.log(error);
                setEmpty(true);
            });
    }, [url]);

    const fetchData = () => {
        axios.get(url + '&offset=' + posts.length)
            .then(response => {
                if (response.data.length === 0) {
                    setHasMore(false);
                } else {
                    setPosts(posts => posts.concat(response.data));
                } 
            })
            .catch(error => console.log(error));
    };
    
    return (
        empty
        ? <p style={{ textAlign: "center" }}>
            <b>No threads</b>
        </p>
        : <InfiniteScroll
          dataLength={posts.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
                <b>No more threads to read</b>
            </p>}>
            {posts.map(post => {
                return <Post data={post} key={uuid()} setOpen={setOpen} />;
            })}
        </InfiniteScroll>
    );
};

export default PostsList;