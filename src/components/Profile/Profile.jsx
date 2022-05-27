import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MypostsContainer from "./MyPosts/MyPostsContainer";
import React from "react";
import Preloader from "../common/Preloader/Preloader";

const Profile = (props) => {

    return (
            <div>
                <ProfileInfo profile={props.profile}/>
                <MypostsContainer />
            </div>
        )
};

export default Profile;