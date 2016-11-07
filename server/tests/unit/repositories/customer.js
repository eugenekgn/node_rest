'use strict';

import should from 'should';
import cloneDeep from 'lodash/cloneDeep';
import clone from 'lodash/clone';


import hooks from '../../helpers/hooks/repository';

const contacts = cloneDeep(require('../../../unit/repositories/data/customers.json'));