import React, { Component } from 'react';
import './InputQuestion.css';
import { Button, FormGroup, FormControl, ControlLabel, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import NumericInput from 'react-numeric-input';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import Switch from '@material-ui/core/Switch';
import Close from '@material-ui/icons/Close';

class InputQuestion extends Component{
	constructor(props){
		super(props);
	}

	displayQuestionForm(question_type, input){
		let returnForm = []
		if (input=='input'){
			if (question_type == 'multiple_choice'){
			returnForm.push(<MultipleChoiceQuestionForm changeSelectedLecture={this.props.changeSelectedLecture} updateLecturesState={this.props.updateLecturesState} Auth={this.props.Auth} course_id={this.props.course_id}  lecture_id={this.props.lecture_id} closefunction={this.props.closefunction}/>)
			}
			else if (question_type === 'string_input'){
				returnForm.push(<StringInputQuestionForm closefunction={this.props.closefunction}/>)
			}
			else if (question_type === 'numeric_input'){
				returnForm.push(<NumericInputQuestionForm closefunction={this.props.closefunction}/>)
			}
		}
		else if (input == 'update'){
			if (question_type == 'multiple_choice'){
			returnForm.push(<MultipleChoiceUpdate toggleUpdateModal={this.props.toggleUpdateModal} changeSelectedLecture={this.props.changeSelectedLecture} updateLecturesState={this.props.updateLecturesState} index={this.props.index} quiz={this.props.quiz} Auth={this.props.Auth} course_id={this.props.course_id}  lecture_id={this.props.lecture_id} closefunction={this.props.closefunction}/>)
			}
			else if (question_type === 'string_input'){
				returnForm.push(<StringInputQuestionForm closefunction={this.props.closefunction}/>)
			}
			else if (question_type === 'numeric_input'){
				returnForm.push(<NumericInputQuestionForm closefunction={this.props.closefunction}/>)
			}
		}
		else{
			return null
		}
		return returnForm
	}
	render(){
		if (this.props.input == 'input'){
			return(
				<div className='InputQuestion'>
					<QuestionHeader handleChangeQuestionType={this.props.handleChangeQuestionType} question_type={this.props.question_type}/>
					{this.displayQuestionForm(this.props.question_type, this.props.input)}
				</div>
			)
		}
		else if (this.props.input == 'update'){
			return(
				<div className='InputQuestion'>
					<QuestionUpdateHeader question_type={this.props.question_type} closefunction={this.props.closefunction}/>
					{this.displayQuestionForm(this.props.question_type, this.props.input)}
				</div>
			)
		}
		
	}
}

class QuestionUpdateHeader extends Component{
	constructor(props){
		super(props);
	}
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
				<IconButton onClick={this.props.closefunction}>
					<Close/>
				</IconButton>
				{this.createHeader(this.props.question_type)}
			</div>
		)
	}
}
class MultipleChoiceUpdate extends Component{
	constructor(props){
		super(props);
		this.state={
			question:this.props.quiz.question,
			correct_answer:this.props.quiz.correct_answer,
			answers:this.props.quiz.answers,
			main_switched:true,
			number_of_answers: this.props.quiz.answers.length,
			time_duration: this.props.quiz.time_duration,
			point: this.props.quiz.point,
			error:false,
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.changeMainSwitched = this.changeMainSwitched.bind(this);
		this.addAnswers = this.addAnswers.bind(this);
		this.addUserAnswer = this.addUserAnswer.bind(this);
		this.changePoint = this.changePoint.bind(this);
	}
	changeMainSwitched(){
		this.setState({
			main_switched: true,
		})
	}
	handleSubmit(event){
		event.preventDefault();
		this.props.toggleUpdateModal();
		this.props.Auth.updateQuiz(this.props.index, this.props.course_id, this.props.lecture_id, this.state.question, this.state.answers, this.state.correct_answer, this.state.time_duration, this.state.point)
		.then( res =>{
			this.props.closefunction()
			this.props.updateLecturesState(res.data.lectures)
			for (let i in res.data.lectures){
  				if (res.data.lectures[i].id == this.props.lecture_id){
  					this.props.changeSelectedLecture(res.data.lectures[i])
  				}
  			}
		})
		.catch(err =>{
        	console.log(err.message)
      	})
	}
	handleChange = event => {
	    this.setState({
	      [event.target.id]: event.target.value
	    });
  	}
  	makeAnswers(num){
  		let result= []
  		for (let i=0; i<num; i++){
  			if (i == this.state.correct_answer){
  				result.push(<MultipleChoiceAnswer switched={true} answer={this.state.answers[i]} addUserAnswer={this.addUserAnswer} option={i} changeMainSwitched={this.changeMainSwitched} main_switched={this.state.main_switched}/>)	
  			}
  			else{
  				result.push(<MultipleChoiceAnswer switched={false} answer={this.state.answers[i]} addUserAnswer={this.addUserAnswer} option={i} changeMainSwitched={this.changeMainSwitched} main_switched={this.state.main_switched}/>)
  			}
  		}
  		return result
  	}
  	addAnswers(){
  		this.setState(prevState => {
			return {
				number_of_answers: prevState.number_of_answers + 1
			};
		});
  	}
  	addUserAnswer(answer, correct, index){
  		if (this.state.answers.length == 0 || this.state.answers.length == index){
  			//this.state.answers.push({answer: answer, correct: correct})
  			this.state.answers.push(answer);
  		}
  		else{
  			this.state.answers[index] = answer
  			//this.state.answers[index].answer = answer
  			//this.state.answers[index].correct = correct
  		}
  		//console.log(this.state.answers)
  		if (correct){
  			this.setState({
  				correct_answer: index
  			})
  		}
  	}

  	async changePoint(value){
  		await this.setState({
  			point: value
  		})
  	}
	render(){
		return(
			<div className='form'>
			<form onSubmit={this.handleSubmit}>
				<FormGroup controlId='question' className='question'>
					<ControlLabel>Pertanyaan</ControlLabel>
			            <FormControl
			              type="text"
			              value={this.state.question}
			              onChange={this.handleChange}
			              placeholder= 'Tulis Pertanyaan disini'
			            />
			    </FormGroup>
			    <FormGroup controlId='answers'>
			    	<ControlLabel> Jawaban </ControlLabel>
			    	{this.makeAnswers(this.state.number_of_answers)}
			    	<Button onClick={this.addAnswers}> Tambahkan Jawaban </Button>
			    </FormGroup>

			    <div>
			    	<label> Setting </label>
			    	<div className='setting'>
			    		<FormGroup className='form-group'>
			    			<ControlLabel> Tambahkan Nilai Jawaban </ControlLabel>
			    			<NumericInput className='form-control' value={this.state.point} step={0.5} min={0} max={100} onChange={this.changePoint}/>
			    		</FormGroup>
			    		<FormGroup className='form-group'>
			    			<ControlLabel> Tambahkan Timer </ControlLabel>
			    			<NumericInput className='form-control'/>
			    		</FormGroup>
			    	</div>
			    </div>
			    <div className='i_buttons'>
	          		<Button
	          			className='i_button'
	          			style={{backgroundColor:'transparent'}}
	          			onClick={this.props.closefunction}>
			        	Batal
			        </Button>
			        <Button
				        type="submit"
				        className="i_button"
				    >
				    Edit
			        </Button>
			    </div>
	       	</form>
	       	</div>

		)
	}
}
class QuestionHeader extends Component{
	constructor(props){
		super(props);
		this.backButton = this.backButton.bind(this);
	}

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

