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




class Dashboard extends Component{
	constructor(props){
		super(props);
		this.state={
			lectureDates:['2/3', '2/7', '2/10', '2/11', '2/12'],
			class_name:'Biologi Molekuler Kelas A',
			selectedDate:'',
		};
		this.changeSelectedDate= this.changeSelectedDate.bind(this);
		this.getSelectedDate = this.getSelectedDate.bind(this);
	}

	changeSelectedDate(date){
		this.setState={
			selectedDate: date
		}
	}

	getSelectedDate(){
		return this.state.selectedDate;
	}
	async componentWillMount(){
    	this.props.isNavVisible(false);
    	window.scrollTo(0, 0);
    	this.changeSelectedDate(this.state.lectureDates[0]);
  	}

  	async componentDidMount(){
  	}
	render(){
		return(
    		<div className='Dashboard'>
    			<div className='left'>
    				<DashboardLeft lectureDates={this.state.lectureDates} changeSelectedDate={this.changeSelectedDate}/>
    			</div>
    			<div className='right'>
    				<DashboardRight class_name={this.state.class_name} selectedDate={this.state.selectedDate} getSelectedDate={this.getSelectedDate}/>
    			</div>
    		</div>
		)
	}
}

class DashboardLeft extends Component{
	constructor(props){
		super(props);
		this.state={
			selectedDate:this.props.lectureDates[0],
			lectureDates: this.props.lectureDates,
		}
		this.handleChangeDate = this.handleChangeDate.bind(this);
	}
	handleChangeDate(value, event) {
	    this.setState({
	      selectedDate: value
	    });
	    this.props.changeSelectedDate(value);
  	}

  	makeToggleButtons(lectureDates){
  		let toggleButtons = []
  		if (lectureDates.length == 0){
  			toggleButtons.push(<OverrideMaterialUICss><Fab style={{backgroundColor:'#ffe01c'}}> <AddIcon/> </Fab> </OverrideMaterialUICss>)
  		}
  		else{
	  		for (let i=0; i<lectureDates.length; i++){
	  			if (i==0){
	  				toggleButtons.push(<ToggleButton className='button' value={lectureDates[i]} defaultChecked> Kelas {lectureDates[i]} </ToggleButton>)
	  			}
	  			else{
	  				toggleButtons.push(<ToggleButton className='button' value={lectureDates[i]}> Kelas {lectureDates[i]} </ToggleButton>)
	  			}
	  		}
	  	}
  		return toggleButtons
  	}
	render(){
		return(
			<div>
				<ToggleButtonGroup className='buttons' name='lectureDates'type='radio' defaultValue={'2/3'} onChange={this.handleChangeDate}>
            		{this.makeToggleButtons(/*[]*/this.state.lectureDates)}
          		</ToggleButtonGroup>
          		<Popup trigger={<Button className='addButton'> + Add Class </Button>} modal>
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
			class_date: '',
			description:''
		}
	}
	handleChange = event => {
	    this.setState({
	      [event.target.id]: event.target.value
	    });
  	}

  	handleSubmit(event){
  		alert(this.state.class_date+' course added')
  	}

  	validateForm(){
  		if (this.state.class_date.length == 0){
  			return false;
  		}
  		else{
  			return true;
  		}
  	}
	render(){
	    return(
	      	<div className="form">
	        	<form onSubmit={this.handleSubmit}>
	          		<FormGroup controlId="class_date">
	            		<ControlLabel>Tanggal kelas</ControlLabel>
			            <FormControl
			              autoFocus
			              type="text"
			              value={this.state.class_date}
			              onChange={this.handleChange}
			              placeholder = '2/3'
			            />
	          		</FormGroup>

	          		<FormGroup controlId="description">
	            		<ControlLabel>Deskripsi</ControlLabel>
			            <FormControl
			              type="text"
			              value={this.state.description}
			              onChange={this.handleChange}
			              placeholder= '(optional)'
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
				           disabled={!this.validateForm()}
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
					<IconButton>
						<OverrideMaterialUICss> <PeopleOutline style={{color: 'black'}}/> </OverrideMaterialUICss>
					</IconButton>
					<IconButton>
						<OverrideMaterialUICss> <SettingsOutlined style={{color: 'black'}}/> </OverrideMaterialUICss>
					</IconButton>
					<IconButton>
						<OverrideMaterialUICss> <NotificationsOutlined style={{color: 'black'}}/> </OverrideMaterialUICss>
					</IconButton>
					<div style={{borderRadius:'50%', background:'red', width:'2vw', height:'2vw', margin:'auto', textAlign:'center'}}>
						<h1 style={{margin:'auto'}}> W </h1>
					</div>
				</div>
   			</div>
		)
	}

}
class DashboardRight extends Component{
	constructor(props){
		super(props);
		this.state={
			selectedDate:''
		}
	}

	async componentWillMount(){
		//console.log(this.props.getSelectedDate())
		this.setState={
			selectedDate: this.props.getSelectedDate(),
		}
	}

	async componentDidMount(){
		//console.log(this.props.getSelectedDate())
		this.setState={
			selectedDate: this.props.getSelectedDate(),
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
    							<div style={{marginTop:'1.2vw'}}>
    								<p> {this.props.class_name} </p>
    								<p> Kelas {this.state.selectedDate} </p>
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
										>
											{close => (
						  						<div className='popup'>
							  						<h2> Pilihan Ganda </h2>
							  						<h2> Isian </h2>
							  						<h2 style={{borderBottom:'none'}}> Jawaban Angka </h2>
						  						</div>
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

class QuestionCard extends Component{
	constructor(props){
		super(props);
		this.state={
			question: 'Di antara karakteristik struktural berikut yang dengan dengan struktur tubuhnya. Di antara pasangan tersebut yang mungkin adalah: ',
			possible_answers: ['pisang', 'bambu', 'jati', 'cemara'],
			correct_answer: 'pisang',
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
			answerButtons.push(<ToggleButton>{answerArray[i]}</ToggleButton>)
		}
		return answerButtons;
	}
	render(){
		return(
			<div>
				<OverrideMaterialUICss>
				<Card className='question-card'>
					<CardContent>
						<div>
							<p> 1. {this.state.question} </p>
						</div>
					</CardContent>
					
					<OverrideMaterialUICss> <CardActions style={{justifyContent:'space-between'}}>
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
						<ToggleButtonGroup style={{display:'flex',flexDirection:'column', margin:'auto'}} name='lectureDates'type='radio'>
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