const RoleService = require('../services/roleService');

const roleService = new RoleService();

class RoleController {
  static async createRole(req, res) {
    try {
      const { nome, descricao } = req.body;
      const newRole = await roleService.createRole({ nome, descricao });
      res.status(201).json(newRole);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getRoles(req, res) {
    try {
      const roles = await roleService.getRoles();
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getRoleById(req, res) {
    try {
      const { id } = req.params;
      const role = await roleService.getRoleById(id);
      if (!role) {
        return res.status(404).json({ error: 'Role not found' });
      }
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateRole(req, res) {
    try {
      const { id } = req.params;
      const { nome, descricao } = req.body;
      const updatedRole = await roleService.updateRole(id, { nome, descricao });
      if (!updatedRole) {
        return res.status(404).json({ error: 'Role not found' });
      }
      res.status(200).json(updatedRole);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteRole(req, res) {
    try {
      const { id } = req.params;
      const deletedRole = await roleService.deleteRole(id);
      if (!deletedRole) {
        return res.status(404).json({ error: 'Role not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = RoleController