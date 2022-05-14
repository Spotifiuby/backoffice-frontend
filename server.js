const express = require('express');
const port = process.env.PORT || 8080;
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const env        = require('dotenv');
const superagent = require('superagent')
const { createProxyMiddleware } = require('http-proxy-middleware');

env.config({ path: process.env.NODE_ENV !== 'production' ? '.env.local' : '.env'});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', "true");
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,' +
      ' X-HTTP-Method-Override, Content-Type, Accept, Authorization, api_key, token');
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', (req, res) => {
  return res.send('pong');
});

app.post('/api/validate-session', validateToken, (req, res) => {
  const headerToken = req.headers.authorization;
  if (!headerToken) {
    return res.status(401).send({ message: "No token provided" });
  }

  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    res.status(401).send({ message: "Invalid token" });
  }

  const token = headerToken.split(" ")[1];

  return superagent.post(`${process.env.GATEWAY_URI}/validate-session`)
  .auth(token, { type:'bearer' })
  .then(() => res.end())
  .catch(() => res.status(403).send({message: "Could not authorize"}));
});

app.use('/users-api', (req, res, next) => {
  const headerToken = req.headers.authorization;

  const token = headerToken.split(" ")[1];

  return superagent(req.method, process.env.GATEWAY_URI + req.originalUrl)
  .auth(token, { type:'bearer' })
  .then(result => {
    console.log(JSON.stringify(result));
    res.json(result).end();
  })
  .catch(error => console.log(error));
});

app.use('/songs-api', createProxyMiddleware({target: process.env.GATEWAY_URI, changeOrigin: true}));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log("Listening port ", port);
});

function validateToken(req, res, next) {
  let authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).end();
  }
  return next();
}
