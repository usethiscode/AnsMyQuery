import React from 'react';
import RootComponent from './components/RootComponent';
import AppNavbar from './components/AppNavbar'
import {Provider} from 'react-redux'
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter,Route} from 'react-router-dom';
import Dashboard from './components/Dashboard'
import Question from './components/Question'
import Tag from './components/Tag'
import ListTags from './components/ListTags'
import ListUsers from './components/ListUsers'
import ListQuestionsUsers from './components/ListQuestionsUsers'


import ApolloClient from 'apollo-boost';
import {ApolloProvider } from 'react-apollo';
const client = new ApolloClient({
  uri:'http://stackoverflow-server.herokuapp.com/graphql'
})

function App() {
  
  return (
    <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <div className='container'>
          <AppNavbar />
          <h1 className='belownav'></h1>
        </div>
        <Route exact path="/" component={RootComponent} />
        <Route exact path="/dashboard" component={Dashboard} /> 
        <Route path="/question/:qid" component={Question} />
        <Route path="/tag/:qid" component={Tag} />
        <Route path="/tags" component={ListTags} />
        <Route path="/users" component={ListUsers} />
        <Route path="/userquestions/:uid" component={ListQuestionsUsers} />
      
      </BrowserRouter>
    </Provider>
    </ApolloProvider>
  );
}

export default App;
