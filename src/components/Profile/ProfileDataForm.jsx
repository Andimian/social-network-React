import React from "react";
import {createField, Textarea, Input} from "../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import handleSubmit from "redux-form/lib/handleSubmit";
import s from "../Profile/Profile.module.css";
import style from "../common/FormsControls/FormsControls.module.css";

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>Сохранить</button>
            </div>

            {/*ОБработка ошибки*/}
            {error && <div className={style.formSummaryError}>
                {error}
            </div>
            }

            <div className="">
                Имя: {createField('Имя', "fullName", [], Input)}
            </div>
            <div className="">
                {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
            </div>
            <div className="">
                Профессиональные навыки:
                {createField("lookingForAJobDescription", "lookingForAJobDescription", [], Textarea)}
            </div>
            <div className="">
                Обо мне:
                {createField("Обо мне", "aboutMe", [], Textarea)}
            </div>
            <div className="">
                Контакты: {Object.keys(profile.contacts).map(key => {
                return (
                    <div key={key} className={s.contact}>
                        <b>{key}: {createField(key, "contacts." + key, [], Input)}</b>
                    </div>
                )
            })}
            </div>
        </form>
    )

}

const ProfileDataFormReduxForm = reduxForm({
    form: 'edit-profile',
    enableReinitialize: true,
    destroyOnUnmount: false
})(ProfileDataForm);

export default ProfileDataFormReduxForm;