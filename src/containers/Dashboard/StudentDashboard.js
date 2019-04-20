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
				email: "" 
			},
			selected_course:null,
			selected_lecture:null,
			isLoading: true,
			changingSelectedCourse: false,
		};
		this.changeSelectedCourse = this.changeSelectedCourse.bind(this);
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
  			console.log(res)
      		await this.setState({
      			courses: res.data.courses,
      			selected_course: this.findSelectedCourse(id, res.data.courses),
      			profile:{
      				first_name : res.data.first_name,
      				last_name : res.data.last_name,
      				email: res.data.email,
      				role: res.data.role,
      				school: res.data.school
      			},
      		}, () =>
      		this.props.Auth.getLectures(this.state.selected_course._id)
	      	.then(res =>{
	      		this.setState({
	      			lectures: res.data.lectures,
	      			selected_lecture: res.data.lectures[0],
	      			isLoading: false,
	      		})
	      	})	
	      )
      	})
      	.catch(err =>{
        	console.log(err.message)
      	}) 	
  	}
	render(){
		if (this.props.Auth.loggedIn()){
			if (!this.state.isLoading){
				return(
		    		<div className='Dashboard'>
		    			<DashboardNavigation selected_course={this.state.selected_course} courses={this.state.courses} profile={this.state.profile} Auth={this.props.Auth} userHasAuthenticated={this.props.userHasAuthenticated} history={this.props.history} changeSelectedCourse={this.changeSelectedCourse}/>
		    			<div className='StudentDashboard'>
		    				<h1> {this.state.selected_course.course_name} </h1>
		    				<p> Sesi yang telah berlangsung </p>
		    				<LectureTable lectures={this.state.lectures}/>
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
					<LoadingPage/>
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

class LectureTable extends Component{
	constructor(props){
		super(props);
		console.log(props)
	}

	createData(id, date, attendance, raw_score, accuracy_score, participation_score, total_score) {
  		return { id, date, attendance, raw_score, accuracy_score, participation_score, total_score };
	}
	createRows(){
		let rows = [];
		for (let i=0; i<this.props.lectures.length; i++){
			let lecture_date = this.props.lectures[i].date.split('/');
			let date = 'Sesi ' + lecture_date[0] + '/' + lecture_date[1];
			rows.push(this.createData(i,date,'Hadir',10,90,100,90))
		}
		return rows;
	}
	render(){
		const rows = this.createRows();
		return(
			<Table className='table'>
        <TableHead style={{border:'0px'}}>
          <TableRow style={{boxShadow:'none', border:'0px'}}>
            <TableCell className='header'>Sesi</TableCell>
            <TableCell className='header' >Kehadiran</TableCell>
            <TableCell className='header' >Nilai Mentah</TableCell>
            <TableCell className='header' >% Nilai Benar</TableCell>
            <TableCell className='header' >% Nilai Partisipasi</TableCell>
            <TableCell className='header' >% Nilai Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
          	//<div className='row'>
            <TableRow key={row.id} style={{boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)'}}>
              <TableCell className='cell' component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell className='cell' >{row.attendance}</TableCell>
              <TableCell className='cell' >{row.raw_score}</TableCell>
              <TableCell className='cell' >{row.accuracy_score}</TableCell>
              <TableCell className='cell' >{row.participation_score}</TableCell>
              <TableCell className='cell' >{row.total_score}</TableCell>
            </TableRow>
            //</div>
          ))}
        </TableBody>
      </Table>
		)
	}
}

export default StudentDashboard;