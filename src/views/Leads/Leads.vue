<template>
  <div>
    <div class="container-column">
      <div class="container">
        <h1>Leads</h1>
        <a @click="sair">Sair</a>
      </div>
      <button>Novo Lead (+)</button>

      <div class="tabela-leads" v-for="lead in leads" :key="lead.nome">
        <div class="box1">Cliente em Pontecial</div>
        <div class="box2">Dados Confirmados</div>
        <div class="box3">Reunião Agendada</div>
        <div>{{ lead.nome }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
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
    };
  },
  methods: {
    ...mapActions(["logout"]),
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
};
</script>

<style scoped>
.tabela {
  grid-row: 2;
  /* display: flex; */
  /* flex-direction: column; */
  /* grid-template-columns: repeat(3, 1fr); */
}
.tabela-leads {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 10px;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  text-align: center;
}

.box1,
.box4 {
  background: red;
  width: 200px;
  height: 100px;
}
.box2,
.box5 {
  background: yellowgreen;
  width: 200px;
  height: 100px;
}
.box3,
.box6 {
  background: blue;
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
