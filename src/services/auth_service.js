import axios from "axios";

const API_URL = "https://ec-api.herokuapp.com/api/v1/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          this.saveToken(response.data.accessToken);
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  saveToken(token) {
    localStorage.setItem("user", JSON.stringify({ accessToken: token }));
  }

  refreshToken() {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios
      .post(API_URL + 'refresh', {}, { headers: { Authorization: `Bearer ${user.accessToken}` } })
  }
}

export default new AuthService();
