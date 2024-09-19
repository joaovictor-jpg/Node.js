const { Router } = require('express');
const MatriculaController = require('../controllers/MatriculaController.js');

const matriculaController = new MatriculaController();
const router = Router();

router.get('/matriculas', (req, res) => matriculaController.pegaTodos(req, res));
router.get('/matriculas/:id', (req, res) => matriculaController.buscarPorid(req, res));
router.put('/matriculas/:id', (req, res) => matriculaController.atualizar(req, res));
router.delete('/matriculas/:id', (req, res) => matriculaController.deletarPorId(req, res));

module.exports = router;
