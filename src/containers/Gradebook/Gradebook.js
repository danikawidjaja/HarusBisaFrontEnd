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
import { Button, IconButton, Divider, Checkbox } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Popup from 'reactjs-popup';
import EditIcon from "@material-ui/icons/Edit";
import ReactSlider from 'react-slider';
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';

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
		this.changeSelectedCourse = this.changeSelectedCourse.bind(this)
	}
	findSelected(id, array){
		for (let i=0; i<array.length; i++){
			if (array[i]._id === id){
				return array[i];
			}
			else{
				var tempid = parseInt(id)
				if (array[i].id === tempid){
					return array[i]
				}
			}
		}
		return null;
	}
	async componentDidMount(){
		this.props.isNavVisible(false);
	  	window.scrollTo(0, 0);
		var course_id = this.props.match.params.course_id;
		var lecture_id = this.props.match.params.lecture_id;
		await this.props.Auth.getData()
			.then(async res =>{
				await this.setState({
					courses: res.data.courses,
					selected_course: this.findSelected(course_id, res.data.courses),
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
						selected_lecture: lecture_id ? this.findSelected(lecture_id, res.data.lectures): null,
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
	changeSelectedCourse(course){
		this.setState({
			selected_course: course,
		})
		this.props.history.push("/"+ course._id + "/gradebook")
	}
	render(){
		if (!this.state.isLoading){
			return(
				<div className='Dashboard'>
					<DashboardNavigation course_option={true} selected_course={this.state.selected_course} courses={this.state.courses} profile={this.state.profile} Auth={this.props.Auth} userHasAuthenticated={this.props.userHasAuthenticated} history={this.props.history} changeSelectedCourse={this.changeSelectedCourse}/>
					<div className='Gradebook'>
						{this.state.displayScore ?
						<ScorePage history={this.props.history} course_id={this.state.selected_course._id} selected_lecture={this.state.selected_lecture} Auth={this.props.Auth} course_name={this.state.selected_course.course_name}/> :
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

class Graph extends Component{
	render(){
		return(
			<BarChart
				width={500}
				height={200}
				data={this.props.data}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="Date" />
				<YAxis />
				<Tooltip />
				<Bar dataKey="Average" fill="#FFE01C" />
			</BarChart>
		)
	}
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
			isLoading: true
		}
		this.buttonClick = this.buttonClick.bind(this);
		this.changeGradebooks = this.changeGradebooks.bind(this);
		this.submitEdit = this.submitEdit.bind(this);
		this.submitQuestionInclude = this.submitQuestionInclude.bind(this);
	}

	changeGradebooks(gradebooks){
		this.setState({
			gradebooks: gradebooks
		})
	}
	async componentDidMount(){
		if (this.props.selected_lecture){
			await this.props.Auth.getLectureGradebooksByStudents(this.props.course_id, this.props.selected_lecture.id)
			.then(result =>{
				this.setState({
					lecture_gradebooks_by_students: result.gradebooks,
					gradebooks: result.gradebooks
				})
			})

			await this.props.Auth.getLectureGradebooksByQuizzes(this.props.course_id, this.props.selected_lecture.id)
			.then(result =>{
				console.log(result.gradebooks)
				this.setState({
					lecture_gradebooks_by_questions: result.gradebooks
				})
			})

		}else{
			await this.props.Auth.getGradebooksByLectures(this.props.course_id)
			.then(result =>{
				this.setState({
					number_of_students: result.number_of_students,
					class_average: result.class_average,
					gradebooks_by_lectures: result.gradebooks,
					gradebooks: result.gradebooks
				})
			})

			await this.props.Auth.getGradebooksByStudents(this.props.course_id)
			.then(result =>{
				this.setState({
					gradebooks_by_students: result.gradebooks
				})
			})
			var graphData = []
			this.state.gradebooks.forEach(gradebook =>{
				var temp={
					Date: "",
					Average: ""
				}
				temp.Date = "Sesi " + gradebook.date.split("/")[0] + "/" + gradebook.date.split("/")[1]
				temp.Average = parseFloat(gradebook.total_average_score,10)
				graphData.push(temp)
			})

			this.setState({
				type_options: ["Sesi", "Murid"],
				type: "Sesi",
				isLoading: false,
				graphData: graphData
			})
		}
	}

	async buttonClick(type){
		var gradebooks = this.state.gradebooks
		if (type === "Sesi"){
			gradebooks = this.state.gradebooks_by_lectures
		}
		else if (type === "Murid"){
			if (this.props.selected_lecture){
				gradebooks = this.state.lecture_gradebooks_by_students
			}
			else{
				gradebooks = this.state.gradebooks_by_students
			}
		}
		else if (type === "Pertanyaan"){
			gradebooks = this.state.lecture_gradebooks_by_questions
		}

		await this.setState({
			type: type,
			gradebooks: gradebooks
		})
	}
	submitEdit(participation_reward_percentage, lecture_id){
		this.props.Auth.editParticipationRewardPercentage(this.props.course_id, lecture_id, participation_reward_percentage)
		.then (result =>{
			this.setState({
				number_of_students: result.number_of_students,
				class_average: result.class_average,
				gradebooks_by_lectures: result.gradebooks,
				gradebooks: result.gradebooks
			})
		})
	}
	async submitQuestionInclude(){
		var quizzes = []
		this.state.gradebooks.forEach(gradebook =>{
			var temp = {quiz_id:"", include:""};
			temp.quiz_id = gradebook.quiz_id
			temp.include = gradebook.include
			quizzes.push(temp)
		})
		await this.props.Auth.editIncludeQuestion(this.props.course_id, this.props.selected_lecture.id, quizzes)
		.then(result =>{
			this.setState({
				lecture_gradebooks_by_questions: result.gradebooks_by_quizzes,
				lecture_gradebooks_by_students: result.gradebooks_by_students,
				gradebooks : result.gradebooks_by_quizzes,
			})
		})
	}
	render(){
		if (this.state.isLoading){
			return <LoadingPage/>
		} else{
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
					{this.props.selected_lecture ?
					<p style={{fontWeight:"bold"}}>Sesi {this.props.selected_lecture.date.split("/")[0] + "/" + this.props.selected_lecture.date.split("/")[1]}</p>
					:
					<React.Fragment>
						<div style={{display:'flex', flexDirection:'column'}}>
							<p style={{fontWeight:'bold'}}>{this.props.course_name}</p>
							<Graph data={this.state.graphData}/>
						</div>
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
					</React.Fragment>
					}
					
				</div>
				
				<div className='selector'>
					<p>Nilai Tiap {this.state.type}</p>
					<div className='buttons'>
						<Button disableFocusRipple disableRipple className='button' style={{fontWeight:(this.state.type === this.state.type_options[0] ? '500' :'300')}} onClick={()=> this.buttonClick(this.state.type_options[0])}>Lihat Berdasarkan {this.state.type_options[0]}</Button>
						<Button disableFocusRipple disableRipple className='button' style={{fontWeight:(this.state.type === this.state.type_options[1] ? '500' :'300')}} onClick={() => this.buttonClick(this.state.type_options[1])}>Lihat Berdasarkan {this.state.type_options[1]}</Button>
					</div>
				</div>

				<div className='table'>
					<ScoreTable gradebooks={this.state.gradebooks} type={this.state.type} course_id={this.props.course_id} history={this.props.history} showButton={this.props.selected_lecture ? false: true} changeGradebooks={this.changeGradebooks} Auth={this.props.Auth} submitEdit={this.submitEdit} submitQuestionInclude={this.submitQuestionInclude}/>
				</div>

			</div>
			)
		}
	}
}

class ScoreTable extends Component{
	constructor(props){
		super(props);
		this.state={
			showSubmit: false,
			participation_reward_percentage: 0,
			showEditPercentage: false,
			lecture_id: 0
		}
		this.changeIncluded = this.changeIncluded.bind(this)
		this.toggleShowEditPercentage = this.toggleShowEditPercentage.bind(this);	
		this.handleSliderChange = this.handleSliderChange.bind(this)	
		this.submitEdit = this.submitEdit.bind(this)
		this.submitQuestionInclude = this.submitQuestionInclude.bind(this)
	}
	toggleShowEditPercentage(state, participation_reward_percentage, lecture_id){
		this.setState({
			showEditPercentage: state,
			participation_reward_percentage: participation_reward_percentage,
			lecture_id: lecture_id
		})
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
				<TableCell className='head-cell'>Nilai rata-rata(%)</TableCell>
			</React.Fragment>
		)
	}

	createHeaderByQuestion(){
		return(
			<React.Fragment>
				<TableCell className='head-cell'>No</TableCell>
				<TableCell className='head-cell'>Pertanyaan</TableCell>
				<TableCell className='head-cell'>Nilai Rata-rata(%)</TableCell>
				<TableCell className='head-cell'>Jumlah Partisipan</TableCell>
				<TableCell className='head-cell'>Masuk daftar nilai?</TableCell>
			</React.Fragment>
		)
	}
	createTableHeader(){
		if (this.props.type === "Sesi"){
			return this.createHeaderByLecture();
		}
		else if (this.props.type === "Murid"){
			return this.createHeaderByStudent();
		}
		else if (this.props.type === "Pertanyaan"){
			return this.createHeaderByQuestion();
		}
		else{
			return null
		}
	}

	toGradebookByLecture(lecture_id){
		this.props.history.push("/"+this.props.course_id+"/gradebook/"+lecture_id)
	}
	changeIncluded(event){
		var quiz_id = parseInt(event.target.value,10);
		var gradebooks = this.props.gradebooks;
		gradebooks.forEach(gradebook=>{
			if (gradebook.quiz_id === quiz_id){
				gradebook.include = !gradebook.include
			}
		})
		this.props.changeGradebooks(gradebooks)
		if (!this.state.showSubmit){
			this.setState({
				showSubmit: true
			})
		}
	}
	handleSliderChange(value){
		this.setState({participation_reward_percentage: value})
	}
	submitEdit(){
		this.props.submitEdit(this.state.participation_reward_percentage, this.state.lecture_id);
		this.toggleShowEditPercentage(false)
	}
	
	submitQuestionInclude(){
		this.props.submitQuestionInclude()
		this.setState({
			showSubmit: false,
		})
	}
	render(){
		const rows = this.createRows();
		return(
			<React.Fragment>
			<Table className='table'>
		        <TableHead style={{border:'0px'}}>
		          <TableRow className='header-row'>
					{this.createTableHeader()}
					{this.props.type === "Murid" && this.props.showButton ? 
						<React.Fragment>
							<TableCell className='head-cell'>Nilai partisipasi(%)</TableCell>
							<TableCell className='head-cell'>Nilai kebenaran(%)</TableCell>
							<TableCell className='head-cell'>Nilai rata-rata(%)</TableCell>
						</React.Fragment>
						:
						null
					}
					{this.props.type === "Murid" && !this.props.showButton ? 
						<React.Fragment>
							<TableCell className='head-cell'>Nilai partisipasi</TableCell>
							<TableCell className='head-cell'>Nilai kebenaran</TableCell>
							<TableCell className='head-cell'>Nilai rata-rata(%)</TableCell>
						</React.Fragment>
						:
						null
					}
					{this.props.showButton && this.props.type==="Sesi" ? <TableCell className='head-cell'>{""}</TableCell> : null}
		          </TableRow>
		        </TableHead>
		        {rows.length == 0 ? 
			        <p>You don't have any lectures yet</p>
			        :
			        <TableBody>
			          {rows.map(row => (
			            <TableRow className='t-row' key={row.lecture_id}>
						{this.props.type === "Sesi" &&
							<React.Fragment>
								<TableCell className='cell' onClick={this.props.type === "Sesi" ? (()=>{this.toGradebookByLecture(row.lecture_id)}) : null}>{row.date}</TableCell>
								<TableCell className='cell'>{row.attendance}</TableCell>
								<TableCell className='cell'>{row.total_average_score}</TableCell>
							</React.Fragment>
						}
						{this.props.type === "Murid" && !this.props.selected_lecture &&
							<React.Fragment>
								<TableCell className='cell'>{row.first_name}</TableCell>
								<TableCell className='cell'>{row.last_name}</TableCell>
								<TableCell className='cell'>{row.email}</TableCell>
								<TableCell className='cell'>{row.participation_average_score}</TableCell>
								<TableCell className='cell'>{row.accuracy_average_score}</TableCell>
								<TableCell className='cell'>{row.total_average_score}</TableCell>
							</React.Fragment> 
						}
						{this.props.type === "Murid" && this.props.selected_lecture &&
							<React.Fragment>
								<TableCell className='cell'>{row.first_name}</TableCell>
								<TableCell className='cell'>{row.last_name}</TableCell>
								<TableCell className='cell'>{row.email}</TableCell>
								<TableCell className='cell'>{row.attendance ? "Hadir" : "Tidak Hadir"}</TableCell>
								<TableCell className='cell'>{row.participation_average_score}</TableCell>
								<TableCell className='cell'>{row.accuracy_average_score}</TableCell>
								<TableCell className='cell'>{row.total_average_score}</TableCell>
							</React.Fragment> 
						}
						{this.props.type === "Pertanyaan" &&
							<React.Fragment>
								<TableCell className='cell'>{row.quiz_number}</TableCell>
								<TableCell className='cell'>{row.question}</TableCell>
								<TableCell className='cell'>{row.average_score}</TableCell>
								<TableCell className='cell'>{row.total_participants}</TableCell>
								<TableCell className='cell'><Checkbox value={row.quiz_id} onChange={this.changeIncluded} checked={row.include}/></TableCell>
							</React.Fragment>
						} 
						{this.props.showButton && this.props.type==="Sesi" ?
							<Popup
								trigger={<TableCell><IconButton><MoreHorizIcon/></IconButton></TableCell>}
								position="bottom left"
								on = "click"
								closeOnDocumentClick
								arrow={false}
								contentStyle={{borderRadius:'8px', boxShadow:'0px 4px 4px rgba(0,0,0,0.25)'}}
								mouseLeaveDelay={1}
								offsetY={-10}
							>
								{close => (
									<div onClick={close}>
										<Button style={{textTransform:'none', display:'flex'}} onClick={()=>this.toggleShowEditPercentage(true, row.participation_reward_percentage, row.lecture_id)}><EditIcon style={{color:"#FFE01C", marginRight:'1rem'}}/>Edit Persentase Nilai</Button>
									</div>
								)}							
							</Popup>    
						: null}
			            </TableRow>
			          ))}
			        </TableBody>
		    	}
		      </Table>
			  	<Popup 
					open={this.state.showEditPercentage}
					modal 
					closeOnDocumentClick={false}
					contentStyle={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',borderRadius: '8px'}}>
					{close => (
  						<div className='popup'>
	  						<div className= "popup-header">
	        					<h2> Setting Nilai Sesi </h2>
		    				</div>
							
							<label> Persentase Nilai </label>
							<ReactSlider onChange={this.handleSliderChange} defaultValue={this.state.participation_reward_percentage}/> 
							<div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}> 
								<p className='slider-text'> Partisipasi: {this.state.participation_reward_percentage}% </p>
								<p className='slider-text'> Benar: {100 - this.state.participation_reward_percentage}% </p>
							</div>
							<Button onClick={() => this.submitEdit()}>Submit</Button>
							<Button onClick={()=>this.toggleShowEditPercentage(false)}>Batalkan</Button>
  						</div>
  					)}
								
				</Popup>
			  {this.state.showSubmit && <div style={{display:'flex', justifyContent:'flex-end'}}><Button style={{textTransform:'none'}} onClick={this.submitQuestionInclude}>Submit</Button></div>}
			  </React.Fragment>
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