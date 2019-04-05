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
		console.log(this.props)
		this.props.handleChangeQuestionType('')
		console.log('i went back!')
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
			switched:false,
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
  	toggleSwitch = () => {
    this.setState(prevState => {
      return {
        switched: !prevState.switched
      };
    });
  };
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
			    	<div className='multiple-choice'>
			    		<div style={{display:'flex', flexDirection:'row'}}> 
				    		<p> A. </p>
					    	<FormControl
					    		type='text'
					    		placeholder='Tulis jawaban disini'
					    		style={{border:'none', boxShadow:'none'}}
					    	/>
					    </div>
					    <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
					    	<Switch onChange={this.toggleSwitch} checked={this.state.switched}/>
					    	<label> Jawaban Benar </label>
					    </div>
				    </div>
				    <div className='multiple-choice'>
			    		<div style={{display:'flex', flexDirection:'row'}}> 
				    		<p> B. </p>
					    	<FormControl
					    		type='text'
					    		placeholder='Tulis jawaban disini'
					    		style={{border:'none', boxShadow:'none'}}
					    	/>
					    </div>
					    <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
					    	<Switch onChange={this.toggleSwitch} checked={this.state.switched}/>
					    	<label> Jawaban Benar </label>
					    </div>
				    </div>
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
export default InputQuestion;