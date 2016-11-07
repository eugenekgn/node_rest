'use strict';

import express from 'express';
import httpStatus from '../../constants/httpCodes';
import iocContainer from '../../shared/iocContainer';
import Error from '../../services/dto/error';

const logger = iocContainer.resolve('logger');

export default class BaseController {
  constructor({service}) {
    this.service = service;
    this.router = express.Router();
  }

  getBody(req) {
    return req.body;
  }

  registerRoutes() {
    throw new Error('not implemented');
  }

  wrap(res, err, data) {
    if (err) {
      logger.error(err);
      res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR);

      if (err instanceof Error) {
        res.send(err);
      } else {
        res.send();
      }
    } else {
      res.statusCode = data && data.statusCode || httpStatus.OK;
      res.json(data);
    }
  }
}