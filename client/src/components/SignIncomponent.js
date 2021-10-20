
import React, { useState } from 'react';
import './login.css'
import {FaUserAlt,FaLock} from 'react-icons/fa' 
import Box from '@material-ui/core/Box';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import {MdVisibility,MdVisibilityOff} from 'react-icons/md'
import Button from '@material-ui/core/Button';
import {makeStyles,ThemeProvider,createTheme} from '@material-ui/core/styles'
import { Link,FormControl,InputLabel } from '@material-ui/core';

// const history = useHistory();
const useStyles = makeStyles((theme) =>({
    input: {
        
        "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 1000px #4f4ff1  inset",
            color:'white'
          },
          color:'#ffffff',
    },
    root: {
        '& .MuiFormLabel-root': {
            color: '#d6d1fd',
            },
        color:'#ffffff',
        
    },
    button:{
        background:'white',
        margin:'20px',
        color:'blue',
    },
    button1:{
        background:'white',
        margin:'20px',
        color:'blue',
    },
    link:{
        fontWeight:'bold',
        color:'white',
        fontSize:'0.8rem',
    }
    
}));

const theme = createTheme({
    palette: {
        primary: {
            main:'#fff',
        },
        secondary: {
            main: '#fff',
        },
    },
});

function SignIn(props) {
    const classes = useStyles(); 
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const [values, setValues] = React.useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3001/users/login",{
            password:password,
            username:userName,
        })
        .then(response => {
            localStorage.setItem('token',response.data.token);
            
            history.push('/home');
        })
        .catch(error => {
            console.log(error);
        });
    };
    
    return (
        <ThemeProvider theme={theme}>
            <div className="header">
                Sign In
            </div>
            <Box
                component="form"
                onSubmit={(event)=>handleSubmit(event)}
                noValidate
                autoComplete="off">
                <Box sx={{ display: 'flex', alignItems: 'flex-end',m:'10px' }}>
                    <FaUserAlt className='loginIcon' />
                    <TextField 
                        label="User Name"
                        variant="standard"
                        color='white'
                        id="standard-basic"
                        className={classes.root}
                        inputProps={{className:classes.input}}
                        required
                        value={userName}
                        onChange={e => setUserName(e.target.value)} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end',m:'10px' }}>
                    <FaLock className='loginIcon'/>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password" 
                            className={classes.root}
                            inputProps={{className:classes.input}}>Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={password}
                            label="Password"
                            className={classes.root}
                            inputProps={{className:classes.input}}
                            onChange={e => setPassword(e.target.value)}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                >
                                {values.showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                </IconButton>
                                </InputAdornment>
                                }
                            />
                    </FormControl>
                </Box>
                <div style={{margin:'20px'}}>
                    <Button variant="contained" className={classes.button} href='/home'>
                        Cancel
                    </Button>
                    <Button type="submit"  variant="contained" color='secondary'>
                        Signup
                    </Button>
                </div>
                <div style={{fontSize:'0.8rem'}}> 
                    Don't have an account?   
                    <Link
                        className={classes.link}
                        component="button"
                        variant="body2"
                        onClick={() => {
                            props.changeState()
                        }}
                        >
                        {' Sign up'}
                    </Link>
                </div>
            </Box>
      </ThemeProvider>
    )
}

export default SignIn
