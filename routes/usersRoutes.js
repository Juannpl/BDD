const express = require("express");
const router = express.Router();

const userCtrl = require('../controllers/usersController')

router.post('/register', userCtrl.register)

module.exports = router;