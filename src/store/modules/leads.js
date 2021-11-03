const state = {
  leads: [],
};

const getters = {
  getLeads: (state) => state.leads,
};

const actions = {
  addLead({ commit, dispatch, state }, lead) {
    let newLead = {
      ...lead,
    };
    dispatch("fetchLeads");
    commit("newLead", newLead);
    localStorage.setItem("leads", JSON.stringify(state.leads));
  },

  fetchLeads({ commit }) {
    const data = localStorage.getItem("leads");
    const leads = JSON.parse(data);
    commit("setLeads", leads);
  },
};

const mutations = {
  newLead: (state, lead) => state.leads.push(lead),
  setLeads: (state, leads) => (state.leads = leads),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
