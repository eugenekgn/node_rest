'use strict';

/* eslint-disable new-cap, no-magic-numbers */

import schemaFactory from './base';

let get = (sequelize, DataTypes) => {
  return {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.STRING(100)
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW')
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW')
    }
  }
};

export default schemaFactory.createSchema('base', get);