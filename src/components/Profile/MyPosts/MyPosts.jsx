import s from './MyPosts.module.css';
import Post from "./Post/Post";
import * as React from "react";
import {Field, reduxForm} from "redux-form";


const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component='textarea' name='newPostText'/>
            <button >Добавить сообщение</button>
        </form>
    )
}
const AddPostFormRedux = reduxForm({form: 'postsForm'})(AddNewPostForm);

const Myposts = (props) => {
    let postsElements =
        props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)

    let addPost = (formData) => {
        props.addPost(formData.newPostText);
        // props.onNewMessageChange(formData);
    };

    return (
        <div className={s.postblock}>
            <h3>Мои посты</h3>
            <div>
                <AddPostFormRedux onSubmit={addPost}/>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
};

export default Myposts;