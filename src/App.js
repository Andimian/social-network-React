import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import React from "react";


const App = () => {

    return (

            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path="/profile/*" element={<ProfileContainer /> }/>
                        <Route path="/profile/:userId" element={<ProfileContainer /> }/>
                        <Route path="/messages/*" element={<DialogsContainer />}/>
                        <Route path="/users/*" element={<UsersContainer/>}/>
                        <Route path="/login/*" element={<UsersContainer/>}/>
                    </Routes>
                </div>
            </div>
    );
}

export default App;