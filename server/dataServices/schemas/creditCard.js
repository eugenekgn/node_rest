'use strict';

/* eslint-disable new-cap, no-magic-numbers */

import schemaFactory from './base';
import {CARD_TYPES} from '../../constants';

let get = (sequelize, DataTypes) => {
  return {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    number: {
      type: DataTypes.INTEGER
    },
    card_type: {
      type: DataTypes.ENUM(CARD_TYPES)
    },
  }
};

export default schemaFactory.createSchema('credit_card', get);