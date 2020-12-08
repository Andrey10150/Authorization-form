import axios from 'axios';

const API_URL = 'http://localhost:8000/api/countries';

class CountryService {
  getAllCountries() {
    return axios.get(API_URL);
  }
}

export default new CountryService();