import React, { Component } from 'react';
import './Dashboard.css';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import PlayArrow from '@material-ui/icons/PlayArrow';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { OverrideMaterialUICss } from "override-material-ui-css";
import Fab from '@material-ui/core/Fab';


class Dashboard extends Component{
	constructor(props){
		super(props);
	}

	async componentWillMount(){
    	this.props.isNavVisible(false);
  	}
	render(){
		return(
    		<div className='Dashboard'>
    			<div className='left'>
    				<DashboardLeft/>
    			</div>
    			<div className='right'>
    				<DashboardRight/>
    			</div>
    		</div>
		)
	}
}

class DashboardLeft extends Component{
	render(){
		return(
			<div>
				<Button className='button'> Kelas 2/3 </Button>
				<Button className='button'> Kelas 2/7 </Button>
				<Button className='button'> Kelas 2/3 </Button>
				<Button className='addButton'> + Add Class </Button>
			</div>
		)
	}
}

class DashboardRight extends Component{
	render(){
		return(
			<div>
				<div className='navigation'>
					<div>
						<IconButton to='/courses'>
							<KeyboardArrowLeft/>
						</IconButton>
						<Link to='/courses'> Mata Kuliah </Link>
					</div>
					<div>
						<p> other icons </p>
					</div>

    			</div>
    			<div className='content'>
    				<OverrideMaterialUICss>
    				<Card className='live-card'>
    						<div className='card-content'>
    							<div style={{marginTop:'1vw'}}>
    								<p> Biologi Molekuler Kelas A </p>
    								<p> Kelas 2/7 </p>
    							</div>
    							<div style={{marginLeft:'2vw', display:'flex', flexDirection:'row'}}>
	    							<div className='interactive'>
	    								<OverrideMaterialUICss> 
	    									<Fab className='fab'>
	    										<OverrideMaterialUICss>
	    										<PlayArrow style={{color:'white'}}/>
	    										</OverrideMaterialUICss>
	    									</Fab> 
	    								</OverrideMaterialUICss>
	    								<p> Mulai Kelas </p>
	    							</div>
	    							<div className='interactive'>	    								
	    								<Fab className='fab'>
									    	<OverrideMaterialUICss> <AddIcon style={{color:'white'}}/> </OverrideMaterialUICss>
									    </Fab>
									    <p> Tambah Pertanyaan </p>
	    							</div>
	    						</div>
    						</div>
    				</Card>
    				</OverrideMaterialUICss>
    			</div>
			</div>
		)
	}
}
export default Dashboard;