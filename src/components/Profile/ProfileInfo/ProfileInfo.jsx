import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import React, {useState} from "react";
import cityImg from "../../../assets/images/night-city.jpg";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import noAva from "../../../assets/images/no_ava.png"
import ProfileDataForm from "../ProfileDataForm";


const ProfileInfo = ({profile, savePhoto, status, updateStatus, isOwner, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
          savePhoto(e.target.files[0])
        }
    };

    const onSubmit =  (formData) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        )
    }

    return (
        <div>
            <div className={s.wellpaper}>
                <img src={cityImg} alt=""/>
            </div>

            <img src={profile.photos.small || noAva} alt=""/>
            {isOwner && <input type="file" onChange={onMainPhotoSelected}/>}

            { editMode
                ? <ProfileDataForm initialValues={profile} onSubmit={onSubmit} profile={profile}/>
                : <ProfileData goToEditMode={ () => {setEditMode(true)}} profile={profile} isOwner={isOwner}/>}


            <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
        </div>
    )
};


const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return (
        <div className={s.user}>

            {
                isOwner &&
                <div className="">
                    <button onClick={goToEditMode}>Редактировать</button>
                </div>
            }


            <div className="">
                Имя: {profile.fullName}
            </div>
            <div className="">
                Ищу работу: {profile.lookingForAJob ? 'Да' : 'Нет'}
            </div>
            {profile.lookingForAJob &&
            <div className="">
                Профессиональные навыки: {profile.lookingForAJobDescription}
            </div>
            }
            <div className="">
                Обо мне: {profile.aboutMe}
            </div>
            <div className="">
                Контакты: {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
            })}
            </div>


        </div>
        )

}


const Contact = ({contactTitle, contactValue}) => {
    return <div><b>{contactTitle}</b>: {contactValue}</div>
}


export default ProfileInfo;
