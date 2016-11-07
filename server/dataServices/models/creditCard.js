'use strict';

import schema from './../schemas/creditCard';

module.exports = function (sequelize, DataTypes) {
  const fields = schema.get(sequelize, DataTypes);

  const CreditCard = sequelize.define(schema.modelName, fields, {
    tableName: schema.tableName,

    classMethods: {
      associate: (models) => {
        CreditCard.belongsTo(models.Customer, {
          onDelete: 'SET NULL'
        });
      }
    }
  });

  return CreditCard;
};