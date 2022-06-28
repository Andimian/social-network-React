import React from "react";
import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../helpers/validator";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import style from '../common/FormsControls/FormsControls.module.css'

const maxLength10 = maxLengthCreator(30);

const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
                {createField("email", "email", [required, maxLength10], Input)}
                {createField("Password", "password", [required, maxLength10], Input, {type: "password"} )}
                {createField(null, "rememberMe", [required], Input, {type: "checkbox"}, 'Запомнить меня' )}

            {error && <div className={style.formSummaryError}>
                {error}
            </div>
            }

            <div>
                <button>Авторизоваться</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    };

    if (props.isAuth) {
        return <Navigate to={"/profile"}/>
    }

    return (
        <div>

            <h1>Авторизация</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
};

const mapStateToProps = (state) => ({
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login})(Login);