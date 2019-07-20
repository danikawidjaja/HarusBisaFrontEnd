import React, { Component } from 'react';
import {DashboardNavigation} from './Dashboard';
import LoadingPage from './LoadingPage';
import './Dashboard.css';
import './StudentDashboard.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PlayArrow from '@material-ui/icons/PlayArrow';
import socketIOClient from "socket.io-client";
import Timer from '../Timer/Timer';

var socket
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
				email: "",
				id: '', 
			},
			selected_course:null,
			selected_lecture:null,
			isLoading: true,
			changingSelectedCourse: false,
			new_active_lecture: {
				live: false,
				lecture_id: "",
				date:''
			}
			,
		};
		this.changeSelectedCourse = this.changeSelectedCourse.bind(this);
		socket = null;
		this.toNewLecture = this.toNewLecture.bind(this);
	}
	changeSelectedCourse(new_selected_course){
		this.setState({
			selected_course: new_selected_course,
			isLoading: true,
			changingSelectedCourse: true
		})
		this.props.history.push('/student-dashboard/'+ new_selected_course._id)
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

	findSelectedCourse(id, courses){
		for (let i=0; i<courses.length; i++){
			if (courses[i]._id == id){
				return courses[i];
			}
		}
		return null;
	}
	

	async componentDidMount(){
  		this.props.isNavVisible(false);
    	window.scrollTo(0, 0);
    	var id = this.props.match.params.id;
		await this.props.Auth.getData()
  		.then(async res =>{
      		await this.setState({
      			courses: res.data.courses,
      			selected_course: this.findSelectedCourse(id, res.data.courses),
      			profile:{
      				first_name : res.data.first_name,
      				last_name : res.data.last_name,
      				email: res.data.email,
      				role: res.data.role,
      				school: res.data.school,
      				id: res.data._id,
      			},
      		}, async () =>
      		await this.props.Auth.getLectures(this.state.selected_course._id)
	      	.then(async res =>{
	      		await this.setState({
	      			lectures: res.data.lectures,
	      			selected_lecture: res.data.lectures[0],
	      			isLoading: false,
	      		})

	      		if (!socket){
					socket = socketIOClient('http://ec2-54-174-154-58.compute-1.amazonaws.com:8080', {transports : ['websocket']});
					socket.on('connect', () => {
  						if (socket.connected){
  							console.log('socket connected')
  							var data = {
  								user_id: this.state.profile.id,
  								user_role: this.state.profile.role,
  								course_id: id
  							}
  							socket.emit("set_socket_data", data)
  						}
  						else{
  							console.log('error with connection')
  						}
					});
				}
				if (socket){
					socket.on("lecture_is_live",(data) =>{
						var temp_date = data.date.split('/')
						this.setState({
							new_active_lecture:{
								live: data.live,
								lecture_id: data.lecture_id,
								date: temp_date[0] + '/' + temp_date[1]
							}
						})
					})
				}
	      	})	
	      )
      	})
      	.catch(err =>{
        	console.log(err.message)
      	}) 	
  	}

  	toNewLecture(){
  		this.props.history.push('/'+this.state.selected_course._id+'/lecture/' + this.state.new_active_lecture.lecture_id +'/'+ 1);
  	}
	render(){
		if (this.props.Auth.loggedIn()){
			if (!this.state.isLoading){
				return(
		    		<div className='Dashboard'>
		    			<DashboardNavigation course_option={true} selected_course={this.state.selected_course} courses={this.state.courses} profile={this.state.profile} Auth={this.props.Auth} userHasAuthenticated={this.props.userHasAuthenticated} history={this.props.history} changeSelectedCourse={this.changeSelectedCourse}/>
		    			<div className='StudentDashboard'>
		    				<h1> {this.state.selected_course.course_name} </h1>
		    				<div className='line'></div>
		    				{this.state.new_active_lecture.live ? 
		    					<div className='new_lecture' onClick={this.toNewLecture}>
		    						<PlayArrow style={{color:'white'}}/>
		    						<p>Bergabung dengan sesi {this.state.new_active_lecture.date}</p>
		    					</div> 
		    					: null
		    				}
		    				<p> Sesi yang telah berlangsung </p>
		    				<LectureTable course_id={this.props.match.params.id} lectures={this.state.lectures} history={this.props.history}/>
		    				<div className='text'>
		    					<p>"Gantungkan cita-cita mu setinggi langit! Bermimpilah setinggi langit. Jika engkau jatuh, engkau akan jatuh di antara bintang-bintang."</p>
		    					<br/><br/><p>Soekarno</p>
		    				</div>
		    			</div>
						
		    		</div>
				)
			}
			else{
				return(
				<div>
					<LoadingPage role={'student'}/>
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
var gradebookJson = {
	"gradebooks": [
	  {
		"lecture_id": "18",
		"lecture_date": "22/9/2018",
		"attendance": true,
		"total_score": "90"
	  },
	  {
		"lecture_id": "19",
		"lecture_date": "3/3/2019",
		"attendance": false,
		"total_score": "80"
	  }
	]
  }
class LectureTable extends Component{
	constructor(props){
		super(props);
		this.state={
			gradebooks : []
		}
		this.handleClickRow = this.handleClickRow.bind(this); 
	}

	componentDidMount(){
		this.setState({
			gradebooks: gradebookJson.gradebooks,
		})
	}
	createData(id, date, attendance, total_score) {
  		return { id, date, attendance, total_score };
	}
	createRows(){
		console.log(this.state.gradebooks)
		let rows = [];
		var gradebooks = this.state.gradebooks;
		gradebooks.forEach(gradebook =>{
			let lecture_date = gradebook.lecture_date.split('/');
			let date = "Sesi " + lecture_date[0] + '/' + lecture_date[1];
			var attendance = gradebook.attendance ? "Hadir" : "Tidak Hadir"
			var total_score = parseInt(gradebook.total_score, 10)
			rows.push(this.createData(gradebook.lecture_id, date, attendance, total_score))
		})
		return rows;
	}

	handleClickRow(id){
		this.props.history.push('/'+this.props.course_id+'/lecture/' + id + '/' + 0);

	}
	render(){
		const rows = this.createRows();
		return(
			<Table className='table'>
		        <TableHead style={{border:'0px'}}>
		          <TableRow style={{boxShadow:'none', border:'0px'}}>
		            <TableCell className='header'>Sesi</TableCell>
		            <TableCell className='header' >Kehadiran</TableCell>
		            <TableCell className='header' >% Nilai Total</TableCell>
		          </TableRow>
		        </TableHead>
		        {rows.length == 0 ? 
			        <p>You don't have any lectures yet</p>
			        :
			        <TableBody>
			          {rows.map(row => (
			          	//<div className='row'>
			            <TableRow className='t-row' key={row.id} onClick={() => this.handleClickRow(row.id)}>
			              <TableCell className='cell' component="th" scope="row">
			                {row.date}
			              </TableCell>
			              <TableCell className='cell' >{row.attendance}</TableCell>
			              <TableCell className='cell' >{row.total_score}</TableCell>
			            </TableRow>
			            //</div>
			          ))}
			        </TableBody>

		    	}
		      </Table>
		)
	}
}

export default StudentDashboard;
export {socket};