import React, { Component } from 'react';
import './Dashboard.css';
import { Button, FormGroup, FormControl, ControlLabel, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import PlayArrow from '@material-ui/icons/PlayArrow';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import SettingsOutlined from '@material-ui/icons/SettingsOutlined';
import NotificationsOutlined from '@material-ui/icons/NotificationsOutlined';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { OverrideMaterialUICss } from "override-material-ui-css";
import Fab from '@material-ui/core/Fab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Collapse from '@material-ui/core/Collapse';
import Popup from 'reactjs-popup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calIcon from './cal.png';
import InputQuestion from './InputQuestion';
import ProfileAvatar from './ProfileAvatar';




class Dashboard extends Component{
	constructor(props){
		super(props);
		this.state={
			lecture_dates:['2/3', '2/7', '2/10', '2/11', '2/12'],
			class_name:'Biologi Molekuler Kelas A',
			selected_date:'',
		};
		this.changeSelectedDate= this.changeSelectedDate.bind(this);
		this.getSelectedDate = this.getSelectedDate.bind(this);
	}

	changeSelectedDate(date){
		this.setState={
			selected_date: date
		}
	}

	getSelectedDate(){
		return this.state.selected_date;
	}
	async componentWillMount(){
    	this.props.isNavVisible(false);
    	window.scrollTo(0, 0);
    	this.changeSelectedDate(this.state.lecture_dates[0]);
  	}

  	async componentDidMount(){
  	}
	render(){
		return(
    		<div className='Dashboard'>
    			<div className='left'>
    				<DashboardLeft lectureDates={this.state.lecture_dates} changeSelectedDate={this.changeSelectedDate}/>
    			</div>
    			<div className='right'>
    				<DashboardRight class_name={this.state.class_name} selectedDate={this.state.selected_date} getSelectedDate={this.getSelectedDate}/>
    			</div>
    		</div>
		)
	}
}

class DashboardLeft extends Component{
	constructor(props){
		super(props);
		this.state={
			selected_date:this.props.lectureDates[0],
			lecture_dates: this.props.lectureDates,
		}
		this.handleChangeDate = this.handleChangeDate.bind(this);
	}
	handleChangeDate(value, event) {
	    this.setState({
	      selected_date: value
	    });
	    this.props.changeSelectedDate(value);
  	}

  	makeToggleButtons(lecture_dates){
  		let toggleButtons = []
  		if (lecture_dates.length == 0){
  			toggleButtons.push(<OverrideMaterialUICss><Fab style={{backgroundColor:'#ffe01c'}}> <AddIcon/> </Fab> </OverrideMaterialUICss>)
  		}
  		else{
	  		for (let i=0; i<lecture_dates.length; i++){
	  			if (i==0){
	  				toggleButtons.push(<ToggleButton className='button' value={lecture_dates[i]} defaultChecked> Kelas {lecture_dates[i]} </ToggleButton>)
	  			}
	  			else{
	  				toggleButtons.push(<ToggleButton className='button' value={lecture_dates[i]}> Kelas {lecture_dates[i]} </ToggleButton>)
	  			}
	  		}
	  	}
  		return toggleButtons
  	}
	render(){
		return(
			<div>
				<ToggleButtonGroup className='buttons' name='lectureDates'type='radio' defaultValue={'2/3'} onChange={this.handleChangeDate}>
            		{this.makeToggleButtons(/*[]*/this.state.lecture_dates)}
          		</ToggleButtonGroup>
          		<Popup trigger={<Button className='addButton'> + Add Class </Button>} modal closeOnDocumentClick={false}>
  					{close => (
  						<div className='popup'>
	  						<div className= "popup-header">
	        					<h2> Tambah Kelas </h2>
		    				</div>
  							<AddLecture closefunction={close}/>
  						</div>
  					)}			
  				</Popup>
				
			</div>
		)
	}
}

class AddLecture extends Component{
	constructor(props){
		super(props);
		this.state = {
			class_date: new Date(),
			description:'',
		}
		this.handleDateChange = this.handleDateChange.bind(this);
	}
	handleChange = event => {
	    this.setState({
	      [event.target.id]: event.target.value
	    });
  	}

  	handleSubmit(event){
  		alert(this.state.class_date + ' course added')
  	}

  	handleDateChange(date){
  		this.setState({class_date: date});
  	}
	render(){
	    return(
	      	<div className="form">
	        	<form onSubmit={this.handleSubmit}>
	          		<FormGroup controlId="class_date" style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
			            <img src={calIcon} style={{height:'5vh', marginRight:'-5vw'}}/> <ControlLabel style={{marginTop:'1vh', verticalAlign:'middle'}}> Tanggal Kelas </ControlLabel>
			            <DatePicker 
			            	selected={this.state.class_date}
			            	onChange={this.handleDateChange}
			            	todayButton={'Today'}
			            	dateFormat='d MMMM yyyy'
			            	className='calendar'
			            />

	          		</FormGroup>

	          		<FormGroup controlId="description" >
	            		<ControlLabel>Deskripsi</ControlLabel>
			            <FormControl
			              type="text"
			              value={this.state.description}
			              onChange={this.handleChange}
			              placeholder= 'Eg. Anatomi (optional)'
			            />
	          		</FormGroup>

	          		<div className='buttons'>
	          			<Button
	          				className='button'
	          				style={{backgroundColor:'transparent'}}
	          				onClick={this.props.closefunction}>
			          		Batal
			          	</Button>
			          	<Button
				           type="submit"
				           className="button"
				        >
			            Tambah
			          	</Button>
			         </div>
	        	</form>
	      	</div>
	    );
  	}
}
class DashboardNavigation extends Component{
	render(){
		return(
			<div className='navigation'>
				<div>
					<Link to='/courses'>
						<IconButton>
							<KeyboardArrowLeft/>
						</IconButton>
					</Link>
					<Link to='/courses'> Mata Kuliah </Link>
				</div>
				<div style={{display:'flex'}}>
					<OverrideMaterialUICss><IconButton>
						<OverrideMaterialUICss> <PeopleOutline style={{color: 'black'}}/> </OverrideMaterialUICss>
					</IconButton> </OverrideMaterialUICss>
					<OverrideMaterialUICss><IconButton>
						<OverrideMaterialUICss> <SettingsOutlined style={{color: 'black'}}/> </OverrideMaterialUICss>
					</IconButton></OverrideMaterialUICss>
					<OverrideMaterialUICss><IconButton>
						<OverrideMaterialUICss> <NotificationsOutlined style={{color: 'black'}}/> </OverrideMaterialUICss>
					</IconButton></OverrideMaterialUICss>
					<ProfileAvatar name={'wilson'}/>
					{/*<div style={{borderRadius:'50%', background:'red', width:'2vw', height:'2vw', margin:'auto', textAlign:'center'}}>
						<h1 style={{margin:'auto'}}> W </h1>
					</div>*/}
				</div>
   			</div>
		)
	}

}
class DashboardRight extends Component{
	constructor(props){
		super(props);
		this.state={
			selected_date:''
		}
	}

	async componentWillMount(){
		//console.log(this.props.getSelectedDate())
		this.setState={
			selected_date: this.props.getSelectedDate(),
		}
	}

	async componentDidMount(){
		//console.log(this.props.getSelectedDate())
		this.setState={
			selected_date: this.props.getSelectedDate(),
		}
	}
	render(){
		return(
			<div>
				<DashboardNavigation/>
    			<div className='content'>
    				<OverrideMaterialUICss>
    				<Card className='live-card'>
    						<div className='card-content'>
    							<div style={{marginTop:'auto'}}>
    								<p> {this.props.class_name} </p>
    								<p> Kelas {this.state.selectedDate} 2/7: Anatomi </p>
    							</div>
    							<div style={{marginLeft:'2vw', display:'flex', flexDirection:'row'}}>
	    							<div className='interactive'>
	    								<OverrideMaterialUICss> 
	    									<Fab className='fab'>
	    										<OverrideMaterialUICss>
	    										<PlayArrow style={{color:'white'}}/>
	    										</OverrideMaterialUICss>
	    									</Fab> 
	    								</OverrideMaterialUICss>
	    								<p> Mulai Kelas </p>
	    							</div>
	    							<div className='interactive'>
	    								<Popup trigger={	    								
		    								<Fab className='fab'>
										    	<OverrideMaterialUICss> <AddIcon style={{color:'white'}}/> </OverrideMaterialUICss>
										    </Fab>
											}
											modal
											closeOnDocumentClick={false}
										>
											{close => (
						  						<AddQuestion closefunction={close}/>
						  					)}			
						  				</Popup>

									    <p> Tambah<br/>Pertanyaan </p>
	    							</div>
	    						</div>
    						</div>
    				</Card>
    				</OverrideMaterialUICss>

    				<QuestionCard/>
    			</div>
			</div>
		)
	}
}

class AddQuestion extends Component{
	constructor(props){
		super(props)
		this.state={
			question_type: ''
		}
		this.handleChangeQuestionType = this.handleChangeQuestionType.bind(this)
	}

	handleChangeQuestionType(value) {
	    this.setState({
	      question_type: value
	    });
  	}
	popupDisplay(question_type){
		let returnComponents = []
		if (question_type === ''){
			returnComponents.push(
				<ToggleButtonGroup className='buttons' name='role'type='radio' onChange={this.handleChangeQuestionType}>
            		<ToggleButton className='button' value='multiple_choice'> Pilihan Ganda </ToggleButton>
            		<ToggleButton className='button' value='string_input'> Isian </ToggleButton>
            		<ToggleButton className='button' value='numeric_input' style={{border:'none'}}> Jawaban Angka </ToggleButton>
          		</ToggleButtonGroup>
			)	
		}
		else if (question_type === 'multiple_choice'){
			returnComponents.push(<InputQuestion handleChangeQuestionType={this.handleChangeQuestionType} question_type={this.state.question_type} closefunction={this.props.closefunction}/>)
		}
		else if (question_type === 'string_input'){
			returnComponents.push(<InputQuestion handleChangeQuestionType={this.handleChangeQuestionType} question_type={this.state.question_type} closefunction={this.props.closefunction}/>)
		}
		else if (question_type === 'numeric_input'){
			returnComponents.push(<InputQuestion handleChangeQuestionType={this.handleChangeQuestionType} question_type={this.state.question_type} closefunction={this.props.closefunction}/>)
		}
		return(returnComponents)
	}

	render(){
		return(
			<div className='popup' style={{display:'flex', flexDirection:'column'}}>
				{this.popupDisplay(this.state.question_type)}
				
			</div>
		)
	}
}
class QuestionCard extends Component{
	constructor(props){
		super(props);
		this.state={
			question: 'Di antara karakteristik struktural berikut yang dengan dengan struktur tubuhnya. Di antara pasangan tersebut yang mungkin adalah: ',
			possible_answers: ['pisang', 'bambu', 'jati', 'cemara'],
			correct_answer: 'pisang',
			question_number:'1',
			live: false,
			expanded: false,
		}
	}

	handleExpandClick = () =>{
		this.setState(state => ({expanded: !state.expanded}))
	}

	createAnswerButtons(answerArray){
		let answerButtons=[]
		for (let i=0; i<answerArray.length; i++){
			answerButtons.push(<ToggleButton className='answer'> {String.fromCharCode(i+65)}. {answerArray[i]}</ToggleButton>)
		}
		return answerButtons;
	}
	render(){
		return(
			<div>
				<OverrideMaterialUICss>
				<Card className='question-card'>
					<OverrideMaterialUICss><CardContent className='card-content'>
						<div>
							<p> {this.state.question_number}. </p>
						</div>
						<div style={{width:'85%'}}>
							<p> {this.state.question} </p>
						</div>
						
							<OverrideMaterialUICss><IconButton style={{padding:'0'}}>
								<MoreVertIcon/>
							</IconButton> </OverrideMaterialUICss>
						
					</CardContent> </OverrideMaterialUICss>
					
					<OverrideMaterialUICss> <CardActions className='card-action' /*style={{justifyContent:'space-between', backgroundColor:'lightgrey'}}*/>
						<OverrideMaterialUICss>
						<IconButton 
							onClick={this.handleExpandClick}
							aria-expanded={this.state.expanded}
							aria-label='Show more'
							className='expand-button'
						>
							<ExpandMoreIcon/>
						</IconButton>
						</OverrideMaterialUICss>
						<Button> Live </Button>
					</CardActions></OverrideMaterialUICss>
					<OverrideMaterialUICss><Collapse in={this.state.expanded} timeout='auto' unmountOnExit>
						<ToggleButtonGroup className='answers' name='lectureDates'type='radio'>
							{this.createAnswerButtons(this.state.possible_answers)}
						</ToggleButtonGroup>
					</Collapse></OverrideMaterialUICss>
				</Card>
				</OverrideMaterialUICss>
			</div>
		)
	}
}

export default Dashboard;