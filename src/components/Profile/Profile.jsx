import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MypostsContainer from "./MyPosts/MyPostsContainer";
import React from "react";



const Profile = (props) => {
    return (
            <div>
                <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
                <MypostsContainer />
            </div>
        )
};

export default Profile;