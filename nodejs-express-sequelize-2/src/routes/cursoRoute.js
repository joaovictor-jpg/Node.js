const { Router } = require('express');
const CursoController = require('../controllers/CursoController.js');

const cursoController = new CursoController();

const router = Router();

router.get('/cursos', (req, res) => cursoController.pegaTodos(req, res));
router.get('/cursos/:id', (req, res) => cursoController.buscarPorid(req, res));
router.post('/cursos', (req, res) => cursoController.cadastrarPessoa(req, res));
router.put('/cursos/:id', (req, res) => cursoController.atualizar(req, res));
router.delete('/cursos/:id', (req, res) => cursoController.deletarPorId(req, res));

module.exports = router;
