const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json())
var path=require('path')
// mongoose.connect("mongodb+srv://sudendar:asdfgasdfg@cluster0-vnpm1.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true})
mongoose.connect('<Mongodb URL>',{useNewUrlParser: true})
mongoose.connection.once('open',()=>{
    console.log("Connected to Database")
})

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://sudendar:<password>@cluster0-vnpm1.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });

// // bind express with graphql
// app.use(express.static('build/'))
// app.get('/',(req,res) => {
//     res.sendFile(path.resolve(__dirname,"build","index.html"));
// })
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// app.get('/dashboard',(req,res) => {
//     res.sendFile(path.resolve(__dirname,"build","index.html"));
// })

app.use('/api/register',require("./routes/api/register"))
app.use('/api/auth',require("./routes/api/auth"))
app.use('/api/createuser',require("./routes/api/users"))
app.use('/api/postquestion',require("./routes/api/postquestion"))
app.use('/api/postanswer',require("./routes/api/postanswer"))
app.use('/api/vote',require("./routes/api/votes"))
app.listen(process.env.PORT||5000, () => {
    console.log('now listening for requests on port 5000');
});
