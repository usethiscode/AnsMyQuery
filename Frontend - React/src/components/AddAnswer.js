import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {loadUser} from '../actions/authActions'
import store from '../store'
import axios from 'axios';
import { connect } from 'react-redux';

export class AddAnswer extends Component {
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
        .then(res => console.log('Question Posted'))
        .catch(err => console.log(err))
    }
    render() {
        const { isAuthenticated, user } = this.props.auth;
        this.state.answered_user = user ? user._id : ''
        this.state.ques_id = this.props.ques_id
        return (
            <div>
                 <form id="add-question" onSubmit = {this.submitForm.bind(this) }>

                <label>Post an Answer</label>
                <input type="text" onChange={ (e) => this.setState( { ans : e.target.value }) }/>
                <button>Post Answer</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
    });
    
    export default connect(mapStateToProps)(AddAnswer)
