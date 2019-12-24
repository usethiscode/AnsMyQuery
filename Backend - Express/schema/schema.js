const graphql = require('graphql');
const User = require("../models/User");
const Question = require("../models/Question");
const Answer = require("../models/Answer");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt
} = graphql;


const QuestionType = new GraphQLObjectType({
    name: 'Question',
    fields: ( ) => ({
        id: { type: GraphQLID },
        ques: { type: GraphQLString },
        title: { type: GraphQLString },
        tags: {type: GraphQLList(GraphQLString)},
        asked_user: {
            type: UserType,
            resolve(parent, args){
                // return _.find(users, { id: parent.asked_user });
                return User.findById(parent.asked_user)
            }
        }
    })
});

const AnswerType = new GraphQLObjectType({
    name: 'Answer',
    fields: () => ({
        id: { type: GraphQLID },
        ques_id: {type: GraphQLID },
        ans: {type: GraphQLString },
        voteCount : {type: GraphQLInt},
        answered_user: {
            type: UserType,
            resolve(parent, args){
                // return _.find(users, {id: parent.answered_user });
                return User.findById(parent.answered_user)
            }
        }
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        questions: {
            type: GraphQLList(QuestionType),
            resolve(parent,args){
                return Question.find( {asked_user: parent.id} )
            }
        },

        answers: {
            type: GraphQLList(AnswerType),
            resolve(parent,args){
                return Answer.find( {answered_user: parent.id} )
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        question: {
            type: QuestionType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
                // return _.find(books, { id: args.id });
                return Question.findById(args.id)
            }
        },

        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // return _.find(users, { id: args.id });
                return User.findById(args.id)
            }
        },
        
        answer:{
            type: AnswerType,
            args: {id : {type: GraphQLID }},
            resolve(parent,args){
                return Answer.findById(args.id)
            }
        },

        ans_by_quesId: {
            type: GraphQLList(AnswerType),
            args: {id : {type: GraphQLID } },
            resolve(parent, args){
                // return _.find(answers, {ques_id: args.id});
                return Answer.find({ques_id: args.id})
            }
        },
        ques_by_userID:{
            type: GraphQLList(QuestionType),
            args: {id : {type: GraphQLID}},
            resolve(parent,args){
                return Question.find({asked_user: args.id})
            }
        },
        ans_by_userID:{
            type: GraphQLList(AnswerType),
        },

        all_questions:{
            type: GraphQLList(QuestionType),
            resolve(parent,args){
                return Question.find({});
            }
        },
        ques_by_tag:{
            type: GraphQLList(QuestionType),
            args: {tag: {type: GraphQLString}},
            resolve(parent,args){
                return Question.find({
                     tags:{ $in:[args.tag] } 
                    })
            }
        },
        tags:{
            type:GraphQLList(GraphQLString),
            resolve(parent,args){
                return Question.distinct('tags')
            }
        },
        users:{
            type:GraphQLList(UserType),
            resolve(parent,args){
                return User.find({}).sort({'name':1})
            }
        }
    }
});



const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                let user = new User({
                    name: args.name
                })

                return user.save();
            }
        },

        addQuestion:{
            type: QuestionType,
            args:{
                ques : { type: new GraphQLNonNull(GraphQLString) },
                asked_user: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent,args){
                let question = new Question({
                    ques: args.ques,
                    asked_user: args.asked_user
                })
                return question.save()
            }  
        },

        addAnswer:{
            type: AnswerType,
            args:{
                ans: { type: new GraphQLNonNull(GraphQLString) },
                ques_id: { type: new GraphQLNonNull(GraphQLID) },
                answered_user: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent,args){
                let answer = new Answer({
                    ans: args.ans,
                    ques_id: args.ques_id,
                    answered_user: args.answered_user
                })

                return answer.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
