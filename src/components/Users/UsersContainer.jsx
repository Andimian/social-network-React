import React from "react";
import {connect} from "react-redux";
import {
    followSuccess, requestUsers,
    setCurrentPage,
    setTotalUserCount,
    toggleFollowingProgress,
    unfollowSuccess
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize, getPortionSize,
    getTotalUserCount, getUsers,
} from "../../redux/users-selectors";


class UsersContainer extends React.Component {
    componentDidMount() {
        let {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    /*пишем метод как стрелоч функцию, чтобы сохранить контекст вызова*/
    onPageChanged = (pageNumber) => {
        let {getUsers, pageSize} = this.props;
        getUsers(pageNumber, pageSize);
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
                portionSize={this.props.portionSize}
            />
        </>
    }
}

// Необходимые объекты
let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUserCount: getTotalUserCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        portionSize: getPortionSize(state),
    }
};

export default connect(mapStateToProps, {
        follow: followSuccess,/*коннект короче атвоматически создаёт колбек функцию, в которой он вызывает action creator follow, action creator возвращает action и потом этот экшен диспатчится*/
        unFollow: unfollowSuccess,
        setCurrentPage,
        setTotalUserCount,
        toggleFollowingProgress,
        // getUsers: requestUsers
        getUsers: requestUsers
    }
)(UsersContainer);