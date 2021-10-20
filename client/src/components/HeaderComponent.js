import React,{useState} from 'react'
import {NavLink,Link,useHistory} from 'react-router-dom'
import './NewsList.css';
import {FaGlobeAfrica,FaVolleyballBall,FaMobileAlt,FaBusinessTime,FaFlask,FaBars,FaSignOutAlt, FaSignInAlt} from 'react-icons/fa'
import {RiHeartPulseFill} from 'react-icons/ri'
import {ImVideoCamera} from 'react-icons/im'
import {IoNewspaperSharp} from 'react-icons/io5'
import axios from 'axios';


class Header extends React.Component
{
    
    constructor(props)
    {
        super(props);
        this.state={
            tokenExist:false
        }
    }

    componentDidMount()
    { 
        console.log(localStorage.getItem('token'));
        console.log(this.state.tokenExist);
        if(localStorage.getItem('token')!=='' &&  localStorage.getItem('token')!=='undefine')
        {
            this.setState({
                tokenExist:true,
            })
        }
    }
        
    render()
    {
        const Container=()=>{
            
            const history = useHistory();
            const handleclick=()=>{
        
                axios.get('http://localhost:3001/users/logout')
                .then(response=>{
                    this.setState({
                        tokenExist:false,
                    })
                    localStorage.setItem('token','');
                    
                })
                .catch(err=>{console.log(err)})
                history.push('/login');
            }

            return(
                <div className="dashboard-nav">
                    <header>
                        <Link className="nav-link menu-toggle">
                            <FaBars className="icon"/>
                        </Link>
                        <Link to='/home' className="brand-logo" style={{fontFamily: "'Lobster', cursive" ,fontSize:"2rem"}}>
                            <IoNewspaperSharp className="icon"/>
                                News.com
                        </Link>
                    </header>
                    <nav className="dashboard-nav-list">
                        <NavLink  to='/home' className="nav-link dashboard-nav-item">
                            <FaGlobeAfrica className="icon"/> Home 
                        </NavLink>
                        <NavLink  to='/sports' className="nav-link dashboard-nav-item ">
                            <FaVolleyballBall className="icon"/>Sports
                        </NavLink>
                        <NavLink  to='/health' className="nav-link dashboard-nav-item ">
                            <RiHeartPulseFill className="icon"/>Health
                        </NavLink>
                        <NavLink  to='/technology' className="nav-link dashboard-nav-item ">
                            <FaMobileAlt className="icon"/>
                            Technology
                        </NavLink>
                        <NavLink  to='/entertainment' className="nav-link dashboard-nav-item ">
                            <ImVideoCamera className="icon"/>Entertainment
                        </NavLink>
                        <NavLink  to='/business' className="nav-link dashboard-nav-item ">
                            <FaBusinessTime className="icon"/>Business
                        </NavLink>
                        <NavLink  to='/science' className="nav-link dashboard-nav-item ">
                            <FaFlask className="icon"/>
                            Science
                        </NavLink>                            
                        <div style={{position:"fixed",left:"0",bottom:"0",width:"100%"}}>   
                            <div className="nav-item-divider"></div>  
                            <button
                                type="button"
                                className="btn btn-outline nav-link dashboard-nav-item"
                                onClick={() => {
                                    handleclick();
                                }}
                                >
                                {
                                    this.state.tokenExist && <div><FaSignOutAlt className="icon"/>LogOut</div>
                                }
                                {
                                    !this.state.tokenExist && <div><FaSignInAlt className="icon"/>Login</div>
                                }
                            </button>
                        </div>
                    </nav>
                </div>
            )
        }
        return(
            <Container/> 
        )
    }
    
}

export default Header

