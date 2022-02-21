const express = require('express');
const productCont = require('../controllers/productControllers');
const ViewCont = require('../controllers/viewsController');
const router = express.Router();

// REQUIRED MODULES
//////////////////////////////////////////

router
  .route('/Top10-Laptops')
  .get(productCont.laptopMiddleware, productCont.getProduct);

// router.route('/Offers').get(ViewCont.getOffer);

// productCont.laptopMiddleware,
//.post(productCont.laptopMiddleware)

router
  .route('/Top10-Mobiles')
  .get(productCont.MobileMiddleware, productCont.getMobproduct);

//productCont.MobileMiddleware,
router.route('/').get(productCont.getProduct).post(productCont.createProduct);

router
  .route('/:id')
  .get(productCont.getProductByid)
  .patch(productCont.updateProduct)
  .delete(productCont.deleteProduct);

module.exports = router;
