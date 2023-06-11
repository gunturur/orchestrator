const express = require('express');
const router = express.Router();

const userDao = require('../daos/user');

router.post('/', async (req, res) => {
    const user = await userDao.createUser(req.body);
    res.json(user);
  });

module.exports = router;
