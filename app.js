const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

const index = require('./routes/index');

// http→httpsリダイレクト
if (process.env.APP_ENV === 'production' || process.env.APP_ENV === 'staging') {
  app.use ((req, res, next) => {
    const schema = (req.headers['x-forwarded-proto'] || '').toLowerCase();
      if (schema === 'https') {
      next();
    } else {
      res.redirect(301, 'https://' + req.headers.host + req.url);
    }
  });
}

app.use('/', index);

if (process.env.APP_ENV === 'production' || process.env.APP_ENV === 'staging') {
  module.exports = app
} else {
  const server = app.listen(port, () => {
    console.log('Node.js is listening to PORT:' + server.address().port);
  });
}