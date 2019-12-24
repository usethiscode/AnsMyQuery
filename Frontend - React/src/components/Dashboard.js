import React, { Component,Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import {loadUser} from '../actions/authActions'
import store from '../store'
import AddQuestion from './AddQuestion'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import QuesItem from './QuesItem';
const getQuestionsQuery = gql`
query getQuestion($id: ID!){
        ques_by_userID(id: $id){
        id,
        title,
        asked_user{
            name
        },
        ques,
        tags
    }
}
`
export class Dashboard extends Component {
    componentDidMount(){
        store.dispatch(loadUser())
        // const { isAuthenticated, user } = this.props.auth;
        // console.log(store.getState())
    }
    static propTypes = {
        auth: PropTypes.object.isRequired
        }
    
    render() {
        const { isAuthenticated,user } = this.props.auth;
        if(isAuthenticated===null)
            return <h4>Please wait...</h4>
        if(user)
        return (
            <div>
                <h4 style={{marginLeft:20}}><strong>{user ? `Welcome ${user.name}` : ''}</strong></h4>
                
                <h4 style={{marginLeft:20,marginTop:30}}>Your Questions : </h4>
                {
                    user._id?(null):( document.location.reload(true) )
                }
                {
                user._id?(<Query query={getQuestionsQuery} variables={ {id: user._id}}>
                    {({ loading, error, data }) => {
                        if (loading) return <h4>loading...</h4>
                        if (error) return console.log(error);
                        if (data) console.log(data)
                        return (<Fragment>
                            {
                                data.ques_by_userID.map(question => (
                                    <QuesItem key={question.id} question={question}/>
                                ))
                            }
                        </Fragment>
                        );
                    }}
                </Query>):(null)
                }
                <AddQuestion />
            </div>
        )
        else
        return(
            <div>
                <h4>Please login to Continue</h4>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default withRouter(connect(
    mapStateToProps,
    null
  )(Dashboard))
