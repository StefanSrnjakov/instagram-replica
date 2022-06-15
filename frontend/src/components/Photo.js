import {Link, Navigate} from "react-router-dom";
import AddComment from "./AddComment";
import Comment from "./Comment";
import {useState, useEffect} from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

function Photo(props) {
    const [photo, setPhoto] = useState(props.photo);

    async function setLike() {
        const res = await fetch('http://localhost:3001/photos/like/' + props.photo._id, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        });
        const data = await res.json();
        setPhoto(data);
        refreshPhoto();
    }

    async function handleReport() {
        const res = await fetch('http://localhost:3001/photos/report/' + props.photo._id, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        });
        const data = await res.json();
        setPhoto(data);
        refreshPhoto();
    }

    async function refreshPhoto() {
        const res = await fetch('http://localhost:3001/photos/' + props.photo._id, {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        });
        const data = await res.json();
        setPhoto(data);
    }

    return (
        <div className="col" style={{
            minWidth: "31.3%",
            maxWidth: "31.3%",
            height: "200px",
            padding: "2%",
            display: "inline-block",
            margin: "1%",
            border: "1px solid whitesmoke",
            borderRadius: "10px"
        }}>

            <div style={{
                border: "solid whitesmoke",
                borderRadius: "10px"
            }}>
                <span style={{padding: "3px", fontSize: "25px"}}>{photo.postedBy.username}</span>
                <br></br><span style={{fontSize: "13px", color: "grey"}}>{photo.created}</span>
                <Link to={'/photos/' + photo._id}>

                    <div className="card bg-dark text-dark mb-2">

                        <img style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover"
                        }}
                             src={"http://localhost:3001/" + photo.path}
                             alt={photo.name}/>

                        <div className="card-img-overlay">
                            <h5 className="card-title">{photo.name}</h5>
                        </div>
                    </div>
                </Link>

                <div className="row">
                    <div className="col-9">
                        <span onClick={setLike}
                              style={{padding: "10px", fontSize: "25px"}}><ThumbUpIcon/> {photo.likedBy.length}</span>
                    </div>
                    <div className="col-2">
                        <span style={{textAlign: "right"}}><Button onClick={handleReport}
                            color="secondary"><ReportGmailerrorredIcon/></Button></span>
                    </div>
                </div>
                {/*<AddComment photoId={photo._id} refreshPhoto={(e) => (refreshPhoto())}></AddComment>*/}
                {/*{photo.comments.map(comment => (<Comment comment={comment} key={comment._id}></Comment>))}*/}

            </div>
        </div>
    );
}

export default Photo;