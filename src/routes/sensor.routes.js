const router = require('express').Router();
const sensorController = require('../controllers/sensor.controller');
const auth = require('../middleware/auth.middleware');

// Tất cả route sensor đều cần xác thực
router.use(auth);

router.get('/latest', sensorController.getLatest);
router.get('/history', sensorController.getHistory);
router.post('/', sensorController.create);

module.exports = router;
