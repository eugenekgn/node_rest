'use strict';

import validate from 'express-validation';
import customerValidation from '../validator/customer';


import BaseController from './base';

class CustomerController extends BaseController {
  registerRoutes() {
    const self = this;
    self.router.get('/', self.wrap(self.service.get));
    self.router.get('/:customerId', self.wrap(service.getCustomerById));
    self.router.post('/', validate(customerValidation.createCustomer), self.wrap(self.create));
    self.router.put('/', validate(customerValidation.updateCustomer), self.wrap(self.update));
    self.router.delete('/:customerId', controller.delete);

    return self.router;
  }
}



