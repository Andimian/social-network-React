import React from "react";
import styles from "./FormsControls.module.css";
import {Field} from "redux-form";


export const FormControl = ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error;
    return (
        <div>
            <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
                {props.children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
};

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}> <textarea{...input} {...restProps} /></FormControl>;
};

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}> <input{...input} {...restProps} /></FormControl>
};

export const createField = (placeholder, name, validators, component, props = {}, text = '') => (
    <div>
        <Field placeholder={placeholder}
               name={name}
               validate={validators}
               component={component}
               {...props}
        /> {text}
    </div>
)
