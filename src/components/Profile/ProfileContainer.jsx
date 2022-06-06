import Profile from "./Profile";
import React from "react";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/profile-reduser";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import Dialogs from "../Dialogs/Dialogs";


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.router.params.userId ;
        if (!userId){
            userId=2;
        }
        this.props.getUserProfile(userId);
    };

    render() {
        return (
                <Profile {...this.props} profile={this.props.profile}/>
        )
    }
};


/* когда наша функция возвращает объект -ставим круглые скобки */
let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth //auth это как ты обозвал ключ для редьюсера в combineReducers
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

// export default connect(mapStateToProps, {getUserProfile})(withRouter(ProfileContainer));

export default compose(
    connect(mapStateToProps, {getUserProfile}),
    withRouter)(ProfileContainer);