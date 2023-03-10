import { Component } from "react";
import { getLoggedIn } from "..";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment";
import Delete from "./Delete";
import CommentForm from "./CommentForm";

class Comment extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            body: props.data.body, 
            created_at: moment(props.data.created_at).local().format('D MMM YYYY, h:mma'), 
            author: props.data.author, 
            user_id: props.data.user_id.toString(), 
            id: props.data.id, 
            editable: false
        }
    }

    render() {
        const { body, created_at, author, id } = this.state;
        const loggedin = getLoggedIn();
        const url = 'https://nusgossip-api.onrender.com/api/v1/comments/' + this.state.id;

        //changes whether comment shows the content or shows
        //the comment form to allow it to be edited
        const setEditable = () => {
            this.setState(() => {
                return {editable: !this.state.editable};
            })
        };

        return (
            <div className="comment">
                <h4><Link to={"/user/" + author}>{author}</Link></h4>
                {
                    this.state.editable
                    ? <CommentForm text={body} id={id} setEditable={setEditable} />
                    : <div>
                    <p className="text">{body}</p>
                    <p className="postedby" style={{display: 'inline-block', marginRight: '5px'}}>Posted on {created_at}</p>
                    {loggedin && localStorage.getItem('user_id') === this.state.user_id
                    ? <div style={{display: 'inline-block'}}>
                        <Button onClick={setEditable}>Edit</Button>
                        <Delete url={url} />
                    </div>
                    : <></>}
                    </div>
                }
            </div>
        );
    };
}

export default Comment;