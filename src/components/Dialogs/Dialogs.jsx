import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
    let usersElements = props.messagesPage.users.map(dialog => <DialogItem name={dialog.name} id={dialog.id} key={dialog.id}/>)
    let messageElements = props.messagesPage.messages.map(message => <Message message={message.message} key={message.id}/>)
    let newMessageBody = props.messagesPage.newMessageBody;

    let onSendMessageClick = () => {
        props.onSendMessageClick();
    };

    let onNewMessageChange = (e) => {
        let body = e.target.value;
        props.onNewMessageChange(body);
    };

    return (
        <div className={s.dialogs}>
            <div className={s.users}>
                {usersElements}
            </div>
            <div className={s.messages}>
                <ul>{messageElements}</ul>
                <div className="">
                    <textarea
                        value={newMessageBody}
                        placeholder='Введите сообщение'
                        onChange={onNewMessageChange}
                    ></textarea>
                    <button onClick={onSendMessageClick}>Отправить</button>
                </div>
            </div>

        </div>
    )
};

export default Dialogs;