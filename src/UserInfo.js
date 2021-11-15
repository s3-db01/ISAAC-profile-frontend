import React, { Component } from 'react';

class UserInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            id: "",
            preftemp: ""
        };
        this.getUserPrefTemp()
        this.props.keycloak.loadUserInfo().then(userInfo => {
            this.setState({name: userInfo.name, email: userInfo.email, id: userInfo.sub, preftemp: localStorage.getItem('preftemp')})
            localStorage.setItem("userId", userInfo.sub)
        });
    }

    handleSubmit(e) {
        fetch('http://localhost:3001/' + localStorage.getItem('userId') + '/favorites/temp/' + this.state.preftemp, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                localStorage.setItem("preftemp", response.data.preftemp);
            } else {
                console.log('Somthing happened wrong');
            }
        }).catch(err => err);

        this.getUserPrefTemp()
    }


    getUserPrefTemp(){
        fetch('http://localhost:3001/'+localStorage.getItem('userId') +'/favorites/temp', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                response.json().then(
                    data =>
                        localStorage.setItem("preftemp", data.data[0].preftemp )
                )
                console.log(localStorage.getItem('preftemp'));
            } else {
                console.log('Somthing happened wrong');
            }
        }).catch(err => err);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className="UserInfo">
                <p>ID: {this.state.id}</p>
                <p>Welcome {this.state.name}</p>
                <p>Settings:</p>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label htmlFor="email">Email</label><br/>
                    <input type="text" id="email" name="email" value={this.state.email}/><br/>
                    <label htmlFor="preftemp">Preferd Temperature</label><br/>
                    <input type="text" id="preftemp" name="preftemp" value={this.state.preftemp} onChange={this.handleInputChange.bind(this)}/><br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}
export default UserInfo;