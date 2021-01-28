const next = require('next');
const express = require('express');
const brightness = require('osx-brightness');

const port = 3000;
const dev = true;

const app = next({ dev });
const server = express();
const handle = app.getRequestHandler()

app.prepare().then(() => {
  server.get('/get-brightness', async (req, res) => {
    const level = await brightness.get()
    res.send(level.toString());
  });

  server.get('/add', async (req, res) => {
    const initial = await brightness.get();
    const newVal = initial + 0.1;

    if (initial < 0.9) {
      await brightness.set(newVal);
      console.log('add');
      return res.send(newVal.toString())
    }

    res.send(initial + " (can't go higher)");
  });

  server.get('/minus', async (req, res) => {
    const initial = await brightness.get();
    const newVal = initial - 0.1;

    if (initial > 0.1) {
      await brightness.set(newVal);
      console.log('minus');
      return res.send(newVal.toString())
    }

    res.send(initial + " (can't go lower)");
  });

  server.all('*', (req, res) => handle(req, res));

  server.listen(port, () => console.log(`listening on port ${port}...`))
}).catch(err => {
  console.log(err);
});