	backButton(){
		this.props.handleChangeQuestionType('')
	}

	render(){
		return(
			<div className='header'> 
				<IconButton onClick={this.backButton} >
					<KeyboardArrowLeft/>
				</IconButton>
				{this.createHeader(this.props.question_type)}
			</div>

		)
	}
}

class StringInputQuestionForm extends Component{
	constructor(props){
		super(props);
		this.state={
			question:'',
			correct_answer:''
		}
	}

	handleSubmit(event){
		event.preventDefault();
		alert('new question added')
	}
	handleChange = event => {
	    this.setState({
	      [event.target.id]: event.target.value
	    });
  	}
	render(){
		return(
			<div className='form'>
			<form onSubmit={this.handleSubmit}>
				<FormGroup controlId='question' className='question'>
					<ControlLabel>Pertanyaan</ControlLabel>
			            <FormControl
			              type="text"
			              value={this.state.description}
			              onChange={this.handleChange}
			              placeholder= 'Tulis Pertanyaan disini'
			            />
			    </FormGroup>
			    <FormGroup>
			    	<ControlLabel> Jawaban </ControlLabel>
			    	<FormControl
			    		type='text'
			    		placeholder='Tulis jawaban disini'
			    	/>
			    </FormGroup>

			    <div>
			    	<label> Setting </label>
			    	<div className='setting'>
			    		<FormGroup className='form-group'>
			    			<ControlLabel> Tambahkan Nilai </ControlLabel>
			    			<NumericInput className='form-control' value={1} min={0} max={5}/>
			    		</FormGroup>
			    		<FormGroup className='form-group'>
			    			<ControlLabel> Tambahkan Timer </ControlLabel>
			    			<NumericInput className='form-control'/>
			    		</FormGroup>
			    	</div>
			    </div>
			    <div className='i_buttons'>
	          		<Button
	          			className='i_button'
	          			style={{backgroundColor:'transparent'}}
	          			onClick={this.props.closefunction}>
			        	Batal
			        </Button>
			        <Button
				        type="submit"
				        className="i_button"
				    >
				    Tambah
			        </Button>
			    </div>
	       	</form>
	       	</div>

		)
	}
}

class NumericInputQuestionForm extends Component{
	constructor(props){
		super(props);
		this.state={
			question:'',
			correct_answer:''
		}
	}

