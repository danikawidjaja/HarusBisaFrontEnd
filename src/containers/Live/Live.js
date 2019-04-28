import React, { Component } from 'react';
import './Live.css';
import {Quiz} from '../Lecture/Lecture';
import '../Lecture/Lecture.css';

class Live extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className='Live'>
				
				<Quiz quiz={this.props.quiz} quiz_number={1} live={true} show_my_answer={false} show_correct_answer={false}/>
			</div>
		)
	}
}

export default Live;