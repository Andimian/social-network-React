import s from './ProfileInfo.module.css';
import userImg from '../../../assets/images/user.jpg';
import Preloader from "../../common/Preloader/Preloader";
import React from "react";
import citiImg from "../../../assets/images/night-city.jpg";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.wellpaper}>
                <img src={citiImg} alt=""/>
            </div><div className={s.user}>
                <img src={props.profile.photos.small} alt=""/>
            </div>
        </div>
    )
};

export default ProfileInfo;
