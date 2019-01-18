import React, { Component } from 'react';
import './Page.css';
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import withAuth from './withAuth';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';


class Courses extends Component{
	render(){
		const data = this.props.user.then(function(result){
			return result
		});

		return(
    		<div className="App">
		        <div className="App-header">
		            <h2 className="App-header-text">Courses {this.props.user.email}</h2>
		        </div>
		        <div className="class-card-container">
			        <Course history={this.props.history}/>
			        <Course history={this.props.history}/>
				    <Fab color='primary' aria-label='Add' /*component={Link} to="/"*/>
				    	<AddIcon/>
				    </Fab>
			    </div>    
		         

        	</div>
		)

	}
}

class Course extends Component{

	constructor(props){
	    super(props);
	    this.state = {
	      course_code:'BME 352',
	      course_name:'BME 352 Engineering Biomaterials',
	      course_id:'886958',
	      teacher:'Laura Suggs'
	    };  

	    this.handleClick = this.handleClick.bind(this);
  	}

  	handleClick(){
  		this.props.history.push('/lectures');
  	}


  	render(){
		return(
			<Card className='class-card' raised='true'>
				<CardContent>
					<h5> {this.state.course_code} </h5>
					<p> {this.state.course_name} </p>
					<p> Join code: {this.state.course_id} </p>
					<p> Professor: {this.state.teacher} </p>
				</CardContent>
				<CardActions>
					<Button className='button' onClick={this.handleClick}> Enter course </Button>
				</CardActions>
			 </Card>
		)
	}
}

//export default Courses;
export default withAuth(Courses);