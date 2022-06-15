import {useState, useEffect} from 'react';
import Photo from './Photo';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function HotPhotos() {
    const [photos, setPhotos] = useState([]);
    const maxReports=1;

    useEffect(function () {
        function checkReports(photo){
            return photo.reports.length < maxReports;
        }

        const getPhotos = async function () {
            const res = await fetch("http://localhost:3001/photos");
            var data = await res.json();
            var decay = require('decay'), hotScore = decay.redditHot();
            data.forEach(function (c) {
                c.score = hotScore(c.likedBy.length, 0, new Date(c.created));
            });
            data.sort(function (a, b) {
                return a.score - b.score;
            })
            data.reverse();

            data = data.filter(checkReports);

            setPhotos(data);
        }
        getPhotos();
    }, []);


    return (
        <div className="container">
            <div className="row" style={{width:"50%"}}>
                <TextField id="filled-basic" label="Search by tags" variant="filled"/>
            </div>
            <div className="row">
                <h3>Photos:</h3>
                <ul>
                    {photos.map(photo => (<Photo photo={photo} key={photo._id}></Photo>))}
                </ul>
            </div>
        </div>
    );
}

export default HotPhotos;