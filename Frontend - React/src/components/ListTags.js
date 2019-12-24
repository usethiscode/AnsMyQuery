import React, { Component,Fragment }from 'react'
import { Spinner } from 'reactstrap';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const getTags_query = gql`
{
    tags
}
`

export default function ListTags() {
    return (
        <div>
            {/* <h1 style={{ padding:10}}>Tags</h1> */}
            <Query query={getTags_query}>
                    {
                        ({ loading, error, data }) =>{
                            if(loading) return(<div>
                                 <Spinner style={{ width: '3rem', height: '3rem' }} /> 
                                 <h4>Loading</h4>
                                 </div>
                            )
                            if(error) console.log(error)
                            if(data)
                            return <Fragment>
                                
                                    <div className='container-fluid d-flex justify-content-center b'>
                                    <div className="row">
                                    {

                                    data.tags.map(tag => (

                                    <div key={tag} className='col-md-4'>
                                    <div key={tag} className="card" style={{width:'18rem', marginLeft:30,marginBottom:20,marginTop:20}}>
                                        <div className="card-body">
                                            <h5 className="card-title">{tag}</h5>
                                            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                            <a className="btn btn-primary" href={`/tag/${tag}`}>Browse Questions</a>
                                        </div>
                                    </div>
                                    </div>
                                    ))

                                    }
                                    </div>
                                    </div>
                                
                            </Fragment>
                        }
                    }
            </Query>
        </div>
    )
}
