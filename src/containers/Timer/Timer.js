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

	timerInput(){
		if (this.state.adjust){
			return(
				<div className='adjust'>
					<IconButton className='icon'><ExpandLessIcon/></IconButton>
					<IconButton className='icon'><ExpandMoreIcon/></IconButton>
				</div>
			)
		}
		else{
			return null
		}
	}

	render(){
		return(
			<div className='Timer'>
				<p>{this.display()}</p>
				{this.timerInput()}
			</div>
		)
	}
}

Timer.defaultProps ={
	adjust: false,
}

export default Timer;