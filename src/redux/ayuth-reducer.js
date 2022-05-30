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
                ...action.data, //создаём объект в экшене и деструктуризируем его, туда положим userId, email, login. Тут вот выше ...state и дальше ..action - это мы склеиваем из двух объектов один. Так как data идёт после state, то userId, email, login из data перезатрут эти же свойства из state
                isAuth: true
            };
        }
        default:
            return state;
    }
}

/*action creators*/
export const setAuthUserData = (userId, email, login) => ({type: SET_USER_DATA, data: {userId, email, login}})

export default authReducer;