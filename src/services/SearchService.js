import axios from 'axios';
import { API_URI } from '../utils/config';

class SearchService {
  constructor() {
    this.baseUrl = API_URI;
  }

  async searchByQuery({ query }) {
    const uri = `${this.baseUrl}search?query=${query}&search_type=category`;
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

const searchService = new SearchService();
export { searchService };
