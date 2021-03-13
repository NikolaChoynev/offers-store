const express = require('express');
const router = express.Router();
const { auth } = require('../utils');

const { offerController, commentsController } = require('../controllers');

router.get('/', offerController.getOffers);
router.post('/', auth(), offerController.createOffer);

router.get('/:offerId', offerController.getOffer);
router.put('/:offerId', auth(), offerController.editOffer);
router.delete('/:offerId', auth(), offerController.deleteOffer);
router.post('/:offerId', auth(), offerController.bookingOffer);

router.post('/comment/:offerId', auth(), commentsController.createComment);
router.put('/comment/:commentId', auth(), commentsController.editComment);
router.delete('/:offerId/comment/:commentId', auth(), commentsController.deleteComment)

module.exports = router;