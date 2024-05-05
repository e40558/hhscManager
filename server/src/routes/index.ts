export{}

const express = require('express');
const router = express.Router();


router.use('/user', require('./userRoutes'))


export default router;