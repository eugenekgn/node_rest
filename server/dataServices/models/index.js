'use strict';

import Sequelize from 'sequelize';
import config from 'config';
import directoryInfo from '../../shared/directoryInfo'

const databaseConfig = config.get('database');

class DatabaseContext {
  constructor({logger}) {

    const define = {
      freezeTableName: true,
      underscored: true,
      timestamps: true,
      syncOnAssociation: false,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false,
    };

    const sequelizeConfig = {
      dialect: databaseConfig.dialect,
      host: databaseConfig.host,
      port: databaseConfig.port,
      pool: databaseConfig.pool,
      define: define
    };

    const sequelize = new Sequelize(
      databaseConfig.database,
      databaseConfig.username,
      databaseConfig.password,
      sequelizeConfig
    );

    //TODO: add regex exclusion to remove filters
    directoryInfo.getAllFiles(__dirname)
      .filter((file)=> {
        return !file.endsWith('index.js');
      })
      .forEach((file)=> {
        const model = sequelize.imported(file);

        this[model.name] = model;
      });

    Object.keys(this).forEach((modelName)=> {
      if (this[modelName].associate) {
        this[modelName].associate(this)
      }
    });

    this.sequelize = sequelize;
    this.Sequelize = Sequelize;
  }

  isModel(model) {
    return model instanceof this.Sequelize.Model
  }

  isTransaction(func) {
    return this.sequelize.transaction((transaction) => {
      return func({
        transaction
      });
    });
  }
}

export default DatabaseContext;
