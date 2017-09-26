// NPM Dependencies
import express from 'express';
import bodyParser from 'body-parser';
var logger = require('minilog')('errors-logger');
import cors from 'cors';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';


import { formatErrorGenerator } from 'graphql-apollo-errors';

// Local Dependencies
import { getCurrentLanguage, loadLanguage } from './lib/i18n';
import { getUserFomToken } from './lib/user';

// Configuration
import { $serverPort, $db, $security } from './lib/config';

import schema from './schema';

// Starting express application
const app = express();


const options = { promiseLibrary: bluebird };
console.log(`mongodb://${$db().mongodb.user}:${$db().mongodb.password}@${$db().mongodb.host}:${$db().mongodb.port}/${$db().mongodb.database}`);
mongoose.connect(`mongodb://${$db().mongodb.user}:${$db().mongodb.password}@${$db().mongodb.host}:${$db().mongodb.port}/${$db().mongodb.database}`, options);
mongoose.Promise = bluebird;

const db = mongoose.connection;

db.on('error', () => {
  console.log('Mongo error');
}).once('open', () => {
  console.log('Connected to mongo');
});


// i18n
app.use((req, res, next) => {
  res.__ = loadLanguage(getCurrentLanguage(req.headers['accept-language']));
  return next();
});

app.disable('x-powered-by');
// Cors
app.use(
  cors({
    origin: '*',
    exposedHeaders: ['Token'],
    allowedHeaders: ['Origin', 'Authorization', 'Content-Type', 'Content-Length', 'X-Requested-With', 'Accept', 'Accept-Encoding', 'User-Agent'],
    methods: ['GET', 'PUT', 'POST', 'OPTIONS']
  })
);








const formatErrorOptions = {
  logger,
  publicDataPath: 'public', // Only data under this path in the data object will be sent to the client (path parts should be separated by . - some.public.path)
  showLocations: true, // whether to add the graphql locations to the final error (default false)
  showPath: true, // whether to add the graphql path to the final error (default false)
  hideSensitiveData: false, // whether to remove the data object from internal server errors (default true)
  hooks: {
    // This run on the error you really throw from your code (not the graphql error - it means not with path and locations)
    onOriginalError: (originalError) => {
      logger.info(originalError.message);
    },
    // This will run on the processed error, which means after we convert it to boom error if needed
    // and after we added the path and location (if requested)
    // If the error is not a boom error, this error won't include the original message but general internal server error message
    // This will run before we take only the payload and the public path of data
    onProcessedError: (processedError) => {
      logger.info(processedError.message);
    },
    // This will run on the final error, it will only contains the output.payload, and if you configured the publicDataPath
    // it will only contain this data under the data object
    // If the error is internal error this error will be a wrapped internal error which not contains the sensitive details
    // This is the error which will be sent to the client
    onFinalError: (finalError) => {
      logger.info(finalError.message);
    }
  }
};

const formatError = formatErrorGenerator(formatErrorOptions);

const getUserAuth = async (req) => {
  const token = req.headers.authorization;
  try {
    const user = await getUserFomToken(token);
    console.log('aaaaaaa');
    req.user = user;
  } catch (err) {
    console.log(err);
  }
  req.next();
};
app.use(getUserAuth);


app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({ schema })
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
);


app.listen($serverPort(), () => {
  console.log(`working ${$serverPort()}`);
});

module.exports = app;
