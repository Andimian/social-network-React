import Profile from "./Profile";
import React from "react";
import * as axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reduser";

class ProfileContainer extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                /*когда приходит ответ - отрубаем прелоудер*/
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

export default connect(mapStateToProps, {setUserProfile}
)(ProfileContainer);