import React from 'react';
import FrontPage from './FrontPage';

function RootComponent() {
  return(
        <div>

          <div className="jumbotron bg-yellow-500 p-slope-left" style={{marginTop:-50}} >
          
          <div style={{marginBottom:50,marginTop:50}}>
          <h1 className="display-4" style={{color:'black'}}>AnsMyQuery</h1>
          <p className="lead" style={{color:'black'}}>We love people who code</p>
          <hr className="my-4"></hr>
          <p className="lead" style={{color:'black'}}>AnsMyQuery is an open community for anyone that codes. We help you get answers to your toughest coding questions, share knowledge with your coworkers in private, and find your next dream job.</p>
          </div>
          {/* <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
          <a class="btn btn-primary btn-lg" style={{ marginLeft: 20}} href="#" role="button">Learn more</a> */}
          
          </div>
        <FrontPage />
        </div>
    )
}


export default RootComponent;
