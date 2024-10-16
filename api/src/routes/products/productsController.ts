import { Request, Response } from 'express';
import { db } from '../../db/index';
import { productsTable } from '../../db/productsSchema';
import { eq } from 'drizzle-orm';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await db.select().from(productsTable);
  } catch (error) {
    res.status(500).send('Error fetching products');
  }
};

export const getProductById = (req: Request, res: Response) => {
  console.log(req.params);
  res.send(`A product with id ${req.params.id}`);
};

export const createProduct = (req: Request, res: Response) => {
  console.log(req.body);
  res.send('New product created');
};

export const updateProduct = (req: Request, res: Response) => {
  res.send('Product updated');
};

export const deleteProduct = (req: Request, res: Response) => {
  res.send('Product deleted');
};
