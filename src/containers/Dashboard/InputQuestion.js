import React, { Component } from 'react';
import './InputQuestion.css';
import { Button, FormGroup, FormControl, ControlLabel, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import NumericInput from 'react-numeric-input';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import Switch from '@material-ui/core/Switch';

class InputQuestion extends Component{
	constructor(props){
		super(props);
	}

	displayQuestionForm(question_type){
		let returnForm = []
		if (question_type == 'multiple_choice'){
			returnForm.push(<MultipleChoiceQuestionForm closefunction={this.props.closefunction}/>)
		}
		else if (question_type === 'string_input'){
			returnForm.push(<StringInputQuestionForm closefunction={this.props.closefunction}/>)
		}
		else if (question_type === 'numeric_input'){
			returnForm.push(<NumericInputQuestionForm closefunction={this.props.closefunction}/>)
		}
		return returnForm
	}
	render(){
		return(
			<div className='InputQuestion'>
				<QuestionHeader handleChangeQuestionType={this.props.handleChangeQuestionType} question_type={this.props.question_type}/>
				{this.displayQuestionForm(this.props.question_type)}
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

	handleSubmit(){
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

	handleSubmit(){
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
		this.state={
			question:'',
			correct_answer:'',
			answers:[],
			main_switched:false,
			number_of_answers: 2,
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.changeMainSwitched = this.changeMainSwitched.bind(this);
		this.addAnswers = this.addAnswers.bind(this);
	}
	changeMainSwitched(){
		this.setState({
			main_switched: true,
		})
	}
	handleSubmit(event){
		event.preventDefault();
		console.log(this.state)
		alert(this.state.answers)
	}
	handleChange = event => {
	    this.setState({
	      [event.target.id]: event.target.value
	    });
  	}
  	makeAnswers(num){
  		let result= []
  		for (let i=0; i<num; i++){
  			result.push(<MultipleChoiceAnswer option={i} changeMainSwitched={this.changeMainSwitched} main_switched={this.state.main_switched}/>)
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
			    <FormGroup controlId='answers'>
			    	<ControlLabel> Jawaban </ControlLabel>
			    	{this.makeAnswers(this.state.number_of_answers)}
			    	<Button onClick={this.addAnswers}> Tambahkan Jawaban </Button>
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


class MultipleChoiceAnswer extends Component{
	constructor(props){
		super(props)
		this.state={
			switched: false,
			answer:'',
		}
	}
	toggleSwitch = () => {
		//if (!this.props.main_switched){
		this.setState(prevState => {
			return {
				switched: !prevState.switched
			};
		}, this.props.changeMainSwitched());
	//}
	};
	handleChange = event => {
		console.log(event.target.value)
	    this.setState({
	      [event.target.id]: event.target.value
	    });
  	}
	render(){
		return(
			//<FormGroup controlId='answers'>
			<div className='multiple-choice' id='answer'>
			    <div style={{display:'flex', flexDirection:'row'}}> 
					<p> {String.fromCharCode(this.props.option+65)}. </p>
					<FormControl
					 	type='text'
					    placeholder='Tulis jawaban disini'
					    style={{border:'none', boxShadow:'none'}}
					    onChange={this.handleChange}
					/>
				</div>
				<div style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
				   	<Switch onChange={this.toggleSwitch} checked={this.state.switched}/>
				  	<label> Jawaban Benar </label>
				</div>
			</div>
			//</FormGroup>
		)
	}
}

export default InputQuestion;