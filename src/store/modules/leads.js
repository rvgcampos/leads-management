const state = {
  leads: [],
};

const getters = {
  getLeads: (state) => state.leads,
};

const actions = {
  addLead({ commit, state }, lead) {
    let newLead = {
      ...lead,
    };
    commit("newLead", newLead);
    localStorage.setItem("leads", JSON.stringify(state.leads));
  },
};

const mutations = {
  newLead: (state, lead) => state.leads.push(lead),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
