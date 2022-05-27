import h from './Header.module.css';
import Navbar from "../Navbar/Navbar";

const Header = () => {
    return (
        <header className={h.header}>
            <div className="container">
                <img src="../src/img/fenix.png" alt=""/>
            </div>
        </header>
    )
};

export default Header;