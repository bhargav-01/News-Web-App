import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Typography  from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        margin: "10px",
        padding:"10px",
        "border-radius": "10px",
        "background": "#2536fb",
        "flex-direction": "column",
        "color": "black",
        "box-shadow": "2px 6px 20px #0f0d2a",
        '& > *': {
        },
    },
    orange: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
}));

function Comment(props) {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.root} style={{"flex-direction":"column","color":"white"}}>
                <div style={{display:"flex"}}> 
                    <Avatar className='Avatar'>N</Avatar>
                    <p style={{marginLeft:"10px"}}>{props.comment.author}</p>
                </div>
                <div style={{display:"flex","overflow-wrap":"anywhere"}}>
                    {props.comment.comment}
                </div>
            </div>
        </div>
    )
}

export default Comment
