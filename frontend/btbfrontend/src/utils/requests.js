import axios from "axios";

const baseURL = "http://localhost:8000";

const users = {
  login: (username, password) =>
    axios({
      url: "/login",
      baseURL: baseURL,
      method: "post",
      data: {
        login: username,
        password: password,
      },
    }),
  updateUser: (data, id) =>
    axios({
      url: `/user/${id}/update`,
      baseURL: baseURL,
      method: "patch",
      data,
    }),
  updateBanks: (data) =>
    axios({
      url: `/banks/update`,
      baseURL: baseURL,
      method: "post",
      data,
    }),
  postLoan: (data) =>
    axios({
      url: `/loans/list`,
      baseURL: baseURL,
      method: "post",
      data,
    }),
};

export default { users };
