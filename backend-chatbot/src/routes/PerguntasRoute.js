const express = require('express');
const router = express.Router();

const PerguntasController = require('../controllers/PerguntasController');

router.get('/list', PerguntasController.list);
router.post('/create', PerguntasController.create);
router.get('/get/:id', PerguntasController.get);
router.post('/update/:id', PerguntasController.update);
router.post('/delete', PerguntasController.delete);

module.exports = router;