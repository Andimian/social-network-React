import s from './Post.module.css';

const Post = (props) => {
    return (
        <div className={s.post}>
            <div>{props.message}</div>
            <div>{props.likesCount}</div>
        </div>
    )
};

export default Post;