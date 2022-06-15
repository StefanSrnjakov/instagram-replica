import {useContext, useState} from 'react'
import {UserContext} from '../userContext';
import {Navigate} from "react-router";

function AddComment(props) {
    const userContext = useContext(UserContext);
    const [content, setContent] = useState('');

    async function onSubmit(e) {
        e.preventDefault();

        if(!content){
            alert("empty comment!");
            return;
        }

        const formData = new FormData();
        // formData.append('content', content);
        // formData.append('photoId', props.photoId);
        const res = await fetch('http://localhost:3001/comments', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                content: content,
                photoId: props.photoId
            })
        });
        const data = await res.json();
        setContent("");
        props.refreshPhoto();
    }

    return (
        <form className="form-group" onSubmit={onSubmit}>
            {/*{!userContext.user ? <Navigate replace to="/login" /> : ""}*/}
            <input style={{display: "inline-block", maxWidth:"80%"}} type="text" className="form-control" name="content"
                   placeholder="write comment" value={content} onChange={(e) => {
                setContent(e.target.value)
            }}/>
            <input style={{display: "inline-block"}} className="btn btn-light" type="submit" name="submit"
                   value="post"/>
        </form>
    )
}

export default AddComment;