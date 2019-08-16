import React, { Component } from 'react';
import './LoadingPage.css';
import { ClipLoader } from 'react-spinners';

class LoadingPage extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className='LoadingPage'>
				<div style={{margin:'auto'}}>
					<p> Gantungkan cita-cita mu setinggi langit! Bermimpilah setinggi langit. <br/>Jika engkau jatuh, engkau akan jatuh di antara bintang-bintang. </p>
					<br/>
					<p> Soekarno </p>
					<br/>
					<ClipLoader color={this.props.role == "faculty" ? '#ffe01c' : '#6311AB'} sizeUnit={'em'} size={5}/>
				</div>
			</div>
		)
	}
}

LoadingPage.defaultProps = {
	role: 'faculty'
}

export default LoadingPage;