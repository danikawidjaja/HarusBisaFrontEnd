import React, { Component } from 'react';
import './Page.css';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import withAuth from './withAuth';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popup from 'reactjs-popup';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  		root:{
  			backgroundColor: pink,
  			color: blue,
  		}
  	};

class Course extends Component{

	constructor(props){
	    super(props);
	    this.state = {
	      course_code: this.props.course.course_code,
	      course_name: this.props.course.course_name,
	      join_code: this.props.course.join_code,
	      instructors: this.props.course.instructors,
	    };  

	    this.handleClick = this.handleClick.bind(this);
  	}

  	handleClick(){
  		this.props.history.push('/lectures');
  	}

  	renderInstructor(instructors){
  		if (instructors.length > 0){
  			let sentence = 'Instructors: '
  			for (let i=0; i<instructors.length-1; i++){
  				sentence = sentence + instructors[i] + ', '
  			}
  			sentence = sentence + instructors[instructors.length -1];
  			return sentence
  		}
  		else{
  			return 'instructors missing';
  		}
  	}
  	render(){
  		const {classes} = this.props;
		return(
			<Card classes={{root: classes.root}} raised='true'>
				<CardContent>
					<div className='course-card-header'> 
						<h5 className='course-card-title'> {this.state.course_code} </h5>
						<IconButton>
							<Popup
								trigger={<MoreVertIcon />}
								position="bottom right"
								on = "click"
							>
								<Popup
									trigger = {<p> Delete course </p>}
									modal
								>
									<p className='app-caption-text'> Are you sure? </p>
									
								</Popup>
							</Popup>
				            
				        </IconButton>	
					</div>
					<p> {this.state.course_name} </p>
					<p> Join code: {this.state.join_code} </p>
					<p> {this.renderInstructor(this.state.instructors)} </p>
				</CardContent>
				<CardActions>
					<Button className='button' onClick={this.handleClick}> Enter course </Button>
				</CardActions>
			 </Card>
		)
	}
}

export default withStyles(styles)(Course)