const express = require('express');
const models = require('./models');
const db = require('./config/db');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use( cors() );
app.set('port', 3200);

//DB Connection
db()
    .then(res => {
        console.log('Connection Succesful');

        app.listen(app.get('port'), () => {
            console.log('app listening to port ', app.get('port'));
        });
    })
    .catch(e => console.error(e));

//MIDDLEWARES
app.use('/', bodyParser.json());
app.use('/', expressGraphQL({
    schema,
    graphiql: true
}));