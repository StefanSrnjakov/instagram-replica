import {useState, useEffect} from 'react';
import Photo from './Photo';
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';

function Photos() {
    const [photos, setPhotos] = useState([]);
    const [photosTags, setPhotosTags] = useState([]);
    const [tagsString, setTagsString] = useState("");
    const maxReports = 1;

    function checkReports(photo){
        return photo.reports.length < maxReports;
    }

    useEffect(function () {

        const getPhotos = async function () {
            const res = await fetch("http://localhost:3001/photos");
            var data = await res.json();
            data = data.filter(checkReports);
            setPhotos(data);
        }
        getPhotos();
    }, []);

    const sortPhotos = function (e){
        var tagsArray = e.target.value.split(" ");
        var photosArray = [];
        photos.forEach(function (photo){
            tagsArray.forEach(function (tag){
                if(photo.tags.indexOf(tag) !== -1) {
                    photosArray.push(photo);
                }
            })
        })
        setPhotosTags(photosArray);
    }

    return (
        <div className="container">
            <div className="row" style={{width:"50%"}}>
                <TextField id="filled-basic" label="Search by tags" variant="filled" onChange={sortPhotos}/>
            </div>
            <div className="row">
                <h3>Photos:</h3>
                <ul>

                    {photosTags.length === 0 && photos.map(photo => (<Photo photo={photo} key={photo._id}></Photo>))}
                    {photosTags.length > 0 && photosTags.map(photo => (<Photo photo={photo} key={photo._id}></Photo>))}
                </ul>
            </div>
        </div>
    );
}

export default Photos;