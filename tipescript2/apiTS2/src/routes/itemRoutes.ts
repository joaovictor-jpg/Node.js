import { Router } from 'express';
import { createItem, deleteItem, getItemById, getItems, updateItem } from '../controllers/itemController';
import { body } from 'express-validator';
import { isEmpty } from '../validation/nameIsEmpty';

const router = Router();

router.get('/', getItems);
router.get('/:id', getItemById);
router.post('/',
  body('name').trim().notEmpty().withMessage('Name cannot be empty'),
  isEmpty,
  createItem
);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;