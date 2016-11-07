'use strict';

import merge from 'lodash/merge';
import clone from 'lodash/clone';
import find from 'lodash/find';

export default class BaseRepositoryStub {
  constructor() {
    this.fakeDb = {
      items: [],
      lastId: 1
    }
  }

  create(info) {
    const self = this;

    info.id = self.fakeDb.lastId++;
    self.getInternalItems().push(clone(info));

    return Promise.resolve(info);
  }

  upsert(model) {
    const self = this;

    const fakeDb = self.fakeDb;
    const modelInDb = self.getInternalItems().find(m => m.id === model.id);
    let isCreated = false;

    if (modelInDb) {
      merge(modelInDb, model);
    } else {
      model.id = fakeDb.lastId++;
      self.getInternalItems().push(model);
      isCreated = true;
    }

    return Promise.resolve(isCreated);
  }

  count() {
    return Promise.resolve(this.getInternalItems().length);
  }

  findById(id) {
    const record = this.getInternalItems().find(item => item.id === id);

    return Promise.resolve(record);
  }

  update(info, where) {
    const item = find(this.getInternalItems(), where);

    merge(item, info);

    return Promise.resolve([item]);
  }

  remove(idObj) {
    const self = this;

    self.fakeDb.items = self.getInternalItems().filter(item => item.id !== idObj.id);
    return Promise.resolve();
  }

  bulkCreate(models) {
    const self = this;

    models.forEach(self.create.bind(self));

    return Promise.resolve(models);
  }

  bulkUpsert(models) {
    return Promise.all(models.map(model => {
      return this.upsert(model);
    }));
  }

  getInternalItems() {
    return this.fakeDb.items;
  }

}