const express = require('express');
const apiRouter = express.Router();
const axios = require('axios');

const api = axios.create({
  baseURL: `https://apirosreestr.ru/api`,
  timeout: 30000,
  headers: {
    Token: 'GRGW-EZEB-K7SH-YTSL',
    'Content-Type': 'application/json',
  },
});

apiRouter.use(async (req, res) => {
  try {
    const response = await api.post(`/cadaster/search`, req.body);
    return res.send(response.data);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

module.exports = apiRouter;
