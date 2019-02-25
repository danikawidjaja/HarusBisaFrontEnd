import React, { Component } from 'react';
import './InputQuestion.css';
import { Button, FormGroup, FormControl, ControlLabel, ToggleButton, ToggleButtonGroup } from "react-bootstrap";


class InputQuestion extends Component{
	constructor(props){
		super(props);
	}


	render(){
		return(
			<div className='InputQuestion'>
				<QuestionHeader question_type={this.props.question_type}/>
			</div>
		)
	}
}

class QuestionHeader extends Component{

	createHeader(question_type){
		let returnComponent = []
		if (question_type == 'multiple_choice'){
			returnComponent.push(<h1> Pilihan Ganda </h1>)
		}
		else if (question_type == 'string_input'){
			returnComponent.push(<h1> Isilah </h1> )
		}
		else if (question_type == 'numeric_input'){
			returnComponent.push(<h1> Jawaban Angka </h1> )
		}
		return(returnComponent)
	}

	render(){
		return(
			<div className='header'> 
				{this.createHeader(this.props.question_type)}
			</div>

		)
	}
}

class MultipleChoiceQuestionForm extends Component{
	constructor(props){
		super(props);
		this.state={
			question:'',
			options:[]
		}
	}
}

export default InputQuestion;