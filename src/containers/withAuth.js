import React, {Component} from 'react';
import AuthService from './AuthService';

export default function withAuth(AuthComponent){
	//const Auth = new AuthService('http://ec2-54-174-154-58.compute-1.amazonaws.com:8080/');
	return class AuthWrapped extends Component{
		constructor(props){
			super(props);
			this.state = {
				data: null
			}
			this.Auth = this.props.Auth;
		}
		async componentDidMount(){
			if (!this.Auth.loggedIn()){
				alert('You are not logged in!')
				this.props.history.replace('/login')
			}
			else{
				this.Auth.getData()
				.then(res => {
					this.setState({
						data: res.data
					})
				})
				.catch(err =>{
					console.log(err.message)
					this.Auth.logout()
					this.props.history.replace('/login')
				})
			}
		}

		render(){ 
			if(this.state.data){
				if (this.state.data.role == 'professor'){
					return <AuthComponent history={this.props.history} data={this.state.data} Auth={this.props.Auth} props={this.props}/>	
				}
			}
			else{
				return null
			}
		}
	}
}