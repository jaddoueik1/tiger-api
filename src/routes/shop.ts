import express from 'express';
import { ProductService } from '../services/productService';
import { ApiResponse } from '../types';
import { requireAdmin } from '../middleware/requireAdmin';

const router = express.Router();

// Mock cart storage
const carts: { [userId: string]: any } = {};
const orders: any[] = [];

// GET /api/shop/categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await ProductService.getAllCategories();
    
    const response: ApiResponse<any> = {
      data: categories,
    };
    res.json(response);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch categories'
    });
  }
});

// GET /api/shop/products
router.get('/products', async (req, res) => {
  const { query, categoryId, inStock, sort, page = 1, limit = 12 } = req.query;
  
  try {
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    
    const result = await ProductService.getProducts({
      query: query as string,
      categoryId: categoryId as string,
      inStock: inStock === 'true',
      sort: sort as string,
      page: pageNum,
      limit: limitNum
    });
    
    const response: ApiResponse<any> = {
      data: result.products,
      meta: {
        page: pageNum,
        limit: limitNum,
        total: result.total,
        totalPages: result.totalPages,
      },
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch products'
    });
  }
});

// POST /api/shop/products
router.post('/products', requireAdmin, async (req, res) => {
  try {
    const product = await ProductService.createProduct(req.body);
    const response: ApiResponse<any> = { data: product };
    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create product'
    });
  }
});

// GET /api/shop/products/:id
router.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const product = await ProductService.getProductById(id);
    
    if (!product) {
      return res.status(404).json({
        error: 'Product Not Found',
        message: `Product with id "${id}" not found`,
      });
    }
    
    const response: ApiResponse<any> = {
      data: product,
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch product'
    });
  }
});

// PUT /api/shop/products/:id
router.put('/products/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductService.updateProduct(id, req.body);
    if (!product) {
      return res.status(404).json({
        error: 'Product Not Found',
        message: `Product with id "${id}" not found`,
      });
    }
    const response: ApiResponse<any> = { data: product };
    res.json(response);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to update product'
    });
  }
});

// DELETE /api/shop/products/:id
router.delete('/products/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductService.deleteProduct(id);
    if (!product) {
      return res.status(404).json({
        error: 'Product Not Found',
        message: `Product with id "${id}" not found`,
      });
    }
    const response: ApiResponse<any> = { data: { success: true } };
    res.json(response);
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to delete product'
    });
  }
});

// POST /api/shop/cart
router.post('/cart', requireAdmin, async (req, res) => {
  const { userId, items } = req.body;
  
  if (!userId || !items || !Array.isArray(items)) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'userId and items array are required',
    });
  }
  
  // Validate and calculate cart
  const cartItems = [];
  let subtotal = 0;
  
  for (const item of items) {
    const product = await ProductService.getProductById(item.productId);
    if (!product) continue;
    
    const variant = item.variantId ? 
      product.variants.find(v => v.id === item.variantId) : null;
    
    const price = variant?.price || product.price;
    const itemTotal = price * item.quantity;
    
    cartItems.push({
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity,
      price,
      title: product.title,
      variant: variant?.name,
    });
    
    subtotal += itemTotal;
  }
  
  const cart = {
    id: Date.now().toString(),
    userId,
    items: cartItems,
    subtotal,
    tax: subtotal * 0.08, // 8% tax
    total: subtotal * 1.08,
    createdAt: new Date(),
  };
  
  carts[userId] = cart;
  
  const response: ApiResponse<any> = {
    data: cart,
  };
  
  res.json(response);
});

router.get('/whatsapp-config', (req, res) => {
  const response: ApiResponse<any> = {
    data: {
      phoneE164: "+96176061065",
      template: "Order {orderId}\n{name}\n{address}\n{email}\n{items}\nTotal: {total} {currency}",
    },
  };
  res.json(response);
});

export { router as shopRoutes };
