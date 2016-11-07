'use strict';

const ErrorDTO = require('dto/error');

class Response {
  wrap(fn) {
    const self = this;

    return (req, res, next) => {
      fn(req, res, next).then((data) => {
        self.send(res, null, data);
      }, (err) => {
        self.send(res, err);
      });
    };
  }

  send(res, err, data) {
    const ERROR_STATUS_CODE = 500;
    const SUCCESS_STATUS_CODE = 200;

    if (err) {
      res.status(err.status || ERROR_STATUS_CODE);

      if (err instanceof ErrorDTO) {
        res.send(err);
      } else {
        res.send();
      }
    } else {
      res.statusCode = data && data.statusCode || SUCCESS_STATUS_CODE;
      res.json(data);
    }
  }
}

export default new Response();