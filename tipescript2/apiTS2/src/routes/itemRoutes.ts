import { Router } from 'express';
import { createItem, deleteItem, getItemById, getItems, updateItem } from '../controllers/itemController';
import { schemaName } from '../DTOs/schemaName';
import validate from '../validation/validationName';

const router = Router();

router.get('/', getItems);
router.get('/:id', getItemById);
router.post('/', validate(schemaName), createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;