const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
	res.send('Got a POST request')

})

module.exports = router;