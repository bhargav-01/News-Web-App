
import React, { useState } from 'react';
import gif from '../assets/Signin.gif'
import './login.css'
import {FaUserAlt,FaLock} from 'react-icons/fa' 
import {GrMail} from 'react-icons/gr'
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import {MdVisibility,MdVisibilityOff} from 'react-icons/md'
import {Button,FormControl,InputLabel} from '@material-ui/core';
import {makeStyles,ThemeProvider,createTheme} from '@material-ui/core/styles'

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
function SignUp(props) {
    const classes = useStyles(); 
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
    const handleSubmit = (event)  => {
        // event.preventDefault();
        // alert("hello"+firstName)
        console.log("hello"+firstName);
        props.handleSubmit(firstName, lastName, email, password,userName);
    };

    
    return (
        <ThemeProvider theme={theme}>
            <div className="header">
                Sign Up
            </div> 
            <Box
                component="form"
                sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
                }}
                onSubmit={(event)=>handleSubmit(event)}
                noValidate
                autoComplete="off">
            {/* <form  onSubmit={handleSubmit}> */}
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
                    <FaUserAlt className='loginIcon' />
                    <TextField 
                        label="First Name"
                        variant="standard"
                        className={classes.root}
                        inputProps={{className:classes.input}}
                        required
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end',m:'10px' }}>
                    <FaUserAlt className='loginIcon' />
                    <TextField
                        label="Last Name"
                        variant="standard"
                        className={classes.root}
                        inputProps={{className:classes.input}}
                        required
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}/>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end',m:'10px' }}>
                    <GrMail className='loginIcon' />
                    <TextField 
                        label="Email"
                        variant="standard"
                        id="standard-basic"
                        className={classes.root}
                        inputProps={{className:classes.input}}
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
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
        </Box>
        </ThemeProvider>
    
    );
};

export default SignUp