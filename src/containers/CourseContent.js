import React, { Component } from 'react';
import './Page.css';


class CourseContent extends Component{
	constructor(props){
		super(props);
		this.state={
			course_code: 'BME352',
			join_code:'9231',
			questions:'',
			lectures:'',
		}

		this.Auth= this.props.Auth;
	}

	render(){
		return(
    		<div className="App">
		        <div className="App-header">
		            <h2 className="App-header-text">{this.state.course_code}</h2>
		            <h5> Join Code: {this.state.join_code} </h5>
		        </div>

		        <div className="course-content-content">
		        	<div className='course-content-lecture-side'>
		        		<p> lecture side </p>
		        	</div>
		        	<div className='course-content-question-side'>
		        		<p> question side </p>
		        	</div>
		        </div>
		    </div>
		)
	}
}

class LectureCard extends Component{
	constructor(props){
		super(props);
		this.state={
			date: '',
		}
	}
}

export default CourseContent