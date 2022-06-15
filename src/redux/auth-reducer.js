import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState =  {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return  {
                ...state,
                ...action.payload, //создаём объект в экшене и деструктуризируем его, туда положим userId, email, login. Тут вот выше ...state и дальше ..action - это мы склеиваем из двух объектов один. Так как data идёт после state, то userId, email, login из data перезатрут эти же свойства из state
            };
        }
        default:
            return state;
    }
};


/*action creators*/
export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}

})


/*thunk creators*/
export const getUserData = () => (dispatch) => {
    return authAPI.giveMe().then(response => {
        if (response.data.resultCode === 0) {
            let {email, id, login} = response.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    });
};
export const login = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getUserData());
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Какая-то ошибка';
                dispatch(stopSubmit('login', {_error: message}));
            }
        });
};
export const logout = () => (dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        });
};



export default authReducer;