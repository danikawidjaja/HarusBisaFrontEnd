import React, { Component } from 'react';
import {DashboardNavigation} from '../Dashboard/Dashboard';
import LoadingPage from '../Dashboard/LoadingPage';
import '../Dashboard/Dashboard.css';
import './Gradebook.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, IconButton, Divider } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {LectureTable} from '../Dashboard/StudentDashboard';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

class Gradebook extends Component{
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
				id:'' 
			},
			selected_course:null,
			selected_lecture:null,
			isLoading: true,
			changingSelectedCourse: false,
			flag: false,
			live: false,
			displayScore: false,
		};
		this.toggleDisplayScore = this.toggleDisplayScore.bind(this);
		this.return = this.return.bind(this);
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
		var course_id = this.props.match.params.course_id;
		var id = this.props.match.params.id;
		await this.props.Auth.getData()
			.then(async res =>{
				await this.setState({
					courses: res.data.courses,
					selected_course: this.findSelectedCourse(course_id, res.data.courses),
					profile:{
						first_name : res.data.first_name,
						last_name : res.data.last_name,
						email: res.data.email,
						role: res.data.role,
						school: res.data.school,
						id: res.data._id
					},
				}, async () =>
				await this.props.Auth.getLectures(this.state.selected_course._id)
				.then(async res =>{
					await this.setState({
						lectures: res.data.lectures,
						selected_lecture: res.data.lectures[0],
						isLoading: false,
						})
					})	
				)
			})
			.catch(err =>{
			console.log(err.message)
			alert(err.message)
			})
	}

	return(){
		this.props.history.push("/dashboard/"+ this.state.selected_course._id);
	}
	toggleDisplayScore(){
		this.setState(prevState => {
			return{
				displayScore: !prevState.displayScore
			}
		})
	}
	render(){
		if (!this.state.isLoading){
			return(
				<div className='Dashboard'>
					<DashboardNavigation course_option={true} selected_course={this.state.selected_course} courses={this.state.courses} profile={this.state.profile} Auth={this.props.Auth} userHasAuthenticated={this.props.userHasAuthenticated} history={this.props.history} changeSelectedCourse={this.changeSelectedCourse}/>
					<div className='Gradebook'>
						{this.state.displayScore ?
						<ScorePage/> :
						<WarningMessage toggleDisplayScore={this.toggleDisplayScore} return={this.return}/>
						}
					</div>
				</div>
			)
		}
		else{
			return(
				<LoadingPage/>
			)
		}
	}
}

var lectures_json = {
	"number_of_students": "100",
	"class_average": "76.09",
	"gradebooks": [
	  {
		"lecture_id": "18",
		"date": "22/9/2018",
		"attendance":"50",
		"participation_average_score": "80",
		"correctness_average_score": "90",
		"total_average_score": "85"
	  },
	  {
		"lecture_id": "19",
		"date": "3/3/2019",
		"attendance":"80",
		"participation_average_score": "90",
		"correctness_average_score": "90",
		"total_average_score": "90"
	  }
	]
  }

var students_json = {
	"number_of_students": "100",
	"class_average": "76.09",
	"gradebooks": [
	  {
		"firstname": "John",
		"lastname": "Doe",
		"email": "john.doe@gmail.com",
		"participation_average_score": "90",
		"correctness_average_score": "90",
		"total_average_score": "90"
	  },
	  {
		"firstname": "James",
		"lastname": "Smith",
		"email": "james.smith@gmail.com",
		"participation_average_score": "90",
		"correctness_average_score": "90",
		"total_average_score": "90"
	  },
	]
  }
class ScorePage extends Component{
	constructor(props){
		super(props);
		this.state={
			number_of_students: 0,
			class_average: 0,
			gradebooks_by_lectures: [],
			gradebooks_by_students:[],
			gradebooks:[],
			type:"lecture"
		}
		this.buttonClick = this.buttonClick.bind(this);
	}

	componentDidMount(){
		var res = lectures_json;
		this.setState({
			number_of_students: res.number_of_students,
			class_average: res.class_average,
			gradebooks_by_lectures: lectures_json.gradebooks,
			gradebooks_by_students: students_json.gradebooks,
			gradebooks: lectures_json.gradebooks
		})
	}

