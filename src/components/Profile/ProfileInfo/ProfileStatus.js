import React from "react";


class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    };

    activateEditMode = () => {
        this.setState( {
            editMode: true
        });
    }
    deActivateEditMode = () => {
        this.setState( {
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.status != this.props.status) {
            this.setState({status: this.props.status});
        }

    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        });
    }

    render() {
        return (
            <div>

                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={ this.activateEditMode }>{this.props.status || "Установите статус"}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input onBlur={ this.deActivateEditMode } autoFocus={true} onChange={this.onStatusChange}  value={this.state.status}/>

                </div>
                }
            </div>
        )
    }
};

export default ProfileStatus;
