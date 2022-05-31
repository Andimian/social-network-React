import React from "react";
import {connect} from "react-redux";
import {
    follow, getUsersThunkCreator,
    setCurrentPage,
    setTotalUserCount,
    setUsers, toggleFollowingProgress,
    toggleIsFetching,
    unFollow
} from "../../redux/users-reduser";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {getUsers} from "../../api/api";


class UsersContainer extends React.Component {
    componentDidMount() {

        this.props.getUsersThunkCreator();
        // this.props.toggleIsFetching(true);  /*когда пошёл запрос - мы запускаем прелоудер*/
        // getUsers(this.props.currentPage, this.props.pageSize)
        //     .then(response => {
        //         this.props.toggleIsFetching(false); /*когда приходит ответ - отрубаем прелоудер*/
        //         this.props.setUsers(response.items);
        //         this.props.setTotalUserCount(response.totalCount);
        //     })
    }

    /*пишем метод как стрелоч функцию, чтобы сохранить контекст вызова*/
    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        // Эти запрос мы должны слать авторизованно, ЛИБО ОН ПОЙДЁТ КАК ОТ АНОНИМА и сервачелла вернёт нам что мы ни на кого не подписаны (к примеру) => надо добавить объект настройки
        getUsers(pageNumber, this.props.pageSize)
            .then(response => {
                this.props.toggleIsFetching(false);
                // this.props.setUsers(response.data.items);
                this.props.setUsers(response.items);
            })

    };

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                totalUserCount={this.props.totalUserCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                users={this.props.users}
                onPageChanged={this.onPageChanged}
                unFollow={this.props.unFollow}
                follow={this.props.follow}
                toggleFollowingProgress={this.props.toggleFollowingProgress}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}


// Необходимые объекты
let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUserCount: state.usersPage.totalUserCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
};


export default connect(mapStateToProps, {
        follow,/*коннект короче атвоматически создаёт колбек функцию, в которой он вызывает action creator follow, action creator возвращает action и потом этот экшен диспатчится*/
        unFollow,
        setUsers,
        setCurrentPage,
        setTotalUserCount,
        toggleIsFetching,
        toggleFollowingProgress,
        getUsersThunkCreator
    }
)(UsersContainer);