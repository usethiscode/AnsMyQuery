import React, { Component,Fragment } from 'react'
import { Query } from 'react-apollo'
import {gql} from 'apollo-boost';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {loadUser} from '../actions/authActions'
import store from '../store'
import axios from 'axios';
import AnsItem from './AnsItem';
import Divider from '@material-ui/core/Divider';

const getQuestionQuery = gql`
query getQuestion($id: ID!){
        question(id: $id){
        ques,
        title,
        asked_user{
            name
        },
        tags
    }
}
`

const getAnswersQuery= gql`
query getAnswers($id: ID!){
    ans_by_quesId(id: $id){
        id,
        ans,
        voteCount,
        answered_user{
            name
        }
    }
}
`

export class Question extends Component {
    state={
        ans: "",
        answered_user: "",
        ques_id: "",
    }
    
    static propTypes = {
        auth: PropTypes.object.isRequired
      };

    componentDidMount(){
        store.dispatch(loadUser())
    }
    submitForm(e){
        e.preventDefault();
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
        };
        
        console.log(this.state.ans,this.state.answered_user,this.state.ques_id)
        const body = JSON.stringify({ ans:this.state.ans, answered_user:this.state.answered_user, ques_id:this.state.ques_id });
        axios
        .post('//stackoverflow-server.herokuapp.com/api/postanswer',body,config)
        .then(res => {console.log('Question Posted');document.location.reload(true)})
        .catch(err => console.log(err))
        this.state.ans=e.target.value=""
    }
    render() {
       const { isAuthenticated, user } = this.props.auth;
       this.state.answered_user = user ? user._id : ''
        return (
            <div style={{marginTop:60}}>
                <Query query={getQuestionQuery} variables={ {id: this.props.match.params.qid}}>
                    {({ loading, error, data }) => {
                        if (loading) return null;
                        if (error) return `Error! ${error}`;
                        if (data) this.state.ques_id=this.props.match.params.qid
                        return (

                        <div class="jumbotron jumbotron-fluid">
                            <div class="container" style={{marginLeft:30}}>
                                <h1 class="display-4">{data.question.title}</h1>
                                <p>{data.question.ques}</p>
                                <hr class="my-4"></hr>
                                
                                <p class="lead">Tags: {data.question.tags.map(tag => `${tag }, `)}</p>
                                <p class="lead">Asked by: {data.question.asked_user.name}</p>
                            </div>
                        </div>


                        );
                    }}
                </Query>
                

               
                <h4 style={{ marginLeft:70,marginBottom:70 }}> Answers </h4>
                <Query query={getAnswersQuery} variables={ {id: this.props.match.params.qid}}>
                    {
                        ({ loading, error, data }) =>{
                            if(loading) return <h4>loading</h4>
                            if(error) console.log(error)
                            if(data.ans_by_quesId.length!=0)
                            return (
                            <Fragment>
                                {
                                    (isAuthenticated)?(
                                    data.ans_by_quesId.map(answer => (
                                        <AnsItem key={answer.id} answer={answer} userid={user._id}/>
                                    // <h4>{ answer.ans }</h4>
                                    ))
                                    ):
                                    (
                                        data.ans_by_quesId.map(answer => (
                                            <AnsItem key={answer.id} answer={answer}/>
                                        // <h4>{ answer.ans }</h4>
                                        ))
                                    )
                                }
                            </Fragment>
                           )
                           else
                           return <h3 style={{margin:50}}>No answers yet :(</h3>
                        }
                    }
                </Query>



                {
                (isAuthenticated)?(
                <div className='form-group' style={{margin:50}}>
                <form onSubmit = {this.submitForm.bind(this) }>

                    <h4>Post an Answer!</h4>
                    <textarea style={{width:'50%'}} class='form-control' onChange={ (e) => this.setState( { ans : e.target.value }) }/>
                    <button style={{marginTop:20}}type="submit" class="btn btn-primary">Post Answer</button>
                </form>
                </div>
                ):(<h4 style={{margin:50}}>Please Login to Post Anwers</h4>)
                }
                {/* <Form onSubmit={this.submitForm.bind(this) }>
                    <FormGroup>
                        <Label for="Answer">Email</Label>
                        <Input type="text" placeholder="Enter Answer" onChange={ (e) => this.setState( { ans : e.target.value }) }/>
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
             */}
            
            </div>
        )
    }
}


const mapStateToProps = state => ({
    auth: state.auth
    });
    
    export default connect(mapStateToProps)(Question)
