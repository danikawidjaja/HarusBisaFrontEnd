import React, { Component } from 'react';

class Timer extends Component{
	constructor(props){
		super(props);
		this.state={
			duration : this.props.duration,
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

	render(){
		return(
			<div>
				<p>{this.display()}</p>
			</div>
		)
	}
}

export default Timer;