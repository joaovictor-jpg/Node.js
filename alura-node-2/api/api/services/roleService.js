const RoleController = require('../controllers/roleController');
const dataBase = require('../models');
const { v4: uuidv4 } = require('uuid')

class RoleService {
    async createRole(dto) {
        try {
            const roles = await dataBase.roles.findOne({
                where: {
                    nome: dto.nome
                }
            })

            if (roles) {
                throw new Error('Role already exists');
            }

            const newRole = await dataBase.roles.create({
                id: uuidv4(),
                nome: dto.nome,
                descricao: dto.descricao
            })

            return newRole;
        } catch (error) {
            throw new Error('Error creating role: ' + error.message);
        }
    }

    async getRoles() {
        try {
            const roles = await dataBase.roles.findAll();
            return roles;
        } catch (error) {
            throw new Error('Error fetching roles: ' + error.message);
        }
    }

    async getRoleById(id) {
        try {
            const role = await dataBase.roles.findByPk(id);
            return role;
        } catch (error) {
            throw new Error('Error fetching role by ID: ' + error.message);
        }
    }

    async updateRole(id, dto) {
        try {
            const role = await dataBase.roles.findByPk(id);
            if (!role) {
                return null;
            }

            role.nome = dto.nome;
            role.descricao = dto.descricao;

            await role.save();
            return role;
        } catch (error) {
            throw new Error('Error updating role: ' + error.message);
        }
    }

    async deleteRole(id) {
        try {
            const role = await dataBase.roles.findByPk(id);
            if (!role) {
                return null;
            }

            await role.destroy();
            return role;
        } catch (error) {
            throw new Error('Error deleting role: ' + error.message);
        }
    }
}

module.exports = RoleService