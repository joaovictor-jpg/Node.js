const { Router } = require('express');
const CategoriaController = require('../controllers/CategoriaController.js');

const categoriaController = new CategoriaController();

const router = Router();

router.get('/categorias', (req, res) => categoriaController.pegaTodos(req, res));
router.get('/categorias/:id', (req, res) => categoriaController.buscarPorid(req, res));
router.post('/categorias', (req, res) => categoriaController.cadastrarPessoa(req, res));
router.put('/categorias/:id', (req, res) => categoriaController.atualizar(req, res));
router.delete('/categorias/:id', (req, res) => categoriaController.deletarPorId(req, res));

module.exports = router;