import React, { useState } from 'react'
import {FaTelegramPlane} from 'react-icons/fa'
import {green,purple} from '@material-ui/core/colors'
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import {makeStyles,ThemeProvider,createTheme} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
// import { green, orange } from '@mui/material/colors';
import PropTypes from "prop-types";


const initialState = {
    comment:"",
};

const useStyles = makeStyles((theme) =>({
  input: {
    color:'#ffffff',
  },
  root: {
    color:'#ffffff',
  },
  button:{
    background:'white',
    color:'blue',
  }
}));


const theme = createTheme({
  palette: {
    primary: {
      main:'#fff',
    },
    secondary: {
      main: green[500],
    },
  },
});

function PostComment(props) {
   
  const classes = useStyles(props);  
  const [comment, setComment] = useState(''); 
  const history = useHistory();
  const postComment= (e)=>{
    if(localStorage.getItem('token')==='' || localStorage.getItem('token')==='undifine')
    {
      history.push('/login')
    }
    props.postComment(e);
    // setComment("");
    e.preventDefault();
  }
  return (
    //  <Button className={classes.root}>Hook</Button>
      <ThemeProvider theme={theme}>
        <form  className="form" autoComplete="on" onSubmit={postComment}>
            <div className="row">
                <div className="col-9" style={{color:'white'}}>
                    <TextField 
                        inputProps={{ className: classes.root }}
                        className={"bhargav"}
                        id="standard-basic" 
                        required="true"
                        variant='standard'
                        multiline
                        values={comment}
                        name="comment"
                        fullWidth
                        maxRows={3}
                        placeholder="Type here...."
                        onChange={e => setComment(e.target.value)} />
                </div>
                 <div className="col-auto">
                    <Button
                        type="submit"
                        className={classes.button}
                        variant="contained"
                        size="large"
                        startIcon={<FaTelegramPlane />}>
                    </Button>
                </div>
            </div>
        </form>
      </ThemeProvider>
      // <div></div>
      
    );
  
}

export default PostComment
