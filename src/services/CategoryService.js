import axios from 'axios';
import { API_URI } from '../utils/config';

class CategoryService {
  constructor() {
    this.baseUrl = API_URI;
  }

  async getCategories(){
    const uri=`${this.baseUrl}category`
    try {
        const response=await axios.get(uri);
        const data=await response.data;
        return data;
    } catch (error) {
        const data=await error.response.data;
        return data;
    }
  }

}

const categoryService = new CategoryService();
export {categoryService};
