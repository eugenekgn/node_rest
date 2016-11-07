"use strict";

import iocContainer from '../shared/iocContainer';

export default (app)=> {

  const controllers = iocContainer.getAllDependencies();

  const {
    customerController
  } = controllers;

  app.use('/customer', customerController.registerRoutes());

};