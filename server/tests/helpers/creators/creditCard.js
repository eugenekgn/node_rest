'use strict';

import cloneDeep from 'lodash/cloneDeep';
import iocContainer from '../../../shared/iocContainer';


import creadCardData from '../../unit/repositories/data/creditCards.json';
const creadCards = cloneDeep(creadCardData);

const creditCardRepository = iocContainer.resolve('creditCardRepository');

export default () => {
  return new Promise((resolve, reject)=> {
    creditCardRepository.bulkCreate(creadCards).then((response)=> {
      resolve(response);
    }, (err)=> {
      reject(err);
    })
  })
};


