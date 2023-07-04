const { log } = require('console');
const express = require('express');
const server = express();

const port = 3000;

require('dotenv').config({path: './config/.env'});
const routeUsers = require('./routes/usersRoutes.js');
const bodyParser = require('body-parser')

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use('/user', routeUsers);

server.listen(port, () => console.log(`Notre application est démarrée sur : http://localhost:${port}`));