const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');
const MatriculaController = require('../controllers/MatriculaController.js');

const pessoaController = new PessoaController();
const matriculaController = new MatriculaController();

const router = Router();

router.get('/pessoas', (req, res) => pessoaController.pegaTodos(req, res));
router.get('/pessoas/todos', (req, res) => pessoaController.pegaTodasAsPessoas(req, res));
router.get('/pessoas/:id', (req, res) => pessoaController.buscarPorid(req, res));
router.post('/pessoas', (req, res) => pessoaController.cadastrarPessoa(req, res));
router.put('/pessoas/:id', (req, res) => pessoaController.atualizar(req, res));
router.delete('/pessoas/:id', (req, res) => pessoaController.deletarPorId(req, res));
router.get('/pessoas/:estudante_id/matriculas', (req, res) => pessoaController.pegaMatriculasAtivas(req, res));
router.get('/pessoas/:estudante_id/matriculas/todos', (req, res) => pessoaController.pegaTodasAsMatriculas(req, res));
router.get('/pessoas/:estudante_id/matriculas/:id', (req, res) => matriculaController.pegaUm(req, res));
router.post('/pessoas/:estudante_id/matriculas', (req, res) => matriculaController.cadastrarPessoa(req, res));
router.put('/pessoas/:estudante_id/matriculas/:id', (req, res) => matriculaController.atualizar(req, res));
router.delete('/pessoas/:estudante_id/matriculas/:id', (req, res) => matriculaController.deletarPorId(req, res));


module.exports = router;