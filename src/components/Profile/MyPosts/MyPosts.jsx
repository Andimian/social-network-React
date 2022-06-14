import s from './MyPosts.module.css';
import Post from "./Post/Post";
import * as React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../helpers/validator";
import {Textarea} from "../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                component={Textarea}
                name='newPostText'
                validate={[required, maxLength10]}
                placeholder={'Сообщение'}
            />

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
        console.log(formData);
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