'use strict';

import {snakeCase, upperFirst, camelCase} from 'lodash';

class Schema {
  constructor(name, getFunction) {
    this._name = name;
    this._get = getFunction;
  }

  get tableName() {
    return snakeCase(this._name);
  }

  get modelName() {
    return upperFirst(camelCase(this._name));
  }

  get(sequelize, DataTypes) {
    return this._get(sequelize, DataTypes);
  }
}

export default function createSchema(name, getFunction) => {
  return new Schema(name, getFunction);
}