import h from './Header.module.css';
import {NavLink} from "react-router-dom";
import logo from "../../assets/images/logo.png";

const Header = (props) => {
    return (
        <header className={h.header}>
            <div className={h.logo}><img src={logo} alt=""/></div>
            <div className={h.loginBlock}>
                {props.isAuth ? props.login :
                <NavLink to={'/login'}>Login</NavLink> }
            </div>
        </header>
    )
};

export default Header;