const state = {
  users: [],
  loggedUser: "",
  alreadyRegistered: false,
};

const getters = {
  loggedUser: (state) => state.loggedUser,
  getUsers: (state) => state.users,
};

const actions = {
  addUser({ commit, state }, user) {
    const userPassword = user.password;
    var CryptoJS = require("crypto-js");
    user.password = CryptoJS.AES.encrypt(userPassword, "123#$%").toString();
    user.confirmPassword = user.password;
    if (state.users.length !== 0) {
      console.log("entoru no if");
      state.users.forEach((userItem) => {
        if (userItem.usuario === user.usuario) {
          commit("toggleAlreadyRegister");
        }
      });

      if (!state.alreadyRegistered) {

        commit("setUser", user);
        commit("setLoggedUser", user.usuario);

        localStorage.setItem("users", JSON.stringify(state.users));
      }
    } else {
      commit("setUser", user);
      commit("setLoggedUser", user.usuario);
      localStorage.setItem("users", JSON.stringify(state.users));
    }
  },
  getUsers({ commit }) {
    const data = localStorage.getItem("users");
    if (data !== null) {
      commit("setUsers", JSON.parse(data));
    }
  },
  login({ commit, state }, user) {
    var CryptoJS = require("crypto-js");

    state.users.forEach((userItem) => {
      const decryptData = CryptoJS.AES.decrypt(
        userItem.password,
        "123#$%"
      ).toString(CryptoJS.enc.Utf8);
      if (userItem.usuario === user.usuario && decryptData === user.password) {
        commit("setLoggedUser", user.usuario);
      }
    });
  },
  logout({ commit }) {
    commit("cleanLoggedUser");
  },
};

const mutations = {
  setUsers: (state, users) => (state.users = users),
  setUser: (state, user) => state.users.push(user),
  setLoggedUser: (state, user) => {
    state.loggedUser = user;
    localStorage.setItem("usuario_logado", user);
  },
  cleanLoggedUser: (state) => {
    state.loggedUser = "";
    localStorage.setItem("usuario_logado", "");
  },
  toggleAlreadyRegister: (state) =>
    (state.alreadyRegistered = !state.alreadyRegistered),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
