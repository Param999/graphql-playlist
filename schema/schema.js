const graphql = require('graphql');
const _=require("lodash");

const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLInt
} = graphql;

var books = [
    {name:'ABC', genre:'action', id:'1', authorId: '1'},
    {name:'DEF', genre:'comdemy', id:'2', authorId: '2'},
    {name:'XYZ', genre:'romance', id:'3', authorId: '3'}
];

var authors = [
    {name: 'Param', age: 24, id: '1'},
    {name: 'Ram', age: 42, id: '2'},
    {name: 'Lax', age: 22, id: '3'}
];

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:() => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type:AuthorType,
            resolve(parent, args){
                return _.find(authors, {id: parent.authorId});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:() => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book:{
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(books, {id: args.id});
            }
        },
        author:{
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id: args.id});
            }
        } 
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})