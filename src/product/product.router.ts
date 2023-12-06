import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  fetchProduct,
  fetchProducts,
  updateProduct,
} from './product.controller';
import { body } from './product.validation';

const router = Router();

router.get('/product', fetchProducts);

router.get('/product/:id', fetchProduct);

router.post('/product', body('name'), createProduct);

router.put('/product/:id', updateProduct);

router.delete('/product/:id', deleteProduct);

export default router;
