const express = require('express'),
      ctrl = require('../controllers'),
      middleware = require('./middleware'),
      db = require('../models');


/*
 * Initialize Router
*/

const router = express.Router();

router.get('/', ctrl.main.home );
router.get('/about', ctrl.main.about );

router.all('/user')
  .post( ctrl.user.create )

router.all('/user/:id')
  .post( ctrl.user.create );

router.get('/user', ctrl.main.about );

module.exports = router;
