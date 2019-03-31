import React, {Component} from 'react';
import AuthService from './AuthService';

export default function withAuth(AuthComponent){
	console.log("im at withAuth");
	//const Auth = new AuthService('http://ec2-54-174-154-58.compute-1.amazonaws.com:8080/');
	return class AuthWrapped extends Component{
		constructor(props){
			super(props);
			this.state = {
				data: null
			}
			this.Auth = this.props.Auth;
		}
		componentDidMount(){
			if (!this.Auth.loggedIn()){
				alert('You are not logged in!')
				this.props.history.replace('/login')
			}
			else{
				try{
					this.Auth.getData().then(res => this.setState({
							data: res
					}))
					console.log("success")
				}
				catch(err){
					alert(err.message)
					this.Auth.logout()
					this.props.history.replace('/login')
				}
			}
		}

		render(){ 
			if(this.state.data){
				return <AuthComponent history={this.props.history} data={this.state.data} Auth={this.props.Auth} props={this.props}/>	
			}
			else{
				return null
			}
		}
	}
}