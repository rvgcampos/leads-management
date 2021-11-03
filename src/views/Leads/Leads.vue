<template>
  <div>
    <div class="container-column">
      <div class="container">
        <h1>Leads</h1>
        <a @click="sair">Sair</a>
      </div>
      <button>Novo Lead (+)</button>

      <div class="flex-container-tabela">
        <div class="flex-container-tabela-head">
          <div class="box1">Cliente em Pontecial</div>
          <div class="box2">Dados Confirmados</div>
          <div class="box3">Reunião Agendada</div>
        </div>

        <div class="flex-container-tabela-body">
          <draggable
            v-model="leads_potencial"
            group="tasks"
            class="borda-vermelha"
            :move="detectMove"
          >
            <div v-for="lead in leads_potencial" :key="lead.nome">
              {{ lead.nome }}
            </div>
          </draggable>

          <draggable
            v-model="leads_confirmados"
            group="tasks"
            class="borda-azul"
            :move="detectMove"
          >
            <div v-for="lead in leads_confirmados" :key="lead.nome">
              {{ lead.nome }}
            </div>
          </draggable>
          <draggable
            v-model="leads_agendados"
            group="tasks"
            class="borda-verde"
            :move="detectMove"
          >
            <div v-for="lead in leads_agendados" :key="lead.nome">
              {{ lead.nome }}
            </div>
          </draggable>
        </div>
      </div>

      <h1>LEADS POTENCIAIS</h1>
      <div v-for="lead in leads_potencial" :key="lead.nome">
        {{ lead.nome }}
      </div>

      <h1>LEADS CONFIRMADOS</h1>
      <div v-for="lead in leads_confirmados" :key="lead.nome">
        {{ lead.nome }}
      </div>

      <h1>LEADS AGENDADOS</h1>
      <div v-for="lead in leads_agendados" :key="lead.nome">
        {{ lead.nome }}
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    draggable,
  },
  computed: {
    ...mapGetters(["getLeads"]),
  },
  data() {
    return {
      leads: [
        {
          nome: "Org Internacionais",
          tipo: "cliente_potencial",
          oportunidades: ["RPA", "PRODUTO DIGITAL"],
        },
        {
          nome: "Ind Farm LTDA",
          tipo: "dados_confirmados",
          oportunidades: ["RPA", "PRODUTO DIGITAL"],
        },
        {
          nome: "Musc. Sound Live Cmp",
          tipo: "cliente_potencial",
          oportunidades: ["RPA", "PRODUTO DIGITAL"],
        },
      ],
      leads_potencial: [],
      leads_confirmados: [],
      leads_agendados: [],
    };
  },
  methods: {
    ...mapActions(["logout"]),
    detectMove(evt) {
      if (
        (evt.from._prevClass === "borda-vermelha" &&
          evt.to._prevClass === "borda-verde") ||
        (evt.from._prevClass === "borda-azul" &&
          evt.to._prevClass === "borda-vermelha") ||
        (evt.from._prevClass === "borda-verde" &&
          evt.to._prevClass === "borda-azul")
      ) {
        console.log("Entrou no if");
        return false;
      }
      console.log(evt);
    },
    sair() {
      this.logout();
      console.log(this.loggedUser);
      if (this.loggedUser === undefined) {
        this.$router.push("/");
      } else {
        console.log("Usuario nao deslogado");
      }
    },
  },
  created() {
    const data = localStorage.getItem("leads");
    this.leads_potencial = JSON.parse(data);
  },
};
</script>

<style scoped>
.borda-vermelha {
  border: 1px solid red;
  width: 200px;
  height: 100px;
}
.borda-azul {
  border: 1px solid blue;
  width: 200px;
  height: 100px;
}
.borda-verde {
  border: 1px solid green;
  width: 200px;
  height: 100px;
}
.flex-container-tabela {
  display: flex;
  flex-direction: column;
  width: 800px;
  margin-top: 10px;
}

.flex-container-tabela-head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.flex-container-tabela-body {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100px;
}

.box1,
.box4 {
  background: red;
  width: 200px;
  height: 100px;
}
.box2,
.box5 {
  background: blue;
  width: 200px;
  height: 100px;
}
.box3,
.box6 {
  background: green;
  width: 200px;
  height: 100px;
}
.container-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  height: 100px;
  width: 200px;
}

button {
  padding: 10px;
  margin-top: 10px;
  border-radius: 20px;
  color: #fff;
  background: #3081bf;
  width: 200px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 2px;
  cursor: pointer;
}
</style>
