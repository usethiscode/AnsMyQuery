import React, { Component,Fragment } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import QuesItem from './QuesItem';
import { Spinner } from 'reactstrap';
import ListTags from './ListTags'

const Questions_query = gql`
query GETQuestions($userID : ID!){
    user(id: $userID){
      questions{
        id,
        ques,
        asked_user{
            name
        },
        tags
      }
    }
  }
`
export class FrontPage extends Component {
    render() {
        return (
            <Fragment>

                <div className="list-group">
                <Query query={Questions_query} variables={ {userID: this.props.match.params.uid}}>
                    {
                        ({ loading, error, data }) =>{
                            if(loading) return(<div>
                                 <Spinner style={{ width: '3rem', height: '3rem' }} /> 
                                 <h4>Loading</h4>
                                 </div>
                            )
                            if(error) console.log(error)
                            if(data.user.questions.length !=0 )
                            return <Fragment>
                                {
                                    data.user.questions.map(question => (
                                        <QuesItem key={question.id} question={question}/>
                                    ))
                                }
                            </Fragment>
                            else
                            return(<h4>No questions</h4>)
                        }
                    }
                </Query>
                </div>
            </Fragment>
        )
    }
}

export default FrontPage
