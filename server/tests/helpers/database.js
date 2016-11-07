'use strict';

import values from 'lodash/values';
import path from 'path';
import directoryInfo from '../../shared/directoryInfo';
import iocContainer from '../../shared/iocContainer';

const dbContext = iocContainer.resolve('dbContext');

const _recursiveExecution = (promises) => {
  if (promises.length > 0) {
    const promise = promises.pop();

    return promise().then(()=> {
      _recursiveExecution(promises);
    })
  } else {
    return Promise.resolve();
  }
};

const stubs = (function () {
  const result = [];
  const repositoriesPath = path.resolve(__dirname, 'stubs', 'repositories');

  directoryInfo.getAllFiles(repositoriesPath)
    .filter((file) => {
      return !file.endsWith('baseStub.js')
    })
    .forEach((file) => {
      const stub = require(file);

      result.push(stub);
    });

  return result;

})();

function clearAllTables() {
  const query = {
    where: {},
    truncate: true,
    cascade: true
  };

  const models = values(dbContext.sequelize.models);

  return Promise.all(models.map(model => model.count())).then((results) => {
    const modelsToTruncate = models.filter((model, index) => results[index] > 0);

    return _recursiveExecution(modelsToTruncate.map(model => {
      return () => {
        return model.count().then((count) => {
          if (count > 0) {
            return model.destroy(query);
          } else {
            return Promise.resolve();
          }
        });
      };
    }));
  });
}

function clearAllStubs() {
  stubs.forEach(stub => stub.clear());
}

export {clearAllTables, clearAllStubs};