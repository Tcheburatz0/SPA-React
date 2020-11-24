import * as axios from "axios";

let instance = axios.create({
  baseURL: 'http://emphasoft-test-assignment.herokuapp.com/',
  headers: {
    "X-CSRFToken": "tcTPQJvtb7kAIpqmTZL9hyY22lRkGBU1iysaV3dhi34yidEXmgUujy73NnIlLWJI",
  },
});

export const AuthApi = {
  async auth(username, password) {
    const response = await instance.post("api-token-auth/", {username: username, password: password}).catch((e) => {
      return null
    });
    if (response && response.statusText === "OK") {
      localStorage.setItem('token', JSON.stringify(response.data.token));
      return response;
    }
  }
};

export const UsersApi = {
  async getUsers() {
    const token = JSON.parse(localStorage.getItem('token'));
    const response = await instance.get("api/v1/users/", {
      headers: {
        "Authorization": `Token ${token}`,
      }
    });
    return response
  }
};