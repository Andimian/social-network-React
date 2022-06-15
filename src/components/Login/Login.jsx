import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../helpers/validator";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import style from '../common/FormsControls/FormsControls.module.css'

const maxLength10 = maxLengthCreator(30);

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"} name={"email"} component={Input} validate={[required, maxLength10]} />
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} component={"input"} type="password"/>
            </div>
            <div>
                <Field type={"checkbox"} name={"rememberMe"} component={"input"}/> Запомнить меня
            </div>

            {props.error && <div className={style.formSummaryError}>
                {props.error}
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
        isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);