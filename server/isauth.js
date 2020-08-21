require('dotenv').config();

const express = require('express');
const isAuthRouter = express.Router();
const { authBase } = require('./auth');

isAuthRouter.use(async (req, res) => {
  const header = req.headers.authorization;
  if (header) {
    const key = header.split(` `)[1];
    return res.send({
      auth: authBase.includes(key),
    });
  }

  return res.send({
    auth: false,
  });
});

module.exports = isAuthRouter;
