import React from "react";

class Error extends React.Component{
    render(){
        return(
            <div>
                <h1>Error</h1>
                <p>{this.props.msg}</p>
            </div>
        )
    }
}

export default Error;