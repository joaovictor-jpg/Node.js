'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cursos',
      [
        {
          titulo: 'SpringBoot',
          descricao: 'Curso de Java com Spring Framework',
          date_inicio: '2023-01-01',
          categoria_id: 2,
          docente_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          titulo: 'Python Web com Django',
          descricao: 'Curso de aplicações web com Django',
          date_inicio: '2023-01-01',
          categoria_id: 3,
          docente_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          titulo: 'Orientação a Objetos com C#',
          descricao: 'Curso de C#: coleções, arquivos e libs',
          date_inicio: '2023-01-01',
          categoria_id: 4,
          docente_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cursos', null, {});
  }
};
