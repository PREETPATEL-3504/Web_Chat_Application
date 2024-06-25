const express = require('express');
const { sendmessage, getMessage } = require('../Controller/MessageController');
const auth = require('../Middelware/isAuth');
const router = express.Router();

router.route('/send/:id').post(auth,sendmessage);
router.route('/:id').get(auth, getMessage);

module.exports = router;
