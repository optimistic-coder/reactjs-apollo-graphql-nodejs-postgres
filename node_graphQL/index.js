import  express from 'express';
import  { graphqlHTTP } from 'express-graphql';
var cors = require('cors')

import  resolvers  from './resolvers/resolvers';
import  schema  from './schemas/schemas';
var app = express();
app.use(cors())
const root = resolvers;

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue:root,
  graphiql: true
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));