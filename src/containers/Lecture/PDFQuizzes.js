import {Page, Text, View, Document, StyleSheet, PDFViewer} from '@react-pdf/renderer';
import React from "react";

export default function PDFQuizzes(props){
	return(
		<Document>
			<Page style={styles.body}>
				<View style={styles.div}>
					<Text style={[styles.text, styles.h1]} fixed>
                        {props.courseName}
                    </Text>
                    <Text style={[styles.p, styles.text]} fixed>
                        Sesi {props.lecture.date}
                    </Text>
				</View>
                <View style={styles.div, {margin:'10px 0px'}}>
                   {makeQuizzes(props.lecture.quizzes, props.show_correct_answer, props.show_my_answer)}
                </View>
			</Page>
		</Document>
	)
};
function makeQuizzes(quizzes, show_correct_answer, show_my_answer){
    var components = [];
    for (let i=0; i<quizzes.length; i++){
        components.push(<Quiz quiz={quizzes[i]} quiz_number={i+1} show_correct_answer={show_correct_answer} show_my_answer={show_my_answer} />);
    }
    if (components.length == 0){
        components.push(<View style={styles.div}>
            <Text style={[styles.p, styles.text]}>Sesi ini belum ada pertanyaan! Hubungi dosen kamu.</Text>
        </View>);
    }
    return components;
};

export class Quiz extends React.Component{
	constructor(props){
		super(props);
	}
	makeAns(){
		var answers = this.props.quiz.answers;
		let components = [];
		for (let i=0; i<answers.length; i++){
			if (i == this.props.quiz.correct_answer && this.props.show_correct_answer){
				if ( i == this.props.quiz.student_answer && this.props.show_my_answer){
					components.push(<View id={i} style={[{backgroundColor:'#82DAA4'}, styles.ans]}><Text style={[styles.p, styles.text,{fontFamily:'Helvetica-Bold'}]}>{String.fromCharCode(i+65)}. {answers[i]} </Text></View>)
				}
				else{
					components.push(<View id={i} style={[{backgroundColor:'#82DAA4'}, styles.ans]}><Text style={[styles.p, styles.text]}>{String.fromCharCode(i+65)}. {answers[i]}</Text></View>)
				}
			}
			else if (i == this.props.quiz.student_answer && this.props.show_my_answer){
				components.push(<View id={i} style={[{backgroundColor:'#82DAA4'}, styles.ans]}><Text style={[styles.p, styles.text, {fontFamily:'Helvetica-Bold'}]}>{String.fromCharCode(i+65)}. {answers[i]}</Text></View>)
			}
			else{
				components.push(<View id={i} style={styles.ans}><Text style={[styles.p, styles.text]}>{String.fromCharCode(i+65)}. {answers[i]}</Text></View>)
			}
		}
		return components;
	}
	render(){
		return(
            <View style={[styles.div],{display:'flex', flexDirection:'row', margin:'5px 0px'}}> 
				<View>
					<Text style={[styles.p, styles.text]}> {this.props.quiz_number}. </Text>
				</View>
				<View>
					<Text style={[styles.p, styles.text]}> {this.props.quiz.question} </Text>
					<View className='answers'>{this.makeAns()}</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    div:{
        margin: "2px 0px"
    },
    text:{
        margin:'1px 0px',
        fontFamily:'Helvetica'
    },
    h1:{
        fontSize: 18,
        fontFamily: 'Helvetica-Bold'
    },
    p:{
        fontSize:12
    },
    ans:{
        padding:'2px 0px',
    }
})