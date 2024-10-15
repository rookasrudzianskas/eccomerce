import { Request, Response } from 'express';

export const getProducts = (req: Request, res: Response) => {
  res.send('the list of products 123');
};

export const getProductById = (req: Request, res: Response) => {
  console.log(req.params);
  res.send(`A product with id ${req.params.id}`);
};

export const createProduct = (req: Request, res: Response) => {
  res.send('New product created');
};

export const updateProduct = (req: Request, res: Response) => {
  res.send('Product updated');
};

export const deleteProduct = (req: Request, res: Response) => {
  res.send('Product deleted');
};
