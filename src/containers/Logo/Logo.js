import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Logo.css'
import full_black_white_padding_1 from './PNG/Harus_Bisa-01-Full-Blk-Wht-WPad_1.png'; //
import full_black_white_padding_2 from './PNG/Harus_Bisa-01-Full-Blk-Wht-WPad_2.png'; //
import full_white_black_padding_1 from './PNG/Harus_Bisa-02-Full-Wht-Blk-WPad_1.png'; //
import full_white_black_padding_2 from './PNG/Harus_Bisa-02-Full-Wht-Blk-WPad_2.png'; //
import full_black_trans_padding_1 from './PNG/Harus_Bisa-03-Full-Blk-Trans-WPad_1.png';//
import full_black_trans_padding_2 from './PNG/Harus_Bisa-03-Full-Blk-Trans-WPad_2.png';//
import full_white_trans_padding_1 from './PNG/Harus_Bisa-04-Full-Wht-Trans-WPad_1.png';//
import full_white_trans_padding_2 from './PNG/Harus_Bisa-04-Full-Wht-Trans-WPad_2.png';//

import full_black_white_nopadding_1 from './PNG/Harus_Bisa-05-Full-Blk-Wht-NoPad_1.png';//
import full_black_white_nopadding_2 from './PNG/Harus_Bisa-05-Full-Blk-Wht-NoPad_2.png';//
import full_white_black_nopadding_1 from './PNG/Harus_Bisa-06-Full-Wht-Blk-NoPad_1.png';//
import full_white_black_nopadding_2 from './PNG/Harus_Bisa-06-Full-Wht-Blk-NoPad_2.png';//
import full_black_trans_nopadding_1 from './PNG/Harus_Bisa-07-Full-Blk-Trans-NoPad_1.png';//
import full_black_trans_nopadding_2 from './PNG/Harus_Bisa-07-Full-Blk-Trans-NoPad_2.png';//
import full_white_trans_nopadding_1 from './PNG/Harus_Bisa-08-Full-Wht-Trans-NoPad_1.png';//
import full_white_trans_nopadding_2 from './PNG/Harus_Bisa-08-Full-Wht-Trans-NoPad_2.png';//

import logo_black_white_padding from './PNG/Harus_Bisa-09-Logo-Blk-Wht-WPad.png';
import logo_white_black_padding from './PNG/Harus_Bisa-10-Logo-Wht-Blk-WPad.png';
import logo_black_trans_padding from './PNG/Harus_Bisa-11-Logo-Blk-Trans-WPad.png';
import logo_white_trans_padding from './PNG/Harus_Bisa-12-Logo-Wht-Trans-WPad.png';
import logo_black_white_nopadding from './PNG/Harus_Bisa-13-Logo-Blk-Wht-NoPad.png';
import logo_white_black_nopadding from './PNG/Harus_Bisa-14-Logo-Wht-Blk-NoPad.png';
import logo_black_trans_nopadding from './PNG/Harus_Bisa-15-Logo-Blk-Trans-NoPad.png';
import logo_white_trans_nopadding from './PNG/Harus_Bisa-16-Logo-Wht-Trans-NoPad.png';
//Image format: size-color-background-padding

class Logo extends Component{
	constructor(props){
		super(props); 
		this.state = {
			hover: false,
		}

		this.handleHover = this.handleHover.bind(this);
	}

	handleHover(){
		console.log('im at handle hover')
		this.setState(prevState => {
			return{
				hover: !prevState.hover,
			}
		});
	}

