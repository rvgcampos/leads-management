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
  // Adicionar o usuário a lista de usuário e ao localStorage
  addUser({ commit, state }, user) {
    const userPassword = user.password;

    // Criptografar a senha
    var CryptoJS = require("crypto-js");
    user.password = CryptoJS.AES.encrypt(userPassword, "123#$%").toString();
    user.confirmPassword = user.password;

    // Caso onde o número de usuários é maior que zero
    if (state.users.length !== 0) {
      console.log("entoru no if");
      // Verificar se o usário ja existe
      state.users.forEach((userItem) => {
        if (userItem.usuario === user.usuario) {
          commit("toggleAlreadyRegister");
        }
      });

      // Se ele não existe, registrar
      if (!state.alreadyRegistered) {
        commit("setUser", user);
        commit("setLoggedUser", user.usuario);
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    } else {
      // Caso onde o número de usuário é igual a zero e portanto não há necessidade de checar se o usuário ja existe
      commit("setUser", user);
      commit("setLoggedUser", user.usuario);
      localStorage.setItem("users", JSON.stringify(state.users));
    }
  },

  // Recuperar os usários do localStorage
  getUsers({ commit }) {
    const data = localStorage.getItem("users");
    if (data !== null) {
      commit("setUsers", JSON.parse(data));
    }
  },

  // Realizar Login
  login({ commit, state }, user) {
    var CryptoJS = require("crypto-js");

    state.users.forEach((userItem) => {
      // Fazendo a descriptografia
      const decryptData = CryptoJS.AES.decrypt(
        userItem.password,
        "123#$%"
      ).toString(CryptoJS.enc.Utf8);
      if (userItem.usuario === user.usuario && decryptData === user.password) {
        commit("setLoggedUser", user.usuario);
      }
    });
  },
  // Realizando o logout
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
