import React,{Component} from 'react'
import axios from 'axios';
function vote(id,userid,type){
    const body = JSON.stringify({ id:id, type:type,user:userid });
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    console.log(body)
        axios
        .post('//stackoverflow-server.herokuapp.com/api/vote',body,config)
        .then(res => {console.log(res);alert('Voted!')})
        .catch(err => console.log(err))
}

export default function AnsItem(props) {
    const { id,ans,answered_user,voteCount } = props.answer
    return (
        <div>
        <hr class="my-4"></hr>
        {/* <h4> {ans} by: {answered_user.name}</h4> */}
        <span style={{marginLeft:20}}>{voteCount}</span>

        <h5 style={{margin:50,marginTop:10}}>{ans}</h5>
        <p class="lead" style={{marginTop:50,marginLeft:50}}>Answered by: {answered_user.name}</p>
        
        { (props.userid)?
            (
            <div>
            {/* <h4 style={{marginLeft:50}}>Userid : {props.userid}</h4> */}
            <button style={{marginLeft:50}} class="btn btn-outline-success" onClick={ ()=> vote(id,props.userid,'up') }>Upvote</button>
            <button style={{marginLeft:25}} class="btn btn-outline-danger" onClick={ ()=> vote(id,props.userid,'down')}>Downvote</button>
            </div>
            )
            :(<h4 style={{marginLeft:50}}>Login to vote</h4>)
        }
        <hr class="my-4"></hr>
        </div>
    )
}
 