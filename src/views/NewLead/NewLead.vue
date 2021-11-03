<template>
  <div class="container">
    <div class="flex-container-body">
      <div class="flex-container-head">
        <span>ELOGROUP</span>
        <span>Novo Lead</span>
      </div>
      <div class="flex-container-content">
        <!-- FORMULÁRIO -->
        <form class="flex-container-form">
          <label>Nome*</label>
          <input type="text" v-model="nome_lead" />
          <label>Telefone*</label>
          <input type="text" v-model="telefone_lead" />
          <label>E-mail*</label>
          <input type="text" v-model="email_lead" />
        </form>
        <!-- OPORTUNIDADES -->
        <div class="flex-container-oportunidades">
          <div class="grid-container-oportunidades">
            <input type="checkbox" @click="selecionarTodos" />
            <span></span>
            <input type="checkbox" value="rpa" v-model="oportunidades" />
            <span>RPA</span>
            <input
              type="checkbox"
              value="produto_digital"
              v-model="oportunidades"
            />
            <span>Produto Digital</span>
            <input type="checkbox" value="analytics" v-model="oportunidades" />
            <span>Analytics</span>
            <input type="checkbox" value="bpm" v-model="oportunidades" />
            <span>BPM</span>
          </div>
          <button @click="novoLead">Salvar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      nome_lead: "",
      telefone_lead: "",
      email_lead: "",
      tipo: "cliente_potencial",
      oportunidades: [],
      btnSelecionaTodos: false,
    };
  },
  methods: {
    ...mapActions(["addLead"]),
    novoLead() {
      this.addLead({
        nome: this.nome_lead,
        tipo: this.tipo,
        telefone_lead: this.telefone_lead,
        email_lead: this.email_lead,
        oportunidades: this.oportunidades,
      });
    },
    selecionarTodos() {
      if (!this.btnSelecionaTodos) {
        this.btnSelecionaTodos = true;
        this.oportunidades = ["rpa", "produto_digital", "analytics", "bpm"];
      } else {
        this.oportunidades = [];
        this.btnSelecionaTodos = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 800px;
  margin: 0 auto;
}

.flex-container-body {
  display: flex;
  flex-direction: column;
}
.flex-container-head {
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.flex-container-form {
  display: flex;
  flex-direction: column;
  width: 300px;
  justify-content: space-between;
}

.flex-container-content {
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 200px;
}

.grid-container-oportunidades {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border: 1px solid red;
}

.flex-container-oportunidades {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.grid-container-oportunidades > * {
  border: 1px solid red;
}
</style>
