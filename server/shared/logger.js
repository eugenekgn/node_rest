'use stroct';

import fs from 'fs';
import path from 'path';
import winston from 'winston';
import DailyRotateFileTransport from 'winston-daily-rotate-file';
import config from 'config';

export default class Logger {

  constructor() {
    this.loggingConfig = config.get('logger');
    this.transportConfigs = this.loggingConfig.get('transport');

    this.initialize();
  }

  initialize() {
    const self = this;
    const transports = [];


    self._createFolder();
    self._setConsoleTransport(transports);
    self._setFileTransport(transports);

    self._logger = new winston.Logger({
      transports
    });
  }

  info(message) {
    this._logger.info(message);
  }

  error(message) {
    this._logger.error(message);
  }

  logDb(message) {
    this._logger.info(message);
  }


  /**
   * Create folder for logging
   * @private
   */
  _createFolder() {
    const logsDirectory = path.join(process.cwd(), this.loggingConfig.get('filePath'));

    if (!fs.existsSync(logsDirectory)) {
      fs.mkdirSync(logsDirectory);
    }
  }

  /**
   * Logging output determent file or console
   * @param transports
   * @private
   */
  _setConsoleTransport(transports) {
    if (this.transportConfigs.includes('console')) {
      transports.push(new winston.transports.Console({
        timestamp: true
      }));
    }
  }

  _setFileTransport(transports) {
    if (this.transportConfigs.get('transports').includes('dailyRotateFile')) {
      transports.push(new DailyRotateFileTransport({
        filename: path.join(process.cwd(), this.loggingConfig.get('appLogFilePath')),
        datePattern: '.yyyy-MM-dd'
      }));
    }
  }
}