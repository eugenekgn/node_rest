'use strict';

import throng from 'throng';
import iocContainer from './server/shared/iocContainer';
import config from 'config';

const logger = iocContainer.resolve('logger');
const serverConfig = config.get('server');
const runtimeConfig = {};

if (!serverConfig.get('isMultithreaded')) {
  runtimeConfig.workers = 1;
}

throng(runtimeConfig, ()=> {
  import app from './dist/server/app';
  const port = serverConfig.get('port');

  app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
  });
});