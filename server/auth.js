require('dotenv').config();

const express = require('express');
const uuid = require('uuid').v4;
const authRouter = express.Router();

const authBase = [];

authRouter.use(async (req, res) => {
  if (process.env.NODE_ENV === 'development') {
    const key = uuid();
    authBase.push(key);

    return res.send({
      key,
    });
  }

  if (req.body.password === process.env.PASSWORD) {
    const key = uuid();
    authBase.push(key);

    return res.send({
      key,
    });
  }

  res.send({
    key: null,
  });
});

module.exports = {
  authRouter,
  authBase,
};
