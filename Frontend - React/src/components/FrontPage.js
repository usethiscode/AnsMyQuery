import React, { Component,Fragment } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import QuesItem from './QuesItem';
import { Spinner } from 'reactstrap';
import ListTags from './ListTags'

const Questions_query = gql`
    {
        all_questions{
            id,
            title,
            ques,
            asked_user{
                name
            },
            tags
        }
    }
`
export class FrontPage extends Component {
    render() {
        return (
            <Fragment>

                <div style={{ marginLeft:40, marginBottom:40 }}>
                <h3>Search Questions by : </h3>
                <a href="/tags">Tags</a>
                <a href="/users" style={{display:'block'}}>Users</a>
                </div>

                <h4 style={{textAlign:'center'}}>Tags</h4>
                <ListTags />
                

                <br/>
                <h1 style={{ padding:10}}>Latest Questions</h1>

                <div className="list-group">
                <Query query={Questions_query}>
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
                                {
                                    data.all_questions.map(question => (
                                        <QuesItem key={question.id} question={question}/>
                                    ))
                                }
                            </Fragment>
                        }
                    }
                </Query>
                </div>
            </Fragment>
        )
    }
}

export default FrontPage
