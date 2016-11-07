'use strict';

import iocContainer from '../shared/iocContainer';
import httpStatus from '../constants/httpCodes';


function errorHandler(err, req, res, next) {
  const logger = iocContainer.resolve('logger');

  logger.error(err);
  return res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).send();
}

export default(app) => {
  app.use(errorHandler)
};