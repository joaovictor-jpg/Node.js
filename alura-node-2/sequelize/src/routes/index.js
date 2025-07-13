const express = require('express');
const pessoas = require('./pessoaRoter.js');
const categoria = require('./categiraRoter.js');
const curso = require('./CursoRoter.js');

module.exports = (app) => {
  app.use(express.json(), pessoas, categoria, curso);
};