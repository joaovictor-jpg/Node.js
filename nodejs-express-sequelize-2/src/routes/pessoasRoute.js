const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');

const pessoaController = new PessoaController();

const router = Router();

router.get('/pessoas', (req, res) => pessoaController.pegaTodos(req, res));
router.get('/pessoas/:id', (req, res) => pessoaController.buscarPorid(req, res));
router.post('/pessoas', (req, res) => pessoaController.cadastrarPessoa(req, res));
router.put('/pessoas/:id', (req, res) => pessoaController.atualizar(req, res));
router.delete('/pessoas/:id', (req, res) => pessoaController.deletarPorId(req, res));


module.exports = router;