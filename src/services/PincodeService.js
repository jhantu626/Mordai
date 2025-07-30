import axios from 'axios';
import { API_URI } from '../utils/config';

class PincodeService {
  constructor() {
    this.baseUrl = API_URI;
  }

  async checkPincodeAvailablity({ pincode }) {
    const uri = `${this.baseUrl}zones?pincode=${pincode}`;
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

const pincodeService = new PincodeService();

export { pincodeService };
