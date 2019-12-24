import React, { Component,Fragment } from 'react'
import { Query } from 'react-apollo'
import {gql} from 'apollo-boost';
import Divider from '@material-ui/core/Divider';
import QuesItem from './QuesItem'
import { Spinner } from 'reactstrap';
const getQuestionQuery = gql`
query getQuestionByTag($id: String!){
        ques_by_tag(tag: $id){
        ques,
        id,
        title,
        asked_user{
            name
        },
        tags
    }
}
`
export class Tag extends Component {
    render() {
        return (
            <div style={{marginTop:100}}>
                <Query query={getQuestionQuery} variables={ {id: this.props.match.params.qid}}>
                    {({ loading, error, data }) => {
                        if (loading) return(
                            <div style={{ margin:50}}>
                            <Spinner style={{ width: '3rem', height: '3rem' }} /> 
                            <h4>Loading...</h4>
                            </div>
                       )
                        if (error) return `Error! ${error}`;
                        if (data) console.log(data)
                        return (<Fragment>
                            {
                                data.ques_by_tag.map(question => (
                                    <QuesItem key={question.id} question={question}/>
                                ))
                            }
                        </Fragment>
                        );
                    }}
                </Query>
                <Divider />
            </div>
        )
    }
}


export default Tag
