import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MypostsContainer from "./MyPosts/MyPostsContainer";
import React from "react";



const Profile = (props) => {
    return (
            <div>
                <ProfileInfo profile={props.profile}
                             status={props.status}
                             updateStatus={props.updateStatus}
                             isOwner={props.isOwner}
                             savePhoto={props.savePhoto}
                             saveProfile={props.saveProfile}
                />
                <MypostsContainer />
            </div>
        )
};

export default Profile;