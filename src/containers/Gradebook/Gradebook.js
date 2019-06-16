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
import { Button } from '@material-ui/core';


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
						<WarningMessage toggleDisplayScore={this.toggleDisplayScore}/>
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

class ScorePage extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className='content'>
				<div className='header'>
					<h1>Daftar Nilai</h1>
					<div>Search Box</div>
				</div>
				
				<div className='information'>
					<div>Graph</div>
					<div className='statistics'>
						<div className='statistics-box'>Jumlah murid terdaftar</div>
						<div className='statistics-box'>Rata-rata kelas</div>
					</div>
				</div>
				
				<div className='selector'>
					<p>Nilai Tiap Sesi</p>
					<div>Button to toggle and change</div>
				</div>

				<div className='table'>
					actual scores
				</div>

			</div>
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
				<Button>Kembali</Button>
				<Button onClick={this.props.toggleDisplayScore}>Lanjutkan</Button>
			</div>
		)
	}
}
export default Gradebook;