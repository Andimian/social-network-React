import s from '../Dialogs.module.css';
import React from "react";
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    let path = "/messages/" + props.id;
    return (
        <div className={s.users__item}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
};

export default DialogItem;