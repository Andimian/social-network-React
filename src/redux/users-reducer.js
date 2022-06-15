/* Это просто чтобы не обэтоваться с названиями в Action creators */
import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USER_COUNT = 'SET_TOTAL_USER_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

/*
Инициализационный объект для начального отображения (пока не сделан запрос на сервачеллу)
*/
let initialState =  {
    /*пример массива users
    0: {name: 'Ishatr21', id: 24257, uniqueUrlName: null, photos: {…}, status: null, …}
    1: {name: 'Mihals', id: 24256, uniqueUrlName: null, photos: {…}, status: 'string', …}*/
    users: [],
    pageSize: 5,    //по сколько чел выводить на 1 странице
    totalUserCount: 0, //сколько всего юзеров
    currentPage: 1,  //активная страничка
    isFetching: false,
    followingInProgress: []
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
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : [...state.followingInProgress.filter(id => id != action.userId)]
            };
        }
        default:
            return state;
    }
};
/*.......................................   Action creators ................................................*/
/*Если у тебя в объекте свойство называется так же как значнеие переменной - можно сокращать типо ({type: SET_CURRENT_PAGE, currentPage:currentPage}); можно записать ({type: SET_CURRENT_PAGE, currentPage});*/
export const followSuccess = (userId) => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUserCount = (totalUserCount) => ({type: SET_TOTAL_USER_COUNT, count: totalUserCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching});
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId});
/*.......................................   Action creators end ............................................*/

/*   Санки   */
export const getUsers = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));  /*когда пошёл запрос - мы запускаем прелоудер*/
        usersAPI.getUsers(currentPage, pageSize)
        .then(response => {
            dispatch(toggleIsFetching(false)); /*когда приходит ответ - отрубаем прелоудер*/
            dispatch(setUsers(response.items));
            dispatch(setTotalUserCount(response.totalCount));
        })
}};
export const follow = (userId) => {
    return (dispatch) => {
        dispatch.toggleFollowingProgress(true, userId);
        usersAPI.folow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(followSuccess(userId));
                }
                dispatch(toggleFollowingProgress(false, userId));
            });
    }
};
export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch.toggleFollowingProgress(true, userId);
        usersAPI.unFolow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(followSuccess(userId));
                }
                dispatch(toggleFollowingProgress(false, userId));
            });
    }
};


export default usersReducer;