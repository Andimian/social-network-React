import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Navigate } from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../helpers/validator";


const Dialogs = (props) => {
    let usersElements = props.messagesPage.users.map(dialog => <DialogItem name={dialog.name} id={dialog.id} key={dialog.id}/>)

    let messageElements = props.messagesPage.messages.map(message => <Message message={message.message} key={message.id}/>)

    let newMessageBody = props.messagesPage.newMessageBody;

    let addNewMessage = (values) => {

        props.SendMessage(values.newMessageBody);
    }

    if(!props.isAuth) return <Navigate to="/login" />;

    return (
        <div className={s.dialogs}>
            <div className={s.users}>
                {usersElements}
            </div>
            <div className={s.messages}>
                <ul>{messageElements}</ul>

            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
};

const maxLength10 = maxLengthCreator(10);


const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                component={Textarea}
                name='newMessageBody'
                validate={[required, maxLength10]}
                placeholder='Введите сообщение'/>

            <button >Отправить</button>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm)


export default Dialogs;