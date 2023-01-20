import axios from "axios";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Comment from "./Comment";
import uuid from 'react-uuid';

const CommentsList = ({ id }) => {
    const url = 'https://nusgossip-api.onrender.com/api/v1/comments?post_id=' + id;
    const [comments, setComments] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [empty, setEmpty] = useState(false);

    useEffect(() => {
        axios.get(url)
            .then(response => {
                if (response.data.length === 0) {
                    setEmpty(true);
                } else {
                    setComments(response.data);
                }
            })
            .catch(error => console.log(error));
    }, []);

    const fetchData = () => {
        axios.get(url + '&offset=' + comments.length)
            .then(response => {
                if (response.data.length === 0) {
                    setHasMore(false);
                } else {
                    setComments(comments => comments.concat(response.data));
                } 
            })
            .catch(error => console.log(error));
    };

    return (
        empty
        ? <p style={{ textAlign: "center" }}>
            <b>No comments</b>
        </p>
        : <InfiniteScroll
          dataLength={comments.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
                <b>No more comments to read</b>
            </p>}>
            {comments.map(comment => {
                return <Comment data={comment} key={uuid()} />;
            })}
        </InfiniteScroll>
    );
};

export default CommentsList;