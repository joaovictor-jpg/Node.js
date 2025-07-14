const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');
const MatriculaController = require('../controllers/MatriculaController.js');
const router = Router();

const pessoaController = new PessoaController();
const matriculaController = new MatriculaController();

router.get('/pessoas', (req, res) => pessoaController.pegaTodas(req, res));
router.get('/pessoas/todos', (req, res) => pessoaController.pegaTodasAsPessoas(req, res));
router.get('/pessoas/:id', (req, res) => pessoaController.pegaUmPorId(req, res));
router.post('/pessoas/', (req, res) => pessoaController.criaNovo(req, res));
router.put('/pessoas/:id', (req, res) => pessoaController.atuliza(req, res));
router.put('/pessoas/:estudante_id/cancela', (req, res) => pessoaController.cancelaRegistroEstudante(req, res));
router.delete('/pessoas/:id', (req, res) => pessoaController.exclui(req, res));
router.get('/pessoas/:estudante_id/matriculas', (req, res) => pessoaController.pegaMatriculasAtiva(req, res));
router.get('/pessoas/:estudante_id/matriculas/todos', (req, res) => pessoaController.pegaTodasAsMatriculas(req, res));
router.get('/pessoas/:estudante_id/matriculas/confirmadas', (req, res) => matriculaController.pegaMatriculaPorEstudante(req, res));
router.get('/pessoas/matriculas/lotada', (req, res) => matriculaController.pegaCursosLotados(req, res));
router.get('/pessoas/:estudante_id/matriculas/todos/:id', (req, res) => matriculaController.pegaUm(req, res));
router.post('/pessoas/:estudante_id/matriculas', (req, res) => matriculaController.criaNovo(req, res));
router.put('/pessoas/:estudante_id/matriculas/:id', (req, res) => matriculaController.atuliza(req, res));
router.delete('/pessoas/:estudante_id/matriculas/:id', (req, res) => matriculaController.exclui(req, res));

module.exports = router;