	render(){
		if (this.props.size == 'full'){
			if (this.props.color == 'black'){
				if (this.props.background == 'white'){
					if (this.props.padding){
						return(<Link to="/"><div onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} className='full' style={this.props.style}><img className={this.state.hover ? 'on-hover' : 'hvr-bob'} src={full_black_white_padding_1}/><img src={full_black_white_padding_2}/></div></Link>)
					}
					else{
						return(<Link to="/"><div onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} className='full' style={this.props.style}><img className={this.state.hover ? 'on-hover' : 'hvr-bob'} src={full_black_white_nopadding_1}/><img src={full_black_white_nopadding_2}/></div></Link>)
					}
				}
				else if (this.props.background == 'trans'){
					if (this.props.padding){
						return(<Link to="/"><div onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} className='full' style={this.props.style}><img className={this.state.hover ? 'on-hover' : 'hvr-bob'} src={full_black_trans_padding_1}/><img src={full_black_trans_padding_2}/></div></Link>)
					}
					else{
						return(<Link to="/"><div onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} className='full' style={this.props.style}><img className={this.state.hover ? 'on-hover' : 'hvr-bob'} src={full_black_trans_nopadding_1}/><img src={full_black_trans_nopadding_2}/></div></Link>)
					}
				}
				else{
					console.log('invalid. check your props')
					return null;
				}
			}
			else if (this.props.color == 'white'){
				if (this.props.background == 'black'){
					if (this.props.padding){
						return( <Link to="/"><div onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} className='full' style={this.props.style}><img className={this.state.hover ? 'on-hover' : 'hvr-bob'} src={full_white_black_padding_1}/><img src={full_white_black_padding_2}/></div></Link>)
					}
					else{
						return(<Link to="/"><div onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} className='full' style={this.props.style}><img className={this.state.hover ? 'on-hover' : 'hvr-bob'} src={full_white_black_nopadding_1}/><img src={full_white_black_nopadding_2}/></div></Link>)
					}

				}
				else if (this.props.background == 'trans'){
					if (this.props.padding){
						return(<Link to="/"><div onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} className='full' style={this.props.style}><img className={this.state.hover ? 'on-hover' : 'hvr-bob'} src={full_white_trans_padding_1}/><img src={full_white_trans_padding_2}/></div></Link>)
					}
					else{
						return(<Link to="/"><div onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} className='full' style={this.props.style}><img className={this.state.hover ? 'on-hover' : 'hvr-bob'} src={full_white_trans_nopadding_1}/><img src={full_white_trans_nopadding_2}/></div></Link>)
					}
				}
				else{
					console.log('invalid. check your props')
				}
			}
			else{
				console.log('invalid. check your props')
				return null;
			}

		}
		else if (this.props.size == 'logo'){
			if (this.props.color == 'black'){
				if (this.props.background == 'white'){
					if (this.props.padding){
						return(<Link to="/"><img className='hvr-bob' style={this.props.style} src={logo_black_white_padding}/></Link>)
					}
					else{
						return(<Link to="/"><img className='hvr-bob' style={this.props.style} src={logo_black_white_nopadding}/></Link>)
					}
				}
				else if (this.props.background == 'trans'){
					if (this.props.padding){
						return(<Link to="/"><img className='hvr-bob' style={this.props.style} src={logo_black_trans_padding}/></Link>)
					}
					else{
						return(<Link to="/"><img className='hvr-bob' style={this.props.style} src={logo_black_trans_nopadding}/></Link>)
					}
				}
				else{
					console.log('invalid. check your props')
					return null;
				}
			}
			else if (this.props.color == 'white'){
				if (this.props.background == 'black'){
					if (this.props.padding){
						return(<Link to="/"><img className='hvr-bob' style={this.props.style} src={logo_white_black_padding}/></Link>)
					}
					else{
						return(<Link to="/"><img className='hvr-bob' style={this.props.style} src={logo_white_black_nopadding}/></Link>)
					}

				}
				else if (this.props.background == 'trans'){
					if (this.props.padding){
						return(<Link to="/"><img className='hvr-bob' style={this.props.style} src={logo_white_trans_padding}/></Link>)
					}
					else{
						return(<Link to="/"><img className='hvr-bob' style={this.props.style} src={logo_white_trans_nopadding}/></Link>)
					}
				}
				else{
					console.log('invalid. check your props')
				}
			}
			else{
				console.log('invalid. check your props')
				return null;
			}

		}
		else{
			console.log('invalid. check your props')
			return null;
		}
	}
}

export default Logo
