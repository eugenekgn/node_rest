'use strict';

import {clearAllTables}  from '../../helpers/database';

export default {
  before: ()=> clearAllTables(),
  after: ()=> clearAllTables()
}