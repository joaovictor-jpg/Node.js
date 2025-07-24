import { Request, Response, NextFunction } from 'express';
import { items, Item } from '../models/item';

export const createItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const newItem: Item = { id: Date.now(), name };
    items.push(newItem);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

export const getItems = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

export const getItemById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const item = items.find((i) => i.id === id);
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

export const updateItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;
    const itemIndex = items.findIndex(i => i.id === id);
    if (itemIndex === -1) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    items[itemIndex].name = name;
    res.status(200).json(items[itemIndex]);
  } catch (error) {
    next(error);
  }
};

export const deleteItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const itemIndex = items.findIndex(i => i.id === id);
    if (itemIndex === -1) {
      res.status(404).json({ message: 'Item not fount' });
      return;
    }

    const deleteItem = items.splice(itemIndex, 1)[0];
    res.status(200).json(deleteItem);
  } catch (error) {
    next(error);
  }
};