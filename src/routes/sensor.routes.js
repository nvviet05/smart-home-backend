const router = require('express').Router();
const sensorController = require('../controllers/sensor.controller');
const auth = require('../middleware/auth.middleware');

router.use(auth);

router.get('/latest', sensorController.getLatest);
router.get('/history', sensorController.getHistory);
router.post('/data', sensorController.create);

module.exports = router;
