const { Router } = require('express');

const RoleController = require('../controllers/roleController')

const router = Router();

router
    .post('/roles', RoleController.createRole)
    .get('/roles', RoleController.getRoles)
    .get('/roles/:id', RoleController.getRoleById)
    .put('/roles/:id', RoleController.updateRole)
    .delete('/roles/:id', RoleController.deleteRole);

module.exports = router;