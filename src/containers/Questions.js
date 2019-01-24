import React, { Component } from "react";
import "./Page.css";
import {Link}  from 'react-router-dom';
import { Button} from "react-bootstrap";
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';


class Questions extends Component{
  constructor(props){
    super(props);

    this.state = {
      questions: [{question_problem: "1+1?", my_answer: '2', correct_answer:'100'}],//this.props.user.questions,
      lectureDate: '10/2',
      history: this.props.history,
    };

    this.Auth= this.props.Auth;
    
  }
  makingQuestions(listOfQuestions){
    let numberOfQuestions =listOfQuestions.length;
    let questionsComponent = []
    if (numberOfQuestions > 0){
      for (let i=0; i<numberOfQuestions; i++){
        questionsComponent.push(<Question question_number={i+1} question={listOfQuestions[i]} history={this.state.history}/>)
      } 
    } else {
      questionsComponent.push(<p className="App-caption-text"> No questions in this lecture! </p>)
    }
    
    return questionsComponent
  }

  render(){
    return(
        <div className="App">
            <div className="App-header">
                <h2 className="App-header-text">{'Lecture'} &nbsp; {this.state.lectureDate}</h2>
            </div>
            <div className="course-card-container">
              {this.makingQuestions(this.state.questions)}

            </div>
          
          </div>    
    )

  }
}

class Question extends Component{

  constructor(props){
      super(props);
      this.state = {
        question_number: this.props.question_number,
        question_problem: this.props.question.question_problem,
        correct_answer: this.props.question.correct_answer,
        my_answer: this.props.question.my_answer,
        expanded: true,
      };  

      this.handleExpandClick = this.handleExpandClick.bind(this);
    }

    handleExpandClick(){
    this.setState({expanded: true })
    }

    render(){
    return(
      <Card className='course-card' raised='true'>
        <CardContent>
          <div className='course-card-header'> 
            <h5 className='course-card-title'> {'Question'} {this.state.question_number}</h5>
          </div>
          <p> {this.state.question_problem} </p>
          <p> My answer: {this.state.my_answer} </p>
          <p> Correct answer: {this.state.correct_answer} </p>
        </CardContent>
        <CardActions>
          <IconButton
            onClick={this.handleExpandClick}
            aria-expanded={this.expanded}
            aria-label='Show more'
          >
            <ExpandMoreIcon/>
          </IconButton>
        </CardActions>
        <Collapse in={this.expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <p> explanation </p>
          </CardContent>
        </Collapse>
       </Card>
    )
  }
}

//export default Courses;
export default withAuth(Questions);