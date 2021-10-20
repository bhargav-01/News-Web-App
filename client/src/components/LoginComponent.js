
import React, { useState } from 'react';
import gif from '../assets/Signin.gif'
import './login.css'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import {makeStyles,ThemeProvider,createTheme} from '@material-ui/core/styles'
import SignIn from './SignIncomponent'
import SignUp from './SignUpcomponent'

class Login extends React.Component {

    constructor(props)
    {
        super(props);
        this.state={
            haveAccount:true,
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.changeState=this.changeState.bind(this);
        // this.handleSubmitLogin=this.handleSubmitLogin.bind(this);
    }
  
    handleSubmit(firstname, lastname, email, password,username)
    {
        axios.post("http://localhost:3001/users/signup",{
            firstname: firstname,
            lastname: lastname,
            email:email,
            password:password,
            username:username,
        })
        .then(response => {
            this.saveToken(response.data.token);
            this.setState({
                haveAccount:true
            })
        })
        .catch(error => {
            console.log(error);
        });
    }

  

    changeState()
    {
        this.setState({
            haveAccount:false,
        })
    }
    

    render()
    {
        return (
            <div> 
                <div className="login-back img-fluid"></div>
                <div className="logo">
                    News.com
                </div>
                <div className="canvas">
                    {
                        !this.state.haveAccount && 
                        <div className="login ">
                            <div className="row">
                                <div className="col-12 try">
                                    <SignUp handleSubmit={(firstname, lastname, email, password,username)=>this.handleSubmit(firstname, lastname, email, password,username)}/>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        this.state.haveAccount &&
                        <div className="signIn">
                            <div className="row">
                                <div className="col-12 try">
                                    <SignIn  changeState={()=>this.changeState()}/>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                
               
            </div> 
        )
    }
}

export default Login
