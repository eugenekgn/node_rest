'use strict';

import BaseRepositoryStub from './baseStub';

export default class CustomerRepositoryStub extends BaseRepositoryStub {
  getCustomerByAge(age) {
    return Promise.resolve(this.getInternalItems().find(customer => customer.age === age))
  }
}