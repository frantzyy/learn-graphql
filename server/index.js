import express from 'express';
import expressGraphQL from 'express-graphql';
import cors from 'cors';


import schema from './schema';  


const app = express();

app.use(cors());

app.use('/graphql', expressGraphQL(() => ({
    schema : schema,
    graphiql : true
    }))
);

app.listen(4000, () => console.log('express now running on localhost:4000/'));

