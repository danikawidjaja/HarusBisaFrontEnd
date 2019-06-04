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


class Gradebook extends Component{
	constructor(props){
		super(props);
	}

	async componentDidMount(){
  		this.props.isNavVisible(false);
    	window.scrollTo(0, 0);
    	var course_id = this.props.match.params.course_id;
    }
	render(){
		return(
			<div className='Dashboard'>
			    {/*<DashboardNavigation course_option={true} selected_course={this.state.selected_course} courses={this.state.courses} profile={this.state.profile} Auth={this.props.Auth} userHasAuthenticated={this.props.userHasAuthenticated} history={this.props.history} changeSelectedCourse={this.changeSelectedCourse}/>*/}
			    <div className='Gradebook'>
			    	<h1> Gradebook </h1>
			    </div>
			</div>
		)
	}
}

export default Gradebook;