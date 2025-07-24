import { Request, Response, NextFunction } from "express";
import Customer from "../models/customer";
import customerRepository from "../repositories/customerRepository";

async function getCustomer(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    const customer = await customerRepository.getCustomer(id);

    if (customer)
        return res.status(200).json(customer);
    else
        return res.status(404).json({message: "Customer not found"});
};

async function getCustomers(req: Request, res: Response, next: NextFunction) {
    const customers = await customerRepository.getCustomers();

    return res.status(200).json(customers);
};

async function addCustomer(req: Request, res: Response, next: NextFunction) {
    const newCustomer: Customer = req.body;

    const customer = await customerRepository.addCustomer(newCustomer);

    res.status(200).json(customer);
};

async function updateCustomer(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    const customerData: Customer = req.body;

    const customer = await customerRepository.updateCustomer(id, customerData);

    res.status(200).json(customer);
};

async function deleteCustomer(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);

    const isDelete = await customerRepository.deleteCustomer(id);

    if (isDelete)
        res.status(204).json({ message: "Customer Delet" })
}


export default {
    getCustomer,
    getCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer
}
