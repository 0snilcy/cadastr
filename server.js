const express = require('express');
const path = require('path');
const apiRouter = require('./server/api');
const morgan = require('morgan');

const args = process.argv
  .slice(2)
  .filter((arg) => arg.startsWith('--'))
  .reduce((obj, arg) => {
    const [key, value] = arg.slice(2).split(`=`);
    obj[key] = value;
    return obj;
  }, {});

const app = express();
const PORT = args.port || 1337;

app.use(express.json());
app.use(morgan('dev'));

const staticDir = path.resolve(__dirname, './build');
app.use(express.static(staticDir));

app.use('/api', apiRouter);

app.use((_, res) => res.sendStatus(404));

app.listen(PORT, () => {
  console.log(`Server has been started on http://localhost:${PORT}`);
});
