'use strict';

import bodyParser from 'body-parser';
import configControllers from './configControllers';
import configErrorHandling  from './errorHandling';


export default (app) => {

  // body parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  // disable headers
  app.disable('x-powered-by');

  configControllers(app);
  configErrorHandling(app);
}