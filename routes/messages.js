const express = require('express');
const router = express.Router();

//libs
const Messages = require('../src/lib/Messages');

router.get('/list', (req, res, next) => {
    Messages.list('@Room:eQ5nBVwgv', messages => {
        res.json(messages);
    });
});

module.exports = router;
