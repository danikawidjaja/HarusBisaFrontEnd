import React from "react";
import './Dashboard.css';
import Logo from "../Logo/Logo";
import { Button, Card, CardContent, Collapse } from "@material-ui/core";

var data = {
    "lectures":[{"date":"1/9/2019", "quizzes":[{"question":"How are you?"}, {"question":"How are you?"},{"question":"How are you?"}]},{"date":"10/9/2019"}]
}
class Dashboard extends React.Component{
    componentDidMount(){
        this.props.isNavVisible(false);
    	window.scrollTo(0, 0);
    	window.removeEventListener('scroll', this.props.handleScroll);
    }
    render(){
        return(
            <div style={{position:'fixed', width:"100%", height:'100%'}}>
                <DashboardNavbar />
                <div style={{display:'flex', flexDirection:'row'}}>
                    <div className="col-2" style={{margin:0, padding:0, position:'relative', left:0}}>
                        <DashboardSidebar lectures={data.lectures}/>    
                    </div>
                    <div className='col' style={{margin:0, padding:0}}>
                        <DashboardContent selectedLecture={data.lectures[0]}/>
                    </div>
                </div>
            </div>
        )
    }
}

function DashboardNavbar(props){
    return(
        <div style={{background:'#f4f4f4', position:'relative', background:'#f4f4f4', top:0, padding:'0.5rem'}}>
            <div className='row justify-content-between'>
                <div className='col-2'>
                    <Logo color='black' size='full' background='trans' padding={false} style={{maxHeight:'100%', maxWidth:'100%'}}/>
                </div>
                <div className='col'>
                    A
                </div>
            </div>
        </div>
    )
}

class DashboardSidebar extends React.Component{
    constructor(props){
        super(props)
    }
    renderButtons(){
        var buttons = []
        this.props.lectures.forEach(lecture => {
            buttons.push(<SidebarButton lectureDate={lecture.date}/>)
        });
        return buttons
    }
    render(){
        return(
            <div style={{background:'#f4f4f4', minHeight:'100vh'}}>
                {this.renderButtons()}
            </div>
        )
    }
}

function SidebarButton(props){
    return(
        <Button fullWidth>Sesi {props.lectureDate}</Button>
    )
}

class DashboardContent extends React.Component{
    constructor(props){
        super(props);
    }
    makeQuizzes(){
        var quizzesComponent=[]
        var quizzes = this.props.selectedLecture.quizzes

        for (var i=0 ; i<quizzes.length ; i++){
            var quiz = quizzes[i]
            quiz.number = i+1
            quizzesComponent.push(<QuizCard quiz={quiz}/>)
        }

        return quizzesComponent

    }
    render(){
        return(
            <div className="container" style={{display:'flex', flexDirection:'column', overflow:"auto", maxHeight:'91vh', padding:'1rem 2rem'}}>
                <div>
                    <h2>Sesi {this.props.selectedLecture.date}</h2>
                </div>
                <DashboardOptions/>
                <div style={{margin:"1rem 0rem"}}>
                    {this.makeQuizzes()}
                </div>
            </div>
        )
    }
}

function QuizCard(props){
    return(
        <Card style={{margin:'1rem 0rem'}}>
            <CardContent>
                <div className="row">
                    <div className="col-1">
                        <p>{props.quiz.number}.</p>
                    </div>
                    <div className="col">
                        <p>{props.quiz.question}</p>
                    </div>
                </div>
            </CardContent>
            
        </Card>
    )
}
function DashboardOptions(props){
    return(
        <div className="row">
            <div className="col-3"><Button fullWidth style={{padding:'1rem 0.5rem', background:'#f4f4f4'}}>Mulai sesi</Button></div>
            <div className="col-3"><Button fullWidth style={{padding:'1rem 0.5rem', background:'#f4f4f4'}}>Tambah Pertanyaan</Button></div>
            <div className="col-3"><Button fullWidth style={{padding:'1rem 0.5rem', background:'#f4f4f4'}}>Statistik Sesi</Button></div>
            <div className="col-3"><Button fullWidth style={{padding:'1rem 0.5rem', background:'#f4f4f4'}}>Setting Sesi</Button></div>
        </div>
    )
}

export default Dashboard;