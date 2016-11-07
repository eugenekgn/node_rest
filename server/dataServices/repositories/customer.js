'use strict';

const BaseRepository = require('./base');

export default class CustomerRepository extends BaseRepository {
  constructor({dbContext}) {
    super(dbContext.Customer);
  }

  getCustomerByAge(age) {
    const self = this;

    return self.Model.findOne({
      where: {
        age
      }
    }).then(self.toJSON);
  }
}
