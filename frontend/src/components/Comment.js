import {useState, useEffect} from 'react';

// import Comment from './Comment';

function Comment(props) {
    return (<div>
            <b>{props.comment.userId.username}: </b>
            <span>{props.comment.content}</span><br></br>
        </div>
    );
}

export default Comment;