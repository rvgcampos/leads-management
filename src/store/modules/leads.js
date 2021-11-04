const state = {
  leads: [],
};

const getters = {};

const actions = {
  // Adiciona Lead ao Local Storage
  addLead({ commit, dispatch, state }, lead) {
    let newLead = {
      ...lead,
    };
    dispatch("fetchLeads");
    console.log(newLead);
    commit("newLead", newLead);
    localStorage.setItem("leads", JSON.stringify(state.leads));
  },

  // Recupera Leads do Local Storage
  fetchLeads({ commit }) {
    const data = localStorage.getItem("leads");
    if (data != null) {
      const leads = JSON.parse(data);
      commit("setLeads", leads);
    }
  },
};

const mutations = {
  newLead: (state, lead) => {
    console.log("entrou no new Lead");
    state.leads.push(lead);
    console.log("saiu do new Lead");
  },
  setLeads: (state, leads) => (state.leads = leads),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
