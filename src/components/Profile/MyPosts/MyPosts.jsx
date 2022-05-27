import s from './MyPosts.module.css';
import Post from "./Post/Post";
import * as React from "react";


const Myposts = (props) => {
    let postsElements =
        props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    let newPostElement = React.createRef();

    let addPost = () => {
        // props.addPost();
        props.onNewMessageChange();
    };

    // Это презентационная компонента - надо избавить её от "лишних" знаний. Оставляем только чтобы бралось значение с textarea и вызывался какой-то колбек, который в неё передаётся (раньше до 43 урока тут был dispatch - метод из бизнеса - он типо не нужен тут по концепции.
    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.onSendMessageClick(text);
    };

    return (
        <div className={s.postblock}>
            <h3>Мои посты</h3>
            <div>
                <div className="">
                    <textarea
                        ref={newPostElement}
                        value={props.newPostText}
                        onChange={onPostChange}
                    />
                </div>
                <button onClick={addPost}>Добавить сообщение</button>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
};

export default Myposts;