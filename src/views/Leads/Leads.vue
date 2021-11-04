<template>
  <div class="fundo">
    <div class="container-column">
      <!-- Head da página -->
      <div class="flex-container-head">
        <div class="imagem-head"></div>
        <h1 class="head-titulo">Painel de Leads</h1>
        <button class="botao-sair" @click="sair">Sair</button>
      </div>

      <!-- Engloba o botão 'Novo Lead' e o texto indicando o nome do usuário -->
      <div class="flex-novo-lead">
        <button @click="cadastrarNovoLead" class="botao-novo-lead">
          Novo Lead (+)
        </button>
        <span class="usuario-logado"> Bem-vindo {{ usuario_logado }} </span>
      </div>

      <!-- Tabela onde ficam as Leads para serem arrastadas -->
      <div class="flex-container-tabela">
        <div class="flex-container-tabela-head">
          <div class="cliente_potencial">Cliente em Pontecial</div>
          <div class="dados_confirmados">Dados Confirmados</div>
          <div class="reuniao_agendada">Reunião Agendada</div>
        </div>

        <div class="flex-container-tabela-body">
          <draggable
            v-model="leads_potencial"
            group="tasks"
            class="cliente-potencial-body"
            :move="detectMove"
          >
            <div
              class="leads leads-cliente-potencial"
              v-for="lead in leads_potencial"
              :key="lead.nome"
            >
              {{ lead.nome }}
            </div>
          </draggable>

          <draggable
            v-model="leads_confirmados"
            group="tasks"
            class="dados-confirmados-body"
            :move="detectMove"
          >
            <div
              class="leads leads-dados-confirmados"
              v-for="lead in leads_confirmados"
              :key="lead.nome"
            >
              {{ lead.nome }}
            </div>
          </draggable>
          <draggable
            v-model="leads_agendados"
            group="tasks"
            class="reuniao-agendada-body"
            :move="detectMove"
          >
            <div
              class="leads leads-reuniao-agendada"
              v-for="lead in leads_agendados"
              :key="lead.nome"
            >
              {{ lead.nome }}
            </div>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { mapActions } from "vuex";
export default {
  components: {
    draggable,
  },

  data() {
    return {
      leads_potencial: [],
      leads_confirmados: [],
      leads_agendados: [],
      usuario_logado: "",
    };
  },
  methods: {
    ...mapActions(["logout"]),
    cadastrarNovoLead() {
      this.$router.push("/new_lead");
    },
    detectMove(evt) {
      if (
        (evt.from._prevClass === "cliente-potencial-body" &&
          evt.to._prevClass === "reuniao-agendada-body") ||
        (evt.from._prevClass === "dados-confirmados-body" &&
          evt.to._prevClass === "cliente-potencial-body") ||
        (evt.from._prevClass === "reuniao-agendada-body" &&
          evt.to._prevClass === "dados-confirmados-body") || 
          (evt.from._prevClass === "reuniao-agendada-body" &&
          evt.to._prevClass === "cliente-potencial-body") 
          
      ) {
        console.log("Entrou no if");
        console.log(evt);

        return false;
      }
    },
    sair() {
      this.logout();
      const usuario_logado = localStorage.getItem("usuario_logado");
      if (usuario_logado === "") {
        this.$router.push("/");
      } else {
        console.log("Usuario nao deslogado");
      }
    },
  },
  created() {
    const data = localStorage.getItem("leads");
    const usuarioLogado = localStorage.getItem("usuario_logado");
    if (data != null) {
      this.leads_potencial = JSON.parse(data);
    }
    this.usuario_logado = usuarioLogado;
  },
};
</script>

<style scoped>
.fundo {
  background-color: #e3e5e8;
  height: 100vh;
}

.container-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e3e5e8;
  margin: 0 auto;
  width: 800px;
  height: 100%;
}

.flex-container-head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  height: 100px;
  width: 800px;
  background-color: #fafafa;
  border-radius: 20px;
  margin-top: 20px;
  padding-right: 10px;
}

.head-titulo {
  font-size: 2rem;
  font-weight: 800;
  font-family: monospace;
}

.botao-sair {
  border-radius: 10px;
  background-color: #77777a;
  color: white;
  width: 70px;
}

.botao-sair:hover {
  background-color: #878686;
}

.imagem-head {
  width: 300px;
  height: 100%;
  background-image: url("~@/assets/elogroup.jpg");
  background-size: cover;
}

.flex-novo-lead {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.usuario-logado {
  font-size: 1.3rem;
  font-family: monospace;
}

button {
  padding: 10px;
  margin-top: 10px;
  border-radius: 20px;
  color: #fff;
  width: 200px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 2px;
  cursor: pointer;
}

.botao-novo-lead {
  background: #77777a;
}

.botao-novo-lead:hover {
  background: #878686;
}

.cliente_potencial {
  background: #e34d4b;
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f2f2f2;
  font-weight: bold;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.dados_confirmados {
  background: #4350e6;
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f2f2f2;
  font-weight: bold;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.reuniao_agendada {
  background: #61c77d;
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f2f2f2;
  font-weight: bold;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.cliente-potencial-body {
  border: 1px solid red;
  width: 200px;
  height: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  flex-direction: colum;
  justify-content: center;
  align-content: flex-start;
  flex-wrap: wrap;
}
.dados-confirmados-body {
  border: 1px solid blue;
  width: 200px;
  height: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  flex-direction: colum;
  justify-content: center;
  align-content: flex-start;
  flex-wrap: wrap;
}
.reuniao-agendada-body {
  border: 1px solid green;
  width: 200px;
  height: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  flex-direction: colum;
  justify-content: center;
}

.leads {
  height: 50px;
  border-radius: 10px;
  width: 170px;
  margin: 15px;
  display: flex;
  flex-direction: colum;
  justify-content: center;
  align-items: center;
  color: #3d3d3d;
}

.leads-cliente-potencial {
  background-color: #facfcf;
}

.leads-dados-confirmados {
  background-color: #c7d0f0;
}

.leads-reuniao-agendada {
  background-color: #c4f2c7;
}

.flex-container-tabela {
  display: flex;
  flex-direction: column;
  width: 800px;
  margin-top: 20px;
  background-color: #fafafa;
  border-radius: 20px;
  padding: 20px;
  height: 70%;
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
  height: 100%;
}
</style>
