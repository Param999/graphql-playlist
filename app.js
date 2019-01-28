const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const schema = require('./schema/schema');

const app = express();

mongoose.connect("mongodb://param:mongo1234@ds251284.mlab.com:51284/mongo-gql");
mongoose.connection.once('open', () => {
    console.log('connected to mongodb');
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log("listening on port 4000");
})