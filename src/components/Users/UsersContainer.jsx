import React from "react";
import {connect} from "react-redux";
import {
    followSuccess, getUsers, getUsersThunk,
    setCurrentPage,
    setTotalUserCount,
    toggleFollowingProgress,
    unfollowSuccess
} from "../../redux/users-reduser";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";


class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    /*пишем метод как стрелоч функцию, чтобы сохранить контекст вызова*/
    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
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
        follow: followSuccess,/*коннект короче атвоматически создаёт колбек функцию, в которой он вызывает action creator follow, action creator возвращает action и потом этот экшен диспатчится*/
        unFollow: unfollowSuccess,
        setCurrentPage,
        setTotalUserCount,
        toggleFollowingProgress,
        getUsers: getUsersThunk
    }
)(UsersContainer);