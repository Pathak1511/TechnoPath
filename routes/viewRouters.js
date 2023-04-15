const express = require('express');
const viewsCont = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

affordable = (req, res, next) => {
  req.query.subtype = 'affordable';
  next();
};

flagship = (req, res, next) => {
  req.query.subtype = 'Flagship';
  next();
};

mid_range = (req, res, next) => {
  req.query.subtype = 'midrange';
  next();
};

profession = (req, res, next) => {
  req.query.subtype = 'professional';
  next();
};

programming = (req, res, next) => {
  req.query.subtype = 'programmer';
  next();
};

gaming = (req, res, next) => {
  req.query.subtype = 'gaming';
  next();
};

// router.get('/laptop', viewsCont.getLaptops);

// HOME ROUTE
router.get('/', viewsCont.getHome);

// LAPTOP ROUTE
router.get(
  '/profession',
  authController.protect,
  profession,
  viewsCont.getLaptops
);
router.get('/programming', programming, viewsCont.getLaptops);
router.get('/gaming', gaming, viewsCont.getLaptops);

// MOBILE ROUTE
router.get('/affordable', affordable, viewsCont.getMobiles);
router.get('/flagship', flagship, viewsCont.getMobiles);
router.get('/midrange', mid_range, viewsCont.getMobiles);

//OTHER ROUTE
router.get('/other', viewsCont.getOther);

module.exports = router;
