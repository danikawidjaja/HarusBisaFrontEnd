import React, {Component} from 'react';
import AuthService from './AuthService';

export default function withAuth(AuthComponent){
	const Auth = new AuthService('http://ec2-54-174-154-58.compute-1.amazonaws.com:8080/');
	return class AuthWrapped extends Component{
		constructor(){
			super();
			this.state = {
				user: null
			}
		}

		componentWillMount(){
			if (!Auth.loggedIn()){
				alert('You are not logged in!')
				this.props.history.replace('/login')
			}
			else{
				try{
					const profile = Auth.getProfile()
					this.setState({
						user: profile
					})
				}
				catch(err){
					Auth.logout()
					this.props.history.replace('/login')
				}
			}
		}

		render(){
			if(this.state.user){
				return(
					<AuthComponent history={this.props.history} user={this.state.user} />
				) 
			}
			else{
				return null
			}
		}
	}
}