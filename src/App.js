import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import React, {Component, Suspense} from "react";
import LoginPage from "./components/Login/Login";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import Provider from "react-redux/es/components/Provider";
import store from "./redux/redux-store";

const DialogsContainer = React.lazy( () => import("./components/Dialogs/DialogsContainer")) ;
const ProfileContainer = React.lazy( () => import("./components/Profile/ProfileContainer")) ;


class App extends Component {

    catchAllUnhandledErrors =() => {
        alert('Произошла ошибка! Где-то :) Это общий обработчик.')
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandlerejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandlerejection', this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        } else {
            return (
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Suspense fallback={<h1>Loading profile...</h1>}>
                        {/*<Suspense fallback={<Preloader/>}>*/}
                        <Routes>
                            <Route path="/profile/*" element={<ProfileContainer/>}/>
                            <Route path="/profile/:userId" element={<ProfileContainer/>}/>
                            <Route path="/messages/*" element={<DialogsContainer/>}/>
                            <Route path="/users/*" element={<UsersContainer/>}/>
                            <Route path="/login/*" element={<LoginPage/>}/>
                            <Route path="*" element={<div>404</div>}/>
                            <Route path="/" element={<Navigate to="/profile" from="/" />} />
                        </Routes>
                        </Suspense>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

let AppContainer = connect(mapStateToProps, {initializeApp})(App);

const SamuraiJSApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp;