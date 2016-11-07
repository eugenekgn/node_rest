'use strict';

import lowerFirst from 'lodash/lowerFirst';
import directoryInfo from '../blocks/directoryInfo';
import path from 'path';

import awilix from 'awilix';
const Lifetime = awilix.Lifetime;

const LIFETIME_SINGLETON = {
  lifetime: Lifetime.SINGLETON
};


class IoCContainer {

  constructor(container) {
    this._container = container.createContainer();
  }

  /**
   * Calls all the register methods that are responsible for
   * traversing each component directory i.e (repositories, services, and controller),
   * and builds dependency graph for injections.
   */
  registerDependencies() {
    const self = this;

    self._registerDatabaseContext();
    self._registerRepositories();
    self._registerServices();
    self._registerControllers();

    self._registerMapper();
    self._registerLogger();
  }

  /**
   * Returns a particular object on demand
   * @param instance
   * @returns {*|String|Promise.<*>}
   */
  resolve(instance) {
    return this._container.resolve(instance);
  }

  /**
   * Builds dependency graph
   * @returns {*}
   */
  getAllDependencies() {
    return this._container.cradle;
  }

  _registerDatabaseContext() {
    import dataModels from '../dataServices/models';
    this._container.registerClass({
      dbContext: [dataModels, LIFETIME_SINGLETON]
    });
  }

  _registerRepositories() {
    const repositoryDirectory = path.resolve(__dirname, '..', 'dataServices', 'repositories');

    directoryInfo.getAllFiles(repositoryDirectory).filter((file) => {
      return !file.includes('mixins') && !file.endsWith('base.js');
    }).forEach((file) => {
      const repository = require(file);

      this._container.registerClass({
        [lowerFirst(repository.name)]: [repository, LIFETIME_SINGLETON]
      });
    });
  }

  _registerServices() {
    const servicesDirectory = path.resolve(__dirname, '..', 'services', 'internal');
    const externalServicesDirectory = path.resolve(__dirname, '..', 'services', 'external');

    const externalServicesPaths = directoryInfo.getAllFiles(externalServicesDirectory);
    const servicesPaths = directoryInfo.getAllFiles(servicesDirectory).concat(externalServicesPaths).filter((service) => {
      return !service.endsWith('base.js') && !service.includes('mixins') && !service.includes('senderStrategies');
    });

    servicesPaths.forEach((file) => {
      const service = require(file);

      this._container.registerClass({
        [lowerFirst(service.name)]: [service, LIFETIME_SINGLETON]
      });
    });
  }

  _registerControllers() {
    const controllersDirectory = path.resolve(__dirname, '..', 'web', 'controllers');

    directoryInfo.getAllFiles(controllersDirectory).forEach((file) => {
      const controller = require(file);

      this._container.registerClass({
        [lowerFirst(controller.name)]: [controller, LIFETIME_SINGLETON]
      });
    });
  }

  _registerMapper() {
    this._container.registerClass({
      mapper: [require('./mapper'), LIFETIME_SINGLETON]
    });
  }

  _registerLogger() {
    this._container.registerClass({
      logger: [require('./logger'), {
        lifetime: Lifetime.SINGLETON
      }]
    });
  }
}

const iocContainer = new IoCContainer(awilix);
iocContainer.registerDependencies();

export default iocContainer;

