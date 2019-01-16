import React, { Component } from 'react';
import './Page.css';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class Lectures extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
    		<div className="App">
		        <div className="App-header">
		            <h2 className="App-header-text">Lectures</h2>
		        </div>

		        <div>
		        	<LectureTable/>
			    </div>    
        	</div>
		)
	}
}

let id = 0;
class LectureTable extends Component{
	constructor(props){
		super(props);
		this.state={
			data : [
				this.createData('1/16', 20),
				this.createData('1/18', 40),
				this.createData('1/20', 100)
			],
			id:0,
		}
	}

	createData(date, accuracy){
		id = id+1;
		return {id, date, accuracy};
	}

	render(){
		return(
			<Paper>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell> Lecture Date </TableCell>
							<TableCell> Accuracy (%) </TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{this.state.data.map( data => (
							<TableRow key={this.state.data.id}>
								<TableCell component="th" scope="row"> {this.state.data.date}</TableCell>
								<TableCell> {this.state.data.accuracy} </TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Paper>
			
		)
	}
}



export default Lectures;