import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MypostsContainer from "./MyPosts/MyPostsContainer";
import React from "react";
import { Navigate } from "react-router-dom";

const Profile = (props) => {

    if(!props.isAuth) return <Navigate to="/login" />;

    return (
            <div>
                <ProfileInfo profile={props.profile}/>
                <MypostsContainer />
            </div>
        )
};

export default Profile;