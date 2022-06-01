import Profile from "./Profile";
import React from "react";
import * as axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reduser";
import {useLocation, useNavigate, useParams} from "react-router-dom";


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.router.params.userId ;
        if (!userId){
            userId=2;
        }
        usersAPI.getProfile(userId).then(response => {
            this.props.setUserProfile(response.data);
        })
    };

    render() {
        return (
                <Profile {...this.props} profile={this.props.profile}/>
        )
    }
};


/* когда наша функция возвращает объект -ставим круглые скобки */
let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
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

export default connect(mapStateToProps, {setUserProfile})(withRouter(ProfileContainer));
