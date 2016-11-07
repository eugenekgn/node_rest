'use strict';

import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';
import directoryInfo from './directoryInfo';
import path from 'path';
import {automapper} from 'automapper-ts';

export default class AppMapper {
  constructor({dbContext}) {
    this.dbContext = dbContext
    this._mapper = automapper;
  }

  map(methodName, modelFrom, modelTo, createMapFunc) {
    const self = this;
    const _mapper = self._mapper;

    const from = self.dbContext.isModel(modelFrom) ? modelFrom.name : modelFrom;
    const to = self.dbContext.isModel(modelTo) ? modelTo.name : modelTo;

    createMapFunc(_mapper, from, to);

    self[methodName] = (info) => {
      if (Array.isArray(info)) {
        return info.map(item => _mapper.map(from, to, item));
      } else {
        return info ? _mapper.map(from, to, info) : null;
      }
    };
  }

  registerMappings() {
    const self = this;
    const mappingsDirectory = path.resolve(__dirname, '..', 'services', 'mapping');

    directoryInfo.getAllFiles(mappingsDirectory)
      .forEach((mappingPath) => {
        require(mappingPath)(self, self.dbContext);
      });
  }

  ignoreProperty(options) {
    options.ignore();
  }

  mapToCamelCase(model, prop, value) {
    const propName = camelCase(prop);

    /* istanbul ignore else */
    if (model.hasOwnProperty(propName)) {
      model[propName] = value;
    }
  }

  mapToSnakeCase(model, prop, value) {
    /* istanbul ignore else */
    if (!Object.is(value, undefined)) {
      model[snakeCase(prop)] = value;
    }
  }
}


