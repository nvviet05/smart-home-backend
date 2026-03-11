const router = require('express').Router();
const deviceController = require('../controllers/device.controller');
const auth = require('../middleware/auth.middleware');

// Tất cả route device đều cần xác thực
router.use(auth);

router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getById);
router.post('/', deviceController.create);
router.put('/:id', deviceController.update);
router.patch('/:id/toggle', deviceController.toggle);
router.delete('/:id', deviceController.remove);

module.exports = router;
