import React, { Component } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';
import './Timer.css';

class Timer extends Component{
	constructor(props){
		super(props);
		this.state={
			duration : this.props.duration,
			adjust: this.props.adjust,
		}
		this.adjustDurationUp = this.adjustDurationUp.bind(this)
		this.adjustDurationDown = this.adjustDurationDown.bind(this)
	}

	async componentDidUpdate(oldProps){
		if (oldProps.duration !== this.props.duration){
			this.setState({
				duration: this.props.duration
			})
		}

	}
	display(){
		var duration = this.state.duration;
		var min = 0
		var sec = 0

		if (duration < 60){
			sec = duration
		}
		else{
			min = Math.floor(duration/60)
			sec = duration - (min*60)
		}

		if (min < 10){
			min = '0'+ min.toString()
		}
		if (sec < 10){
			sec = '0' + sec.toString()
		}

		return min + ":" + sec	
	}

	async adjustDurationUp(){
		await this.setState(prevState =>{
			return{
				duration: prevState.duration + 10
			}
		})
		this.props.changeSecondsRemaining(this.state.duration)	
	}

	async adjustDurationDown(){
		if (this.state.duration>=10){
			await this.setState(prevState =>{
				return{
					duration: prevState.duration-10
				}
			})
		}
		else{
			await this.setState({
				duration: 0
			})
		}
		this.props.changeSecondsRemaining(this.state.duration)
	}
	timerInput(){
		if (this.state.adjust){
			return(
				<div className='adjust'>
					<IconButton className='icon' id='up' onClick={this.adjustDurationUp}><ExpandLessIcon/></IconButton>
					<IconButton className='icon' id='down' onClick={this.adjustDurationDown}><ExpandMoreIcon/></IconButton>
				</div>
			)
		}
		else{
			return null
		}
	}

	render(){
		return(
			<div className={this.state.adjust? 'Timer-adjust' : 'Timer'}>
				<p>{this.display()}</p>
				{this.timerInput()}
			</div>
		)
	}
}

Timer.defaultProps ={
	adjust: false,
	duration:60
}

export default Timer;