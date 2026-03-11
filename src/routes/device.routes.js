const router = require('express').Router();
const deviceController = require('../controllers/device.controller');
const auth = require('../middleware/auth.middleware');

router.use(auth);

router.get('/', deviceController.getAll);
router.post('/control', deviceController.control);
router.post('/status', deviceController.reportStatus);
router.get('/command', deviceController.getCommand);

module.exports = router;
