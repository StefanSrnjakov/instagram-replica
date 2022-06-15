import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';

function Profile(){
    const userContext = useContext(UserContext); 
    const [profile, setProfile] = useState({});
    const [likes, setLikes] = useState(0);
    const [isSet, setIsSet] = useState(false);

    useEffect(function(){
        const getProfile = async function(){
            const res = await fetch("http://localhost:3001/users/profile", {credentials: "include"});
            const data = await res.json();
            await setProfile(data);
            var likesCounter=0;
            for(let i=0; i<data.photos.length; i++){
                likesCounter+=data.photos[i].likedBy.length;
            }
            setLikes(likesCounter);
            setIsSet(true);
        }

        getProfile();
    }, []);

    return (
        <div>

            {!userContext.user ? <Navigate replace to="/login" /> : ""}
            <br/>
            <br/>
            <h1>User profile</h1>
            {
                isSet === true &&
                    <div><p>Username: {profile.username}</p>
                <p>Email: {profile.email}</p>
                <p>Number of photos shared: {profile.photos.length}</p>
                        <p>Number of likes for all photos: {likes} </p></div>
            }
        </div>
    );
}

export default Profile;