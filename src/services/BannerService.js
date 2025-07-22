import { API_URI } from '../utils/config';

class BannerService {
  constructor() {
    this.baseUrl = API_URI;
  }

  async getBanners() {
    const uri = `${this.baseUrl}banner`;
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

const bannerService = new BannerService();
export { bannerService };
