import React from 'react'
import {Collapse} from 'react-bootstrap'
import {FaAngleDown} from 'react-icons/fa'
function Desc(props)
{
    const [open, setOpen] = React.useState(false);
    return (
        <div >
          <div className="row align-items-start"> 
            <p className="col-10 m-auto">{props.date}</p>
            <button

              href="#"
              className="col-2 btn"
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}>  
                  <FaAngleDown fontSize="25px" color="#fff"/>
            </button>
          </div>
          <Collapse in={open}>
            <div id="example-collapse-text">
              {props.description}
              <a src={props.url} href={props.url} target="_blank" rel="noreferrer" className="siteurl" style={{color:"#fff","text-decoration":"revert"}}> Read More</a>
            </div>
          </Collapse>
        </div>
      );
    
}

export default Desc