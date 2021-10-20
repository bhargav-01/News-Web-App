import React, { Component } from 'react'
import {FaBars} from 'react-icons/fa'
import Main from './MainComponent'
import { Switch, Route, Redirect,Link } from 'react-router-dom';
import Header from './HeaderComponent'
import  Login from './LoginComponent'
import './NewsList.css';


class NewsList extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            articals:null,
        }
    }
    
    render()
    {
        return(
            <div classNameName="container">
                <div className='dashboard'>
                    <Header/>
                    <div className='dashboard-app'>
                        <header className='dashboard-toolbar'>
                            <div className="row" style={{width:"-webkit-fill-available"}}>
                                <div className="col-6">
                                    <a href="#!"  className="menu-toggle col-8">
                                        <FaBars class="icon"/>
                                    </a>
                                </div>
                                <div className="col-6" style={{display:"flex","justify-content":"flex-end",fontFamily: "'Lobster', cursive",fontSize:"1.7rem"}}>
                                    <Link to="/home" style={{"text-decoration": "none","color":"#443ea2",fontSize:"2rem"}}>
                                        News.com
                                    </Link>
                                </div>
                            </div>
                        </header>
                        <div className='dashboard-content'>
                            <div className='container'>
                                <Switch>
                                    <Route path='/home' component={()=><Main url="http://localhost:3001/news/general/" blur={()=>this.handleBlur()}/>}/>
                                    <Route path='/sports' component={()=><Main url="http://localhost:3001/news/sports/" blur={()=>this.handleBlur()}/>}/>
                                    <Route path='/health' component={()=><Main url="http://localhost:3001/news/health/" blur={()=>this.handleBlur()}/>}/>
                                    <Route path='/technology' component={()=><Main url="http://localhost:3001/news/technology/" blur={()=>this.handleBlur()}/>}/>
                                    <Route path='/entertainment' component={()=><Main url="http://localhost:3001/news/entertainment/" blur={()=>this.handleBlur()}/>}/>
                                    <Route path='/business' component={()=><Main url="http://localhost:3001/news/business/" blur={()=>this.handleBlur()}/>}/>
                                    <Route path='/science' component={()=><Main url="http://localhost:3001/news/science/" blur={()=>this.handleBlur()}/>}/>
                                    <Route path='/login' component={Login}/>
                                    <Redirect to="/home" />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}
export default NewsList