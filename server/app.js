import express from 'express';
const bootstrap = require('./bootstrap');

export default () => {
  const app = express();

  bootstrap(app);

  return app;
};