	handleSubmit(event){
		event.preventDefault();
		alert('new question added')
	}
	handleChange = event => {
	    this.setState({
	      [event.target.id]: event.target.value
	    });
  	}
	render(){
		return(
			<div className='form'>
			<form onSubmit={this.handleSubmit}>
				<FormGroup controlId='question' className='question'>
					<ControlLabel>Pertanyaan</ControlLabel>
			            <FormControl
			              type="text"
			              value={this.state.description}
			              onChange={this.handleChange}
			              placeholder= 'Tulis Pertanyaan disini'
			            />
			    </FormGroup>
			    <FormGroup>
			    	<ControlLabel> Jawaban </ControlLabel>
			    	<FormControl
			    		type='text'
			    		placeholder='Tulis jawaban disini'
			    	/>
			    </FormGroup>

			    <div>
			    	<label> Setting </label>
			    	<div className='setting'>
			    		<FormGroup className='form-group'>
			    			<ControlLabel> Tambahkan Angka Signifikan </ControlLabel>
			    			<NumericInput className='form-control' value={1} min={1} max={10}/>
			    		</FormGroup>
			    		<FormGroup className='form-group'>
			    			<ControlLabel> Tambahkan Nilai </ControlLabel>
			    			<NumericInput className='form-control' value={1} min={0} max={5}/>
			    		</FormGroup>
			    		<FormGroup className='form-group'>
			    			<ControlLabel> Tambahkan Timer </ControlLabel>
			    			<NumericInput className='form-control'/>
			    		</FormGroup>
			    	</div>
			    </div>
			    <div className='i_buttons'>
	          		<Button
	          			className='i_button'
	          			style={{backgroundColor:'transparent'}}
	          			onClick={this.props.closefunction}>
			        	Batal
			        </Button>
			        <Button
				        type="submit"
				        className="i_button"
				    >
				    Tambah
			        </Button>
			    </div>
	       	</form>
	       	</div>

		)
	}
}

class MultipleChoiceQuestionForm extends Component{
	constructor(props){
		super(props);
		console.log(props)
		this.state={
			question:'',
			correct_answer:null,
			answers:[],
			main_switched:false,
			number_of_answers: 2,
			time_duration: 10,
			point: 1,
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.changeMainSwitched = this.changeMainSwitched.bind(this);
		this.addAnswers = this.addAnswers.bind(this);
		this.addUserAnswer = this.addUserAnswer.bind(this);
		this.changePoint = this.changePoint.bind(this);
	}
	changeMainSwitched(){
		this.setState({
			main_switched: true,
		})
	}
	handleSubmit(event){
		event.preventDefault();
		this.props.Auth.addQuiz(this.props.course_id, this.props.lecture_id, this.state.question, this.state.answers, this.state.correct_answer, this.state.time_duration, this.state.point)
		.then( res =>{
			this.props.closefunction()
			this.props.updateLecturesState(res.data.lectures)
			for (let i in res.data.lectures){
  				if (res.data.lectures[i].id == this.props.lecture_id){
  					this.props.changeSelectedLecture(res.data.lectures[i])
  				}
  			}
		})
		.catch(err =>{
        	console.log(err.message)
      	})
	}
	handleChange = event => {
	    this.setState({
	      [event.target.id]: event.target.value
	    });
  	}
  	makeAnswers(num){
  		let result= []
  		for (let i=0; i<num; i++){
  			result.push(<MultipleChoiceAnswer switched={false} answer={''} addUserAnswer={this.addUserAnswer} option={i} changeMainSwitched={this.changeMainSwitched} main_switched={this.state.main_switched}/>)
  		}
  		return result
  	}
  	addAnswers(){
  		this.setState(prevState => {
			return {
				number_of_answers: prevState.number_of_answers + 1
			};
		});
  	}
  	addUserAnswer(answer, correct, index){
  		if (this.state.answers.length == 0 || this.state.answers.length == index){
  			//this.state.answers.push({answer: answer, correct: correct})
  			this.state.answers.push(answer);
  		}
  		else{
  			this.state.answers[index] = answer
  			//this.state.answers[index].answer = answer
  			//this.state.answers[index].correct = correct
  		}
  		//console.log(this.state.answers)
  		if (correct){
  			this.setState({
  				correct_answer: index
  			})
  		}
  	}

  	async changePoint(value){
  		await this.setState({
  			point: value
  		})
  	}
  	
	render(){
		return(
			<div className='form'>
			<form onSubmit={this.handleSubmit}>
				<FormGroup controlId='question' className='question'>
					<ControlLabel>Pertanyaan</ControlLabel>
			            <FormControl
			              type="text"
			              value={this.state.question}
			              onChange={this.handleChange}
			              placeholder= 'Tulis Pertanyaan disini'
			            />
			    </FormGroup>
			    <FormGroup controlId='answers'>
			    	<ControlLabel> Jawaban </ControlLabel>
			    	{this.makeAnswers(this.state.number_of_answers)}
			    	<Button onClick={this.addAnswers}> Tambahkan Jawaban </Button>
			    </FormGroup>

			    <div>
			    	<label> Setting </label>
			    	<div className='setting'>
			    		<FormGroup className='form-group'>
			    			<ControlLabel> Tambahkan Nilai Jawaban </ControlLabel>
			    			<NumericInput className='form-control' value={this.state.point} step={0.5} min={0} max={100} onChange={this.changePoint}/>
			    		</FormGroup>
			    	
			    		<FormGroup className='form-group'>
			    			<ControlLabel> Tambahkan Timer </ControlLabel>
			    			<NumericInput className='form-control'/>
			    		</FormGroup>
			    	</div>
			    </div>
			    <div className='i_buttons'>
	          		<Button
	          			className='i_button'
	          			style={{backgroundColor:'transparent'}}
	          			onClick={this.props.closefunction}>
			        	Batal
			        </Button>
			        <Button
				        type="submit"
				        className="i_button"
				    >
				    Tambah
			        </Button>
			    </div>
	       	</form>
	       	</div>

		)
	}
}


class MultipleChoiceAnswer extends Component{
	constructor(props){
		super(props)
		this.state={
			switched: this.props.switched,
			answer:this.props.answer,
		}
		this.handleChange = this.handleChange.bind(this);
		this.toggleSwitch = this.toggleSwitch.bind(this);
	}
	async toggleSwitch(){
		//if (!this.props.main_switched){
		await this.setState(prevState => {
			return {
				switched: !prevState.switched
			};
		}, this.props.changeMainSwitched());
		this.props.addUserAnswer(this.state.answer, this.state.switched, this.props.option)
	//}
	};
	async handleChange(event) {
	    await this.setState({
	      answer: event.target.value
	    });
	    this.props.addUserAnswer(this.state.answer, this.state.switched, this.props.option)
	    
  	}
	render(){
		return(
			<div className='multiple-choice' id='answer'>
			    <div style={{display:'flex', flexDirection:'row'}}> 
					<p> {String.fromCharCode(this.props.option+65)}. </p>
					<FormControl
					 	type='text'
					    placeholder='Tulis jawaban disini'
					    style={{border:'none', boxShadow:'none'}}
					    onChange={this.handleChange}
					    value={this.state.answer}
					/>
				</div>
				<div style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
				   	<Switch onChange={this.toggleSwitch} checked={this.state.switched}/>
				  	<label> Jawaban Benar </label>
				</div>
			</div>
		)
	}
}

export default InputQuestion;