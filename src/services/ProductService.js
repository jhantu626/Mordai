import axios from 'axios';
import { API_URI } from '../utils/config';

class ProductService {
  constructor() {
    this.baseUrl = API_URI;
  }

  /*
    - GET PRODUCTS
    URI: /products
  */
  async getProducts() {
    const uri = `${this.baseUrl}products`;
    try {
      const response = await axios.get(uri);
      const data = await response.data;
      return data;
    } catch (error) {
      const data = await error.response.data;
      return data;
    }
  }

  async getProductsWithPage({ pageno = 1 }) {
    const uri = `${this.baseUrl}products?page=${pageno}`;
    try {
      const response = await axios.get(uri);
      const data = await response.data;
      return data;
    } catch (error) {
      const data = await error.response.data;
      return data;
    }
  }

  async getProductByCategory({ category = 0 }) {
    const uri = `${this.baseUrl}products?${
      category > 0 ? `category_id=${category}` : ''
    }`;
    console.log(uri)
    try {
      const response = await axios.get(uri);
      const data = await response.data;
      return data;
    } catch (error) {
      const data = await error.response.data;
      return data;
    }
  }

  // GET PRODUCT BY ID
  async getProductById({ id }) {
    const uri = `${this.baseUrl}products/${id}`;
    try {
      const response = await axios.get(uri);
      const data = await response.data;
      return data;
    } catch (error) {
      const data = await error.response.data;
      return data;
    }
  }
}

const productService = new ProductService();

export { productService };
