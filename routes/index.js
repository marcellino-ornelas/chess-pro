const express = require('express'),
      ctrl = require('../controllers'),
      passport = require('passport'),
      middleware = require('./middleware'),
      db = require('../models');

/*
 * Initialize Router
*/
const router = express.Router();


router.use(function( req, res, next ){

  res.locals.title = 'Chess-pro';
  console.log(req.user)

  // add user to locals
  res.locals.user = req.user || null;

  /*
   * Get all flash messages before rendering
  */
  res.render = middleware.renderWithMessages(res.render);

  next();

});

router.use([ '/signup', '/login' ], middleware.denySignedIn );

/*
 * Main
*/
router.get('/', ctrl.main.home );
router.get('/about', ctrl.main.about );

/*
 * Users
*/
router.route('/user')
  .post( ctrl.user.create );

router.route('/user/:id')
  .get( ctrl.user.show )
  .put( ctrl.user.update )
  .delete( ctrl.user.delete );

router.get('/signup', ctrl.user.new );

router.route('/login')
  .get( ctrl.user.login )
  .post( passport.authenticate('local', {
    successRedirect: '/profile',
    failureFlash: true,
    failureRedirect: '/login'
  }) );

router.get('/profile', middleware.isLoggedIn, ctrl.user.profile );
router.get( '/logout', ctrl.user.logout );


/*
 * Game
*/

router.get('/play', ctrl.game.index );
router.get('/board', ctrl.game.board );


module.exports = router;
