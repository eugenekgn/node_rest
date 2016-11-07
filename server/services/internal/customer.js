'use strict';

class CustomerService {
  constructor({
    customerRepository,
    mapper
  }) {
   this.customerRepository = customerRepository,
   this.mapper = mapper
  }


  getCustomerById(customerId) {

  }

  getAllCustomers() {

  }

  createCustomer(customer) {

  }

  updateCustomer(customer) {

  }

  removeCustomer(customerId) {

  }
}

// get() {
//   return this.service.getAllCustomers();
// }
//
// getCustomerById(customerId) {
//   return this.customerService.getCustomerById(customerId);
// }
//
// create(req) {
//   const self = this;
//   const customer = self._getCustomer(req);
//
//   return self.customerService.createCustomer(customer);
// }
//
// update(req) {
//   const self = this;
//   const customer = self._getCustomer(req);
//
//   return self.customerService.updateCustomer(customer);
// }
//
// delete(customerId) {
//   return self.customerService.removeCustomer(customerId);
// }