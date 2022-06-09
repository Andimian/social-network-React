import Profile from "./Profile";
import React from "react";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profile-reduser";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {compose} from "redux";


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.router.params.userId ;
        if (!userId){
            userId=24213;
            // userId=2;
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    };

    render() {
        return (
                <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
        )
    }
};


/* когда наша функция возвращает объект -ставим круглые скобки */
let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth, //auth это как ты обозвал ключ для редьюсера в combineReducers
    status: state.profilePage.status
});


// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }
    return ComponentWithRouterProp;
}


export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter)(ProfileContainer);