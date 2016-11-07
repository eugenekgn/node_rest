'use strict';

const BaseRepository = require('./base');

class CreditCardRepository extends BaseRepository {
  constructor({dbContext}) {
    super(dbContext.CreditCard);
  }
}

export default CreditCardRepository;