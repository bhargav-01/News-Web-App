import React,{Component} from 'react'
import Desc from './DescComponent'
import gif from '../assets/loading.gif'
import axios from 'axios'
import News from './News'
// const articals
class Main extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            selected:null,
            url:props.url,
            articals:null,
            error:null,
            iserror:null,
            isLoding:true,
            matches: window.matchMedia("(min-width: 992px)").matches,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount()
    {
        const handler = e => this.setState({matches: e.matches});
        window.matchMedia("(min-width: 992px)").addListener(handler);

        // alert("heello")
        this.setState({
            isLoding:true,
        })
        const instance = axios.create({
            baseURL: this.state.url,
            timeout: 5000,
          });
        instance.get(this.state.url)
        .then(response => {
            console.log(response.data)
            this.setState({
                articals:response.data,
                isLoding:false,
                iserror:null,
            })
        })
        .catch(error => {
            // window.location().reload();
            // alert(JSON.stringify(error));
            this.setState({
                iserror:"cdscds",
                error:error,
            })
            window.location.reload();
        });

    }

    handleClick(news)
    {
        this.setState({
            selected:news,
        })
    }

    handleClose()
    {
        
        this.setState({
            selected:null
        })
    }

    renderNews(news)
    {
        const formatter = new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric" });
        const date = new Date(news.publishedAt);
        return(
                <div className="col">
                    <div className="card h-100" style={{
                        boxShadow:"#4723d9 7px 11px 20px 1px",
                        // "box-shadow": "7px 11px 13px 3px #ddd",
                        background:"#4723D9",
                        color:"#ffff",
                        "border-radius": "20px"}} onClick={()=>this.handleClick(news)}>
                        <img src={news.urlToImage} className="card-img-top img-fluid" style={{height:250, "border-radius": "20px"}} alt="news"></img>
                        <div className="card-body">
                            <h5 className="card-title" style={{fontFamily:"'STIX Two Text', serif",fontSize:"1.5em"}}>{news.title}</h5>
                        </div>
                        <div class="card-footer">
                            {!this.state.matches && <Desc className="col-6"  description={news.content} url={news.url} date={formatter.format(date)}/>}
                            {this.state.matches && <p className="row align-items-start m-auto">{formatter.format(date)}</p>}
                        </div>
                    </div>
                </div>
        )
    }
    render(){
            if(this.state.isLoding)
            {
                return (
                <div style={{background:"#e9edf4",marginTop:"100px"}} >
                    <img src={gif}  alt="loadig" style={{margin: "auto",display:"flex"}}></img>
                </div>)
            }

            if(this.state.error)
                return (<div>{this.state.error}</div>)

            if(this.state.articals==null)
                return(<div></div>)

            return(  
                <div style={{"display":"flex"}}>
                    <div className="row row-cols-1 row-cols-md-3 g-4" href="/home">
                            {this.state.articals.map((news)=>this.renderNews(news))}
                    </div>
                    <div className="row">
                        { this.state.matches && this.state.selected!=null && <div className="blur">bhargav</div>}
                    </div>
                    <div style={{zIndex:"1000",position:"fixed"}}>
                        {this.state.matches && this.state.selected!=null && <News news={this.state.selected} close={()=>this.handleClose()}/>}
                    </div>
                </div>
            )
    }
    

}

export default Main