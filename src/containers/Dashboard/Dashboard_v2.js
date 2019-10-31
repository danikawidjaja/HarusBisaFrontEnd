import React from "react";
import './Dashboard.css';
import Logo from "../Logo/Logo";

class Dashboard extends React.Component{
    componentDidMount(){
        this.props.isNavVisible(false);
    	window.scrollTo(0, 0);
    	window.removeEventListener('scroll', this.props.handleScroll);
    }
    render(){
        return(
            <div className="Dashboard">
                <div>
                <DashboardNavbar />
                </div>
                <div style={{display:'flex',marginTop:'8vh' }}>
                    <div style={{minWidth:'16.67vw'}}>
                        <DashboardSidebar/>
                    </div>
                    <div style={{minWidth:'83.33vw'}}>
                        <DashboardContent/>
                    </div>
                </div>
            </div>
        )
    }
}

function DashboardNavbar(props){
    return(
        <div className='navigation' style={{height:'8vh', background:'#f4f4f4', position:'fixed', display:'block'}}>
            <div className='row justify-content-between'>
                <div className='col-2'>
                    <Logo color='black' size='full' background='trans' padding={false} style={{marginTop:"0.25rem", height:'1.75rem'}}/>
                </div>
                <div className='col'>
                    A
                </div>
            </div>
        </div>
    )
}

class DashboardSidebar extends React.Component{
    render(){
        return(
            <div style={{background:'#f4f4f4'}}>Sidebar</div>
        )
    }
}

class DashboardContent extends React.Component{
    render(){
        return(
            <div>Content</div>
        )
    }
}

export default Dashboard;