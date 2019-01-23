import React, { Component } from 'react';
import './Page.css';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactTable from 'react-table';
import 'react-table/react-table.css';

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
      		data: [{date: '10/1', acc: 100}, {date:'9/2', acc:50}, {date:'10/2', acc:90}],
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
							accessor: 'date',
							headerClassName: 'lectures-table-header'
						},
						{
							Header: "Accuracy (%)",
							accessor: 'acc',
							headerClassName: 'lectures-table-header'
						}
					]}
					defaultPageSize = {this.state.data.length > 10 ?  10: this.state.data.length}
					showPageSizeOptions = {false}
				/>
			</div>
		)
	}
}



export default Lectures;