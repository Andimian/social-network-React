import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import React from "react";
import cityImg from "../../../assets/images/night-city.jpg";
import ProfileStatus from "./ProfileStatus";


const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.wellpaper}>
                <img src={cityImg} alt=""/>
            </div><div className={s.user}>
                <img src={props.profile.photos.small} alt=""/>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
};

export default ProfileInfo;
