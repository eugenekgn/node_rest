'use strict';

import schema from '../schemas/customer';

export default function (sequelize, DataTypes) {
  const fields = schema.get(sequelize, DataTypes);

  const Customer = sequelize.define(schema.modelName, fields, {
    tableName: schema.tableName,

    classMethods: {
      associate: (models) => {
        Customer.hasMany(models.CreditCard, {
          onDelete: 'SET NULL'
        });
      }
    }
  });

  return Customer;
}