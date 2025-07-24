import { Request, Response } from 'express';
import { getItems } from '../src/controllers/itemController';
import { items } from  '../src/models/item';

describe('Item Controller', () => {
  it('Should return an empty array when no items exist', () => {
    const req = {} as Request;
    const statusMock = jest.fn().mockReturnThis();
    const res = {
      status: statusMock,
      json: jest.fn()
    } as unknown as Response;

    items.length = 0;

    getItems(req, res, jest.fn());
    
    expect(statusMock).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith([]);
  });
});