	async buttonClick(type){
		await this.setState({
			type: type,
			gradebooks: type === "lecture" ? this.state.gradebooks_by_lectures : this.state.gradebooks_by_students 
		})
		console.log(this.state)
	}
	render(){
		return(
			<div className='content'>
				<div className='header'>
					<h1>Daftar Nilai</h1>
					<div className='search-bar' style={{width:"inherit"}}>
						<SearchIcon className='icon'/>
						<input
							type = 'text'
							placeholder='Cari sesi, nama siswa, dll...'
						/>
					</div>
				</div>
				
				<div className='information'>
					<div>Graph</div>
					<div className='statistics'>
						<div className='statistics-box'>
							<h1>{this.state.number_of_students}</h1>
							<p>Jumlah murid terdaftar</p>
						</div>
						<div className='statistics-box'>
							<h1>{this.state.class_average}%</h1>
							<p>Rata-rata kelas</p>
						</div>
					</div>
				</div>
				
				<div className='selector'>
					<p>Nilai Tiap {this.state.type === "lecture" ? "Sesi" : "Murid"}</p>
					<div className='buttons'>
						<Button disableFocusRipple disableRipple className='button' style={{fontWeight:(this.state.type === "lecture" ? '500' :'300')}} onClick={()=> this.buttonClick("lecture")}>Lihat Berdasarkan Sesi</Button>
						<Button disableFocusRipple disableRipple className='button' style={{fontWeight:(this.state.type === "student" ? '500' :'300')}} onClick={() => this.buttonClick("student")}>Lihat Berdasarkan Murid</Button>
					</div>
				</div>

				<div className='table'>
					<ScoreTable gradebooks={this.state.gradebooks} type={this.state.type}/>
				</div>

			</div>
		)
	}
}

class ScoreTable extends Component{
	constructor(props){
		super(props);		
	}

	createRows(){
		let rows = [];
		var gradebooks = this.props.gradebooks;
		gradebooks.forEach(gradebook =>{
			if (gradebook.date !== undefined && !gradebook.date.includes("Sesi")){
				let lecture_date = gradebook.date.split('/');
				let date = "Sesi " + lecture_date[0] + '/' + lecture_date[1];
				gradebook.date = date;
			}
			rows.push(gradebook)
		})
		return rows;
	}

	createHeaderByStudent(){
		return(
			<React.Fragment>
				<TableCell className='head-cell'>Nama Depan</TableCell>
				<TableCell className='head-cell'>Nama Belakang</TableCell>
				<TableCell className='head-cell'>Email</TableCell>
			</React.Fragment>
		)
	}

	createHeaderByLecture(){
		return(
			<React.Fragment>
				<TableCell className='head-cell'>Sesi</TableCell>
				<TableCell className='head-cell'>Kehadiran</TableCell>
			</React.Fragment>
		)
	}
	createTableHeader(){
		if (this.props.type === "lecture"){
			return this.createHeaderByLecture();
		}
		else{
			return this.createHeaderByStudent();
		}
	}
	render(){
		const rows = this.createRows();
		return(
			<Table className='table'>
		        <TableHead style={{border:'0px'}}>
		          <TableRow className='header-row'>
					{this.createTableHeader()}
					<TableCell className='head-cell'>Nilai partisipasi(%)</TableCell>
					<TableCell className='head-cell'>Nilai kebenaran(%)</TableCell>
					<TableCell className='head-cell'>Nilai rata-rata(%)</TableCell>
					<TableCell className='head-cell'>{""}</TableCell>
		          </TableRow>
		        </TableHead>
		        {rows.length == 0 ? 
			        <p>You don't have any lectures yet</p>
			        :
			        <TableBody>
			          {rows.map(row => (
			            <TableRow className='t-row' key={row.lecture_id}>
						{this.props.type === "lecture" ?
							<React.Fragment>
								<TableCell className='cell'>{row.date}</TableCell>
								<TableCell className='cell'>{row.attendance}</TableCell>
							</React.Fragment>
							:
							<React.Fragment>
								<TableCell className='cell'>{row.firstname}</TableCell>
								<TableCell className='cell'>{row.lastname}</TableCell>
								<TableCell className='cell'>{row.email}</TableCell>
							</React.Fragment> 
						} 
			              <TableCell className='cell'>{row.participation_average_score}</TableCell>
						  <TableCell className='cell'>{row.correctness_average_score}</TableCell>
						  <TableCell className='cell'>{row.total_average_score}</TableCell>
						  <TableCell><IconButton><MoreHorizIcon/></IconButton></TableCell>
			            </TableRow>
			          ))}
			        </TableBody>

		    	}
		      </Table>
		)
	}
}
class WarningMessage extends Component{
	constructor(props){
		super(props);
	}
	
	render(){
		return(
			<div className='content'>
				<h1>Bagian ini akan menampilkan daftar nilai mahasiswa.<br/>Tidak direkomendasikan untuk dibuka ketika tersambung dengan projektor.</h1>				
				<div className='row' style={{marginTop: '2rem'}}>
					<div className='col' style={{display: 'flex', justifyContent:'center'}}>
						<Button className='warning-button' onClick={this.props.return} style={{backgroundColor:'transparent'}}>Kembali</Button>
					</div>
					<div className='col'  style={{display: 'flex', justifyContent:'center'}}>
						<Button className='warning-button' onClick={this.props.toggleDisplayScore}>Lanjutkan</Button>
					</div>
				</div>
			</div>
		)
	}
}
export default Gradebook;