import axios from 'axios'

const API_URL = 'https://authorization-form.herokuapp.com/api/auth/'

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + 'signin', {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.data
      })
  }

  logout() {
    localStorage.removeItem('user')
  }

  register(email, login, realName, password, birthDate, country) {
    birthDate = birthDate.toISOString().split('T')[0]
    
    return axios.post(API_URL + 'signup', {
      email,
      login,
      realName,
      password,
      birthDate,
      country
    })
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'))
  }
}

export default new AuthService()
