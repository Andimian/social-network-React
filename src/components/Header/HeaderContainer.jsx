import * as React from "react";
import Header from "./Header";
import * as axios from "axios";
import {setAuthUserData} from "../../redux/ayuth-reducer";
import {connect} from "react-redux";

/*Этот конт компонент нужен нам, чтобы делать запрос, т.к. презантационный компонент не должен связываться с внешним миром. Но чтобы получить доступ к store нам нужен коннект и для этого мы эту компоненту еще им обернём в конце файла*/

class HeaderContainer extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true   //для кросдоменныйх запросов брузер автоматически не отправляет куку - поэтому надо вот такую хрень писать
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {email, id, login} = response.data.data;
                    this.props.setAuthUserData(id, email, login);
                }
            });
    }

    render() {

        return <Header {...this.props} />
    }

};

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);
