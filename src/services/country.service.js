import axios from 'axios';

const API_URL = 'https://authorization-form.herokuapp.com/api/countries';

class CountryService {
  getAllCountries() {
    return axios.get(API_URL);
  }
}

export default new CountryService();