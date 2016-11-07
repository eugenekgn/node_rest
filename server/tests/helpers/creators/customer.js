'use strict';

import cloneDeep from 'lodash/cloneDeep';
import iocContainer from '../../../shared/iocContainer';
import mappings from '../utils/mappings';

import contactsData from '../../unit/repositories/data/customers.json';

import createCreaditCards from './creditCard';

const contact = cloneDeep(contactsData);

const {customerRepository} = iocContainer.getAllDependencies();

export default  () => {
  createCreaditCards
}