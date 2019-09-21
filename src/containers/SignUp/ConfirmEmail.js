import React from 'react';
import Logo from '../Logo/Logo';
import './ConfirmEmail.css';
import { Button } from '@material-ui/core';

class ConfirmEmail extends React.Component{
    constructor(props){
        super(props);
        this.toLogin = this.toLogin.bind(this);
    }
    async componentDidMount(){
        this.props.isNavVisible(false);
        window.scrollTo(0, 0);
    }
    
    toLogin(){
        this.props.history.push("/login");
    }

    render(){
        return(
            <div className='container confirmEmail'>
                <Logo size='logo' color='black' background='trans' padding={false} style={{width:'6rem'}}/>
                <div className='container'>
                    <div className='text'>
                        <h1>Konfirmasi Email Anda</h1>
                        <p>Silahkan periksa indox anda untuk konfirmasi email. Tekan link yang ada dalam email tersebut untuk mengonfirmasi alamat email anda.</p>
                        <br/>
                        <p>Setelah anda mengkonfirmasi, tekan Lanjutkan</p>
                    </div>  
                    <div className='buttons row'>
                        <div className='col-md-3'>
                            <Button className='button' onClick={this.toLogin}>Lanjutkan</Button>
                        </div>
                        <div className='col-md-9'>
                            <Button className='button transparent'>Mengirimkan ulang konfirmasi email</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ConfirmEmail;