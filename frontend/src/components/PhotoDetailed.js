import {Navigate} from "react-router-dom";
import AddComment from "./AddComment";
import Comment from "./Comment";
import {useState, useEffect} from 'react';
import {useParams} from "react-router";

function PhotoDetailed(props) {
    const { id } = useParams();
    const [isLoaded, setLoaded] = useState(false);
    const [photo, setPhoto] = useState({postedBy:{}, comments:[], likedBy:[]});


    useEffect(function () {
        const getPhoto = async function () {
            const res = await fetch("http://localhost:3001/photos/" + id);
            const data = await res.json();
            setPhoto(data);
            setLoaded(true);
        }
        getPhoto();
    },[]);


    async function setLike(){
        const res = await fetch('http://localhost:3001/photos/like/' + id, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type' : 'application/json'},
        });
        const data = await res.json();
        setPhoto(data);
    }
    async function refreshPhoto(){
        const res = await fetch('http://localhost:3001/photos/' + id, {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type' : 'application/json'},
        });
        const data = await res.json();
        setPhoto(data);
    }

    return (
        <div className="col" style={{
            minWidth: "100px",
            padding: "2%",
            display: "inline-block",
            margin: "1%",
            border: "1px solid whitesmoke",
            borderRadius: "10px"
        }}>
            <div style={{border: "solid whitesmoke",
                borderRadius: "10px"}}>
                <span style={{padding: "3px", fontSize: "25px"}}>{photo.postedBy.username}</span>
                <br></br><span style={{fontSize: "13px", color:"grey"}}>{photo.created}</span>
                <div className="card bg-dark text-dark mb-2">
                    {isLoaded == true &&<img className="card-img" src={"http://localhost:3001/" + photo.path} alt={photo.name}/>}
                    <div className="card-img-overlay">
                        <h5 className="card-title">{photo.name}</h5>
                    </div>
                </div>
                <span onClick={setLike} style={{padding:"10px", fontSize: "25px"}}>♥   {photo.likedBy.length}</span>

                <AddComment photoId = {photo._id} refreshPhoto = {(e)=>(refreshPhoto())}></AddComment>
                {photo.comments.map(comment => (<Comment comment={comment} key={comment._id}></Comment>))}

            </div>
        </div>
    );
}

export default PhotoDetailed;