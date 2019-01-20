import React, { Component } from 'react';
import './Page.css';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {makeData} from './TableFunctions';

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
		this.state = {
      		data: makeData()
    	};
	}


	render(){
		const {data} = this.state
		return(
			<div>
				<ReactTable
					data={data}
					columns={[
						{
							Header: "Lecture Date",
							accessor: 'date'
						},
						{
							Header: "Accuracy (%)",
							accessor: 'accuracy'
						}
					]}
				/>
			</div>
		)
	}
}



export default Lectures;