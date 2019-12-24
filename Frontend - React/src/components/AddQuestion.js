import React, { Component,Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {loadUser} from '../actions/authActions'
import store from '../store'
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import MultiSelect from "@khanacademy/react-multi-select";
import gql from 'graphql-tag';
import {TagsInput} from './TagsInput'
const getTags_query = gql`
{
    tags
}
`

var options = [];

export class AddQuestion extends Component {


    state={
        ques: "",
        title: "",
        asked_user: "",
        selected: []
    }
   
    static propTypes = {
        auth: PropTypes.object.isRequired
      };
    
    
    componentDidMount(){
        store.dispatch(loadUser())
        // const { isAuthenticated, user } = this.props.auth;
        // console.log(store.getState())
        axios
        .get('//stackoverflow-server.herokuapp.com/graphql?query=%7Btags%7D')
        .then(res => {
          options=res.data.data.tags.map((tag) => ({"label":tag,"value":tag}))
        })
    }
    submitForm(e){
        e.preventDefault();
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
        };
        
        console.log(this.state.ques,this.state.asked_user)
        const body = JSON.stringify({ ques:this.state.ques, asked_user:this.state.asked_user, title:this.state.title, tags:this.state.selected });
        axios
        .post('//stackoverflow-server.herokuapp.com/api/postquestion',body,config)
        .then(res => {console.log('Question Posted'); alert('Question posted');document.location.reload(true);console.log(this.state)})
        .catch(err => console.log(err))
    }

    selectedTags(tags){
      this.state.selected = [...this.state.selected,...tags]
    };

    render() {
        // if(localStorage.getItem('auth-jwt') !== "null" && localStorage.getItem('auth-jwt') !== "undefined") this.props.dispatch(login())
        // if(this.props.auth==='logged_in'){
        // store.dispatch(loadUser())
        // console.log(store.getState())
       const {selected} = this.state
       const { isAuthenticated, user } = this.props.auth;
       this.state.asked_user = user ? user._id : ''
       const addpost = (
            <Fragment>
                
            <div style={{margin:50}}>
            <h4>Add a new Question</h4>
            <form onSubmit = {this.submitForm.bind(this) }>
                <div class="form-group">
                  <label for="exampleInputEmail1">Title</label>
                  <input style={{ width:'50%'}} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="titleHelp" onChange={ (e) => this.setState( { title : e.target.value }) }/>
                  <small id="titleHelp" class="form-text text-muted">A short description of the question</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Question</label>
                  <input style={{ width:'50%'}} type="text" class="form-control" id="exampleInputPassword1" aria-describedby="quesHelp" onChange={ (e) => this.setState( { ques : e.target.value }) }/>
                  <small id="quesHelp" class="form-text text-muted">Detailed Question</small>
                </div>
                
              <div style={{marginRight:'50%',marginTop:40,marginBottom:40}}>
              <MultiSelect
                options={options}
                selected={selected}
                onSelectedChanged={selected => this.setState({selected})}
                overrideStrings={{
                selectSomeItems: "Select Tags"}} />
                </div>
                <label for="exampleInputPassword1">Tags</label>
                <TagsInput selectedTags={this.selectedTags.bind(this)}  tags={[]}/>

                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>     
        

        </Fragment>
       )

       const guestLinks = (
        <Fragment>
          <h4>Not Logged in. Please login</h4>
        </Fragment>
      );


        return (
      <div>
                {isAuthenticated ? addpost : guestLinks}
      </div>
    );
            // }else{
            //     return(
            //         <div>
            //             Log in to Add Questions
            //             <a href='/login'>Log in</a>
            //             <a href='/register'>Register</a>
            //         </div>
            //     )
            // }
    }
}


const mapStateToProps = state => ({
auth: state.auth
});

export default connect(mapStateToProps)(AddQuestion)
// export default graphql(getUsersQuery)(AddQuestion)

