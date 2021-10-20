import React,{Component} from 'react'
import Desc from './DescComponent'
import './NewsList.css'
import {IoMdArrowRoundBack} from 'react-icons/io'
import {FaTelegramPlane} from 'react-icons/fa'
import Comment from './commentComponent'
import  PostComment from './postCommentComponent'
const axios = require('axios');

class News extends Component{
    // alert("sskk")   
    constructor(props){
        super(props);
        this.state={
            close:props.close,
            news:props.news,
            comments:props.news.comments,
        }
        this.postComment=this.postComment.bind(this);
    }

    fetchComments()
    {
        axios.get("http://localhost:3001/news/comments/"+this.state.news._id)
        .then(response => {
            console.log(response.data);
            this.setState({
                comments:response.data.comments,
            })
        })
        .catch(error => {
            this.setState({
                error:error,
            })
        });
    }

    getToken()
    {
        return localStorage.getItem('token');
    }

    postComment(event)
    {
        event.preventDefault();
        console.log(this.getToken());
        const instance = axios.create({
            baseURL: 'http://localhost:3001/news/',
            headers: {'Authorization': `Bearer  ${this.getToken()}`}
        });
        instance.post("/comments/"+this.state.news._id,
            {
                comment: event.target.comment.value,
                author: "bhargav",
            },
        )
        .then(response => {
            console.log(response);
            this.setState({
                comments:response.data.comments,
            })
        })
        .catch(error => {
            
            console.log(error);
        });
    }
    componentDidMount()
    {
        this.fetchComments();
    }
    render(){
        const formatter = new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric" });
        const date = new Date(this.state.news.publishedAt);
        const comments=this.state.comments.map((comment)=>{
            return(<Comment comment={comment}/>)
        })
        return(
            <div>
                <div className="row selected_card" style={{padding:"0px"}}>
                    <div className="col-5" style={{padding:"0px"}}>
                        <button type="button" className="btn btn-lg" style={{position:"absolute",color:"#ffffffe3",fontSize:"30px"}} onClick={this.state.close}><IoMdArrowRoundBack/></button>
                        <img src={this.state.news.urlToImage} className="card-img-top" style={{height:250, "border-radius": "20px 0px 0px 0px"}} alt="news"></img>
                        <div className="card-body">
                            <h5 className="card-title" style={{fontFamily:"'STIX Two Text', serif",fontSize:"1.5em"}}>{this.state.news.title}</h5>
                            <p>{formatter.format(date)}</p>
                            <p>{this.state.news.description}</p>
                        </div>
                    </div>

                    <div className="col-7" style={{margin:"auto"}}>
                        <div style={{overflow:"auto",height:"500px"}}>
                            {comments}
                        </div>
                        <div>
                            <hr/>
                            <PostComment postComment={this.postComment}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default News