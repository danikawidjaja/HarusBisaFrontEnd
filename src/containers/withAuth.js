import React, {Component} from 'react';
import AuthService from './AuthService';

export default function withAuth(AuthComponent){
	//console.log(AuthComponent);
	//const Auth = new AuthService('http://ec2-54-174-154-58.compute-1.amazonaws.com:8080/');
	return class AuthWrapped extends Component{
		constructor(props){
			super(props);
			this.state = {
				user: null
			}
			this.Auth = this.props.Auth;
		}
		componentWillMount(){
			if (!this.Auth.loggedIn()){
				alert('You are not logged in!')
				this.props.history.replace('/login')
			}
			else{
				try{
					this.Auth.getProfile().then(res => this.setState({
						user: res
					}))

				}
				catch(err){
					alert(err.message)
					this.Auth.logout()
					this.props.history.replace('/login')
				}
			}
		}

		render(){
			if(this.state.user){
				return(
					<AuthComponent history={this.props.history} user={this.state.user} Auth={this.props.Auth}/>
				) 
			}
			else{
				return null
			}
		}
	}
}