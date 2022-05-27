import * as React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reduser";
import Myposts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        onNewMessageChange: () => {
            dispatch(addPostActionCreator());
        },
        onSendMessageClick: (text) => {
            dispatch(updateNewPostTextActionCreator(text))
        }
    }
};

const MypostsContainer = connect(mapStateToProps, mapDispatchToProps)(Myposts);

export default MypostsContainer;