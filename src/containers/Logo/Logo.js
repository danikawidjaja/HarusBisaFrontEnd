import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import './Logo.css'
import full_black_white_padding from './PNG/Harus_Bisa-01-Full-Blk-Wht-WPad.png'; //
import full_white_black_padding from './PNG/Harus_Bisa-02-Full-Wht-Blk-WPad.png'; //
import full_black_trans_padding from './PNG/Harus_Bisa-03-Full-Blk-Trans-WPad.png';//
import full_white_trans_padding from './PNG/Harus_Bisa-04-Full-Wht-Trans-WPad.png';//
import full_black_white_nopadding from './PNG/Harus_Bisa-05-Full-Blk-Wht-NoPad.png';//
import full_white_black_nopadding from './PNG/Harus_Bisa-06-Full-Wht-Blk-NoPad.png';//
import full_black_trans_nopadding from './PNG/Harus_Bisa-07-Full-Blk-Trans-NoPad.png';//
import full_white_trans_nopadding from './PNG/Harus_Bisa-08-Full-Wht-Trans-NoPad.png';//
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
	}
	render(){
		if (this.props.size == 'full'){
			if (this.props.color == 'black'){
				if (this.props.background == 'white'){
					if (this.props.padding){
						return(<Link to="/"><img style={this.props.style} src={full_black_white_padding}/></Link>)
					}
					else{
						return(<Link to="/"><img style={this.props.style} src={full_black_white_nopadding}/></Link>)
					}
				}
				else if (this.props.background == 'trans'){
					if (this.props.padding){
						return(<Link to="/"><img style={this.props.style} src={full_black_trans_padding}/></Link>)
					}
					else{
						return(<Link to="/"><img style={this.props.style} src={full_black_trans_nopadding}/></Link>)
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
						return(<Link to="/"><img style={this.props.style} src={full_white_black_padding}/></Link>)
					}
					else{
						return(<Link to="/"><img style={this.props.style} src={full_white_black_nopadding}/></Link>)
					}

				}
				else if (this.props.background == 'trans'){
					if (this.props.padding){
						return(<Link to="/"><img style={this.props.style} src={full_white_trans_padding}/></Link>)
					}
					else{
						return(<Link to="/"><img style={this.props.style} src={full_white_trans_nopadding}/></Link>)
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
						return(<Link to="/"><img style={this.props.style} src={logo_black_white_padding}/></Link>)
					}
					else{
						return(<Link to="/"><img style={this.props.style} src={logo_black_white_nopadding}/></Link>)
					}
				}
				else if (this.props.background == 'trans'){
					if (this.props.padding){
						return(<Link to="/"><img style={this.props.style} src={logo_black_trans_padding}/></Link>)
					}
					else{
						return(<Link to="/"><img style={this.props.style} src={logo_black_trans_nopadding}/></Link>)
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
						return(<Link to="/"><img style={this.props.style} src={logo_white_black_padding}/></Link>)
					}
					else{
						return(<Link to="/"><img style={this.props.style} src={logo_white_black_nopadding}/></Link>)
					}

				}
				else if (this.props.background == 'trans'){
					if (this.props.padding){
						return(<Link to="/"><img style={this.props.style} src={logo_white_trans_padding}/></Link>)
					}
					else{
						return(<Link to="/"><img style={this.props.style} src={logo_white_trans_nopadding}/></Link>)
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
