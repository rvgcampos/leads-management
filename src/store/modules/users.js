const state = {
  users: [],
  loggedUser: {},
  alreadyRegistered: false,
};

const getters = {
  loggedUser: (state) => state.loggedUser,
  getUsers: (state) => state.users,
};

const actions = {
  addUser({ commit, state }, user) {
    if (state.users.length !== 0) {
      console.log("entoru no if");
      state.users.forEach((userItem) => {
        if (userItem.usuario === user.usuario) {
          commit("toggleAlreadyRegister");
        }
      });

      if (!state.alreadyRegistered) {
        console.log("entoru no !already");

        commit("setUser", user);
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    } else {
      console.log("entoru no else");
      commit("setUser", user);
      localStorage.setItem("users", JSON.stringify(state.users));
    }
  },
  getUsers({ commit }) {
    const data = localStorage.getItem("users");
    if (data !== null) {
      commit("setUsers", JSON.parse(data));
    }
  },
  login({ commit }, user) {
    state.users.forEach((userItem) => {
      if (
        userItem.usuario === user.usuario &&
        userItem.password === user.password
      ) {
        commit("setLoggedUser", user);
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
  setLoggedUser: (state, user) => (state.loggedUser = user),
  cleanLoggedUser: (state) => (state.loggedUser = {}),
  toggleAlreadyRegister: (state) =>
    (state.alreadyRegistered = !state.alreadyRegistered),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
