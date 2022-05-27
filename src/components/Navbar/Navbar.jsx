import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={s.nav}>
            <ul className={s.nav__list}>
                <li className={`${s.nav__item} ${s.active}`}>
                    <NavLink className={ navData => navData.isActive ? s.active : "" } to="/profile" >Профиль</NavLink>
                </li>
                <li className={s.nav__item}>
                    <NavLink className={ navData => navData.isActive ? s.active : "" } to="/messages">Сообщения</NavLink>
                </li>
                   <li className={s.nav__item}>
                    <NavLink className={ navData => navData.isActive ? s.active : "" } to="/users">Пользователи</NavLink>
                </li>
                <li className={s.nav__item}>
                    <NavLink className={ navData => navData.isActive ? s.active : "" } to="/news">Новости</NavLink>
                </li>
                <li className={s.nav__item}>
                    <NavLink className={ navData => navData.isActive ? s.active : "" } to="/music">Музыка</NavLink>
                </li>
                <li className={s.nav__item}>
                    <NavLink className={ navData => navData.isActive ? s.active : "" } to="/settings">Настройки</NavLink>
                </li>
            </ul>
        </nav>
    )
};

export default Navbar;