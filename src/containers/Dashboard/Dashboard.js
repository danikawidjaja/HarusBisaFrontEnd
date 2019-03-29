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
import StatisticIcon from '@material-ui/icons/Equalizer';
import Collapse from '@material-ui/core/Collapse';
import Popup from 'reactjs-popup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calIcon from './cal.png';
import InputQuestion from './InputQuestion';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import Switch from 'react-toggle-switch';




class Dashboard extends Component{
	constructor(props){
		super(props);
		this.state={
			lectures:[{date:'2/3', description:'anatomi'}, {date:'2/7', description:'fisiologi'}, {date:'2/10', description:''}],
			class_name:'Biologi Molekuler Kelas A',
			selected_lecture:{date:'2/3', description:'Anatomi'},
			showUpdateLectureModal: false,
			lectureToUpdate:null,
			showDeleteLectureModal:false,
			lectureToDelete:null,
		};
		this.changeSelectedLecture = this.changeSelectedLecture.bind(this);
	}

	async changeSelectedLecture(new_selected_lecture){
		this.setState={
			selected_lecture: new_selected_lecture
		}
	}
	toggleShowDeleteLectureModal(){
  		this.setState({
  			showDeleteLectureModal: !this.state.showDeleteLectureModal
  		})
  	}
  	toggleShowUpdateLectureModal(){
  		
  		this.setState({
  			showUpdateLectureModal: !this.state.showUpdateLectureModal
  		})
  	}
  	changeshowDeleteLectureModal(lectureToBeDeleted){
  		this.toggleShowDeleteLectureModal()
  		this.setState({
  			lectureToDelete: lectureToBeDeleted,
  		})
  	}
  	changeShowUpdateLectureModal(lectureToBeUpdated){
  		this.toggleShowUpdateLectureModal()
  		this.setState({
  			lectureToUpdate: lectureToBeUpdated,
  		})
  	}

	async componentWillMount(){
    	this.props.isNavVisible(false);
    	window.scrollTo(0, 0);
  	}

  	async componentDidMount(){
  	}
	render(){
		if (this.props.Auth.loggedIn()){
			return(
	    		<div className='Dashboard'>
	    			<Popup
	    				open ={this.showUpdateLectureModal}
	    				modal
	    			>
	    				<AddLecture/>
	    			</Popup>

	    			<Popup
	    				open = {this.showDeleteLectureModal}
	    				modal
	    			>
	    				<div>
	    				<p> Are you sure ? </p>
	    				<Button> yes </Button>
	    				<Button> no </Button>
	    				</div>
	    			</Popup>

	    			<div className='left'>
	    				<DashboardLeft lectures={this.state.lectures} changeSelectedLecture={this.changeSelectedLecture} changeshowDeleteLectureModal={this.changeshowDeleteLectureModal} changeShowUpdateLectureModal={this.changeShowUpdateLectureModal}/>
	    			</div>
	    			<div className='right'>
	    				<DashboardRight class_name={this.state.class_name} selectedLecture={this.state.selected_lecture} />
	    			</div>
	    		</div>
			)
		}
		else{
			alert('Please login!')
			this.props.history.push('/login');
			return(null)
		}
		
	}
}

class LectureButton extends Component{
	constructor(props){
		super(props);
		this.state={
			date:this.props.date,
			defaultLecture: this.props.default
		}
		
	}

	deleteLecture(){

	}
	render(){
		if (this.props.defaultLecture){
			return(
				<Popup
	  			trigger={<ToggleButton className='button' type='radio' value={this.state.date} defaultChecked > Sesi {this.state.date} </ToggleButton>}
	  			position='right'
	  			on = 'hover'
	  			>
		  			<Button> Delete lecture </Button>
		  			<Button onClick={this.props.changeShowUpdateLectureModal}> Edit Lecture </Button>
	  			</Popup>
			)
		}
		else{
			return(
				<Popup
		  			trigger={<ToggleButton className='button' type='radio' value={this.state.date} > Sesi {this.state.date} </ToggleButton>}
		  			position='right'
		  			on = 'hover'
		  		>
		  			<Button onClick={this.deleteLecture}> Delete lecture </Button>
		  			<Button onClick={this.editLecture}> Edit Lecture </Button>
		  		</Popup>
			)
		}
	}

}
class DashboardLeft extends Component{
	constructor(props){
		super(props);
		this.state={
			lectures: this.props.lectures,
			showContextMenu: false,
		}
		this.handleChangeLecture = this.handleChangeLecture.bind(this);
		this.handleRightClick = this.handleRightClick.bind(this);
	}
	handleChangeLecture(value, event) {
		this.props.changeSelectedLecture(value)
  	}

  	handleRightClick(e){
  		console.log('show context menu toggle')
  		this.setState({
  			showContextMenu: !this.state.showContextMenu,
  		})
  	}

  	makeToggleButtons(lectures){
  		let toggleButtons = []
  		if (lectures.length == 0){
  			toggleButtons.push(<OverrideMaterialUICss><Fab style={{backgroundColor:'#ffe01c'}}> <AddIcon/> </Fab> </OverrideMaterialUICss>)
  		}
  		else{
	  		for (let i=0; i<lectures.length; i++){
	  			if (i==0){
	  				toggleButtons.push(
	  					//<LectureButton date={lectures[i].date} default={true}/>
	  					<ToggleButton className='button' type='radio' value={lectures[i]} defaultChecked > Sesi {lectures[i].date} </ToggleButton>
		  			)
	  			}
	  			else{
	  				toggleButtons.push(
	  					//<LectureButton date={lectures[i].date} default={false}/>
	  					<ToggleButton className='button' type='radio' value={lectures[i]}> Sesi {lectures[i].date} </ToggleButton>
	  				)
	  			}
	  		}
	  	}
  		return toggleButtons
  	}
	render(){
		return(
			<div>
				<ToggleButtonGroup className='buttons' name='lectureDates'type='radio' defaultValue={this.state.lectures[0]} onChange={this.handleChangeLecture}>
            		{this.makeToggleButtons(/*[]*/this.state.lectures)}
          		</ToggleButtonGroup>
          		<Popup trigger={<Button className='addButton'> + Tambah Sesi </Button>} modal closeOnDocumentClick={false}>
  					{close => (
  						<div className='popup'>
	  						<div className= "popup-header">
	        					<h2> Tambah Sesi </h2>
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
				<div style={{display:'flex', marginTop:'auto', marginBottom:'auto'}}>
					<OverrideMaterialUICss><IconButton>
						<OverrideMaterialUICss> <PeopleOutline style={{color: 'black'}}/> </OverrideMaterialUICss>
					</IconButton> </OverrideMaterialUICss>
					<OverrideMaterialUICss><IconButton>
						<OverrideMaterialUICss> <SettingsOutlined style={{color: 'black'}}/> </OverrideMaterialUICss>
					</IconButton></OverrideMaterialUICss>
					<OverrideMaterialUICss><IconButton>
						<OverrideMaterialUICss> <NotificationsOutlined style={{color: 'black'}}/> </OverrideMaterialUICss>
					</IconButton></OverrideMaterialUICss>
				</div>
   			</div>
		)
	}

}
class DashboardRight extends Component{

	constructor(props){
		super(props);
		this.state={
			date: this.props.selectedLecture.date,
			description: this.props.selectedLecture.description,
			live: false
		}
		this.toggleLive = this.toggleLive.bind(this)
	}
	componentWillReceiveProps(nextProps) {
		console.log(nextProps)
  		{/*this.setState(nextProps =>{
  			return{ 
  				date: nextProps.selectedLecture.date, 
  				description: nextProps.selectedLecture.description
  			};
  		});  */}
	}

	liveIndicator(){
		if (this.state.live){
			return(
				<div style={{display: 'flex', flexDirection:'row', marginLeft:'5vw'}}>
					<div className='live-indicator' style={{backgroundColor:'#82DAA4'}}> </div>
					<p style={{color:'#82DAA4'}}> Aktif </p>
				</div>
			)
		}
		else{
			return(
				<div style={{display: 'flex', flexDirection:'row', marginLeft:'5vw'}}>
					<div className='live-indicator' style={{backgroundColor:'#828282'}}> </div>
					<p style={{color:'#828282'}}> Baru </p>
				</div>
			)
		}
	}

	toggleLive(){
		this.setState(prevState => {
	      return {
	        live: !prevState.live
	      };
	    });
	}
	render(){
		return(
			<div>
				<DashboardNavigation/>
    			<div className='content'>
    				<div className='header'>
    					<h1> Sesi {this.state.date} </h1>
    					{this.liveIndicator()} 
    				</div>
    				<div className='content-option'>
	    				<div className='interactive'>
	    					<OverrideMaterialUICss><IconButton style={{background:'transparent', border:'None'}} onClick={this.toggleLive}>
	    						<PlayArrow className='icon'/>
	    					</IconButton></OverrideMaterialUICss>
	    					<p> Mulai Sesi </p>
	    				</div>
	    				<div className='interactive'>
	    					<Popup trigger={	    								
		    					<IconButton style={{background:'transparent', border:'None'}}>
						    	<OverrideMaterialUICss> <AddIcon className='icon'/> </OverrideMaterialUICss>
							    </IconButton>
							}
								modal
								closeOnDocumentClick={false}
							>
								{close => (<AddQuestion closefunction={close}/>)}			
						  	</Popup>
							<p> Tambah<br/>Pertanyaan </p>
	    				</div>
	    				<div className='interactive'>
	    					<OverrideMaterialUICss> <IconButton style={{background:'transparent', border:'None'}}>
	    						<StatisticIcon className='icon'/>
	    					</IconButton> </OverrideMaterialUICss>
	    					<p> Statistik Sesi {this.state.date} </p>
	    				</div>
	    				<div className='interactive'>
	    					<OverrideMaterialUICss><IconButton style={{background:'transparent', border:'None'}}>
								<MoreVertIcon className='icon'/>
							</IconButton> </OverrideMaterialUICss>
	    					<p> Setting Sesi {this.state.date} </p>
	    				</div>
	    			</div>
    						
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
				<div style={{display:'flex', flexDirection:'row', width:'100%'}}>
					<div style={{width:'10%'}}>
						<IconButton onClick={this.props.closefunction} ><KeyboardArrowLeft/></IconButton>
					</div>
					<div style={{width:'90%'}}>
					<ToggleButtonGroup className='buttons' name='role'type='radio' onChange={this.handleChangeQuestionType}>
						<ToggleButton className='button' value='multiple_choice'> Pilihan Ganda </ToggleButton>
	            		<ToggleButton className='button' value='string_input'> Isian </ToggleButton>
	            		<ToggleButton className='button' value='numeric_input' style={{border:'none'}}> Jawaban Angka </ToggleButton>
	          		</ToggleButtonGroup>
	          		</div>
	          	</div>
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
			showCorrectAns: false
		}
	}

	handleExpandClick = () =>{
		this.setState(state => ({expanded: !state.expanded}))
	}
	toggleSwitch = () => {
	    this.setState(prevState => {
	      return {
	        showCorrectAns: !prevState.showCorrectAns
	      };
	    });
	}

	createAnswerButtons(answerArray){
		let answerButtons=[]
		for (let i=0; i<answerArray.length; i++){
			if (answerArray[i] == this.state.correct_answer){
				answerButtons.push(<ToggleButton className= {this.state.showCorrectAns ? 'answer-correct' : 'answer'}> {String.fromCharCode(i+65)}. {answerArray[i]}</ToggleButton>)
			}
			else{
				answerButtons.push(<ToggleButton className='answer'> {String.fromCharCode(i+65)}. {answerArray[i]}</ToggleButton>)
			}
			
		}
		return answerButtons;
	}

	showSwitch(){
		if (this.state.expanded){
			return(
				<div style={{verticalAlign:'middle', display:'flex', justifyContent:'space-between', marginLeft:'1vw'}}> 
					<Switch onClick={this.toggleSwitch} on={this.state.showCorrectAns}/>
					<p style={{color: (this.state.showCorrectAns) ? '#82DAA4' : 'grey', margin:'auto', marginLeft:'1vw'}}> Buka Jawaban </p>
				</div>
			)
		}
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
						
						<IconButton>
						<Popup
							trigger={<MoreVertIcon/>}
							position= 'bottom right'
							on = 'click'
							closeOnDocumentClick

						>
							<Button> Delete Question </Button>
							<Button> Edit Question </Button>
						</Popup>
						</IconButton>
						
					</CardContent> </OverrideMaterialUICss>
					
					<OverrideMaterialUICss><Collapse in={this.state.expanded} timeout='auto' unmountOnExit style={{marginBottom:'2vh'}}>
						<ToggleButtonGroup className='answers' name='lectureDates'type='radio'>
							{this.createAnswerButtons(this.state.possible_answers)}
						</ToggleButtonGroup>
					</Collapse></OverrideMaterialUICss>

					<OverrideMaterialUICss> <CardActions className='card-action' /*style={{justifyContent:'space-between', backgroundColor:'lightgrey'}}*/>
						<div style={{verticalAlign:'middle', display:'flex', justifyContent:'space-between'}}> 
							<OverrideMaterialUICss>
								<IconButton 
									onClick={this.handleExpandClick}
									aria-expanded={this.state.expanded}
									aria-label='Show more'
									className={this.state.expanded ? 'expand-button-expanded' : 'expand-button-normal'}
								>
									<ExpandMoreIcon/>
								</IconButton>
							</OverrideMaterialUICss>
							{this.showSwitch()}
						</div>

						<Button> Live </Button>

					</CardActions></OverrideMaterialUICss>

					
				</Card>
				</OverrideMaterialUICss>
			</div>
		)
	}
}

export default Dashboard;