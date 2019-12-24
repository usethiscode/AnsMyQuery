import React from 'react'

export default function QuesItem({question: { id,ques,asked_user,title,tags }}) {
    return (
        <div key={id}>
            {/* <h4 key={id} style={{ paddingLeft:10}} >{title}</h4>
            <a href={`/question/${id}`}>{ques}</a>  */}
            <a 
            href={`/question/${id}`} 
            className="list-group-item list-group-item-action"
            style={{ marginBottom:20, marginLeft:20, width:'70%'}}
            >
                <div className="d-flex w-100 justify-content-between">
                <h4 className="mb-1">{title}</h4>
                <small>3 days ago</small>
                </div>
                <p className="mb-1" >{ques}</p>
                <small>Tags : {tags.map(tag => `${tag }, `)}</small>
                <small style={{display:'block'}}>Asked By : {asked_user.name}</small>
            </a>
            
        </div>
    )
}
