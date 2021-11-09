import React, { Component } from 'react';

class UserInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            id: ""
        };
        this.props.keycloak.loadUserInfo().then(userInfo => {
            this.setState({name: userInfo.name, email: userInfo.email, id: userInfo.sub})
        });
    }

    handleSubmit(event){
        fetch('restapi/'+this.state.id+'/'+ event.target.preftemp.value, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                console.log(response);
                return response;
            } else {
                console.log('Somthing happened wrong');
            }
        }).catch(err => err);
    }

    render() {
        return (
            <div className="UserInfo">
                <p>ID: {this.state.id}</p>
                <p>Welcome {this.state.name}</p>
                <p>Settings:</p>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email</label><br/>
                    <input type="text" id="email" name="email" value={this.state.email}/><br/>
                    <label htmlFor="preftemp">Preferd Temperature</label><br/>
                    <input type="text" id="preftemp" name="preftemp" /><br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}
export default UserInfo;