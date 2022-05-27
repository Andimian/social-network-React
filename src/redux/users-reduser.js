/* Это просто чтобы не обэтоваться с названиями в Action creators */
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USER_COUNT = 'SET_TOTAL_USER_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

/*
Инициализационный объект для начального отображения (пока не сделан запрос на сервачеллу)
*/
let initialState =  {
    users: [],
    pageSize: 5,    //по сколько чел выводить на 1 странице
    totalUserCount: 0, //сколько всего юзеров
    currentPage: 1,  //активная страничка
    isFetching: false
};

/*
редьюсер принимает старый стэйт и экшен и меняет стейт на основании экшена
*/
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW: {
            return  {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            };
        }
        case UNFOLLOW: {
            return  {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            };
        }
        case SET_USERS: {
            return  {...state, users: action.users};
        }
        case SET_CURRENT_PAGE: {
            return  {...state, currentPage: action.currentPage};
        }
        case SET_TOTAL_USER_COUNT: {
            return  {...state, totalUserCount: action.count};
        }
        case TOGGLE_IS_FETCHING: {
            return  {...state, isFetching: action.isFetching};
        }
        default:
            return state;
    }
};
/*.......................................   Action creators ................................................*/
/*Если у тебя в объекте свойство называется так же как значнеие переменной - можно сокращать типо ({type: SET_CURRENT_PAGE, currentPage:currentPage}); можно записать ({type: SET_CURRENT_PAGE, currentPage});*/
export const follow = (userId) => ({type: FOLLOW, userId});
export const unFollow = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUserCount = (totalUserCount) => ({type: SET_TOTAL_USER_COUNT, count: totalUserCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching});
/*.......................................   Action creators end ............................................*/

// сам редьюсер (usersReducer) мы импортируем в нашем redux-store и в контейнерный комп-т надо импортировать крейтеры - соответственно делаем экспорт
export default usersReducer;