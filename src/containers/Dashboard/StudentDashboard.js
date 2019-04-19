import React, { Component } from 'react';
import {DashboardNavigation} from './Dashboard';
import LoadingPage from './LoadingPage';
import './Dashboard.css';
import './StudentDashboard.css';


class StudentDashboard extends Component{
	constructor(props){
		super(props);
		this.state={
			lectures:[],
			courses:[],
			profile:{
				first_name: "",
				last_name: "",
				role: "",
				email: "" 
			},
			selected_course:null,
			selected_lecture:null,
			isLoading: true,
			changingSelectedCourse: false,
		};
		this.changeSelectedCourse = this.changeSelectedCourse.bind(this);
	}
	changeSelectedCourse(new_selected_course){
		this.setState({
			selected_course: new_selected_course,
			isLoading: true,
			changingSelectedCourse: true
		})
	}
	async componentDidUpdate(prevState){
		if (prevState.selected_course !== this.state.selected_course){
			if (this.state.changingSelectedCourse){
				this.props.Auth.getLectures(this.state.selected_course._id)
	      		.then(res =>{
	      			this.setState({
	      				lectures: res.data.lectures,
	      				selected_lecture: res.data.lectures[0],
	      				isLoading: false,
	      				changingSelectedCourse: false,
	      			})
	      		})
	      		.catch(err => {
	      			console.log(err.message)
	      		})
			}	
		}
	}
	async componentDidMount(){
  		this.props.isNavVisible(false);
    	window.scrollTo(0, 0);

		await this.props.Auth.getData()
  		.then(async res =>{
  			console.log(res)
      		await this.setState({
      			courses: res.data.courses,
      			selected_course: res.data.courses[0],
      			profile:{
      				first_name : res.data.first_name,
      				last_name : res.data.last_name,
      				email: res.data.email,
      				role: res.data.role,
      				school: res.data.school
      			},
      		}, () =>
      		this.props.Auth.getLectures(this.state.selected_course._id)
	      	.then(res =>{
	      		this.setState({
	      			lectures: res.data.lectures,
	      			selected_lecture: res.data.lectures[0],
	      			isLoading: false,
	      		})
	      	})	
	      )
      	})
      	.catch(err =>{
        	console.log(err.message)
      	}) 	
  	}
	render(){
		if (this.props.Auth.loggedIn()){
			if (!this.state.isLoading){
				return(
		    		<div className='Dashboard'>
		    			<DashboardNavigation selected_course={this.state.selected_course} courses={this.state.courses} profile={this.state.profile} Auth={this.props.Auth} userHasAuthenticated={this.props.userHasAuthenticated} history={this.props.history} changeSelectedCourse={this.changeSelectedCourse}/>
		    			<div className='StudentDashboard'>
		    				<h1> {this.state.selected_course.course_name} </h1>
		    				<p> Sesi yang telah berlangsung </p>
		    			</div>
						
		    		</div>
				)
			}
			else{
				return(
				<div>
					<LoadingPage/>
				</div>
				)
			}
		}
		else{
			this.props.history.push('/login');
			return(null)
		}
	}
}

export default StudentDashboard;