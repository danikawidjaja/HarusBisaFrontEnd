import React, { Component } from 'react';
import './LoadingPage.css';
import { ClipLoader } from 'react-spinners';

class LoadingPage extends Component{
	render(){
		return(
			<div className='LoadingPage'>
				<div style={{margin:'auto'}}>
					<p> Gantungkan cita-cita mu setinggi langit! Bermimpilah setinggi langit. <br/>Jika engkau jatuh, engkau akan jatuh di antara bintang-bintang. </p>
					<br/>
					<p> Soekarno </p>
					<br/>
					<ClipLoader color={'#ffe01c'} sizeUnit={'em'} size={5}/>
				</div>
			</div>
		)
	}
}

export default LoadingPage;