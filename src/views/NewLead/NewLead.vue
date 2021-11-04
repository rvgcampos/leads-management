<template>
  <div class="fundo">
    <div class="container">
      <div class="flex-container-body">
        <div class="flex-container-head">
          <div class="imagem-head"></div>
          <span class="novo-lead">Novo Lead</span>
        </div>
        <div class="flex-container-content">
          <!-- FORMULÁRIO -->
          <form class="flex-container-form">
            <label>Nome*</label>
            <span class="menssagem-aviso"
              >Atenção: Nome não pode ser igual a um já cadastrado
            </span>
            <input
              type="text"
              v-model="nome_lead"
              placeholder="Colocar nome"
              :class="{ error: errorFormLeadNome.value }"
            />

            <span v-if="errorFormLeadNome.value" class="menssagem-erro">{{
              errorFormLeadNome.message
            }}</span>

            

            <label>Telefone*</label>
            <input
              type="text"
              v-model="telefone_lead"
              placeholder="Ex: (79) 99999-8888"
              :class="{ error: errorFormLeadTelefone.value }"
            />
            <span v-if="errorFormLeadTelefone.value" class="menssagem-erro">{{
              errorFormLeadTelefone.message
            }}</span>

            <label>E-mail*</label>
            <input
              type="text"
              v-model="email_lead"
              placeholder="Ex: email@email.com"
              :class="{ error: errorFormLeadEmail.value }"
            /><span v-if="errorFormLeadEmail.value" class="menssagem-erro">{{
              errorFormLeadEmail.message
            }}</span>
          </form>
          <!-- OPORTUNIDADES -->
          <div class="flex-container-oportunidades">
            <div
              class="oportunidades-text"
              :class="{ error: errorFormLeadOportunidades.value }"
            >
              Oportunidades *
            </div>
            <span
              v-if="errorFormLeadOportunidades.value"
              class="menssagem-erro"
              >{{ errorFormLeadOportunidades.message }}</span
            >
            <div class="flex-container-oportunidades-content">
              <div class="label-oportunidades">
                <input type="checkbox" @click="selecionarTodos" />
                <span class="label-seleciona">
                  {{
                    !btnSelecionaTodos
                      ? "Selecionar todos"
                      : "Deslecionar todos"
                  }}</span
                >
              </div>

              <div class="label-oportunidades">
                <input type="checkbox" value="rpa" v-model="oportunidades" />
                <span>RPA</span>
              </div>

              <div class="label-oportunidades">
                <input
                  type="checkbox"
                  value="produto_digital"
                  v-model="oportunidades"
                />
                <span>Produto Digital</span>
              </div>

              <div class="label-oportunidades">
                <input
                  type="checkbox"
                  value="analytics"
                  v-model="oportunidades"
                />
                <span class="checkmark"></span>
                <span>Analytics</span>
              </div>

              <div class="label-oportunidades">
                <input type="checkbox" value="bpm" v-model="oportunidades" />
                <span>BPM</span>
              </div>
            </div>

            <button @click="novoLead">Salvar</button>
          </div>
        </div>

        <transition name="fade">
          <div v-if="mostrarMensagemSucesso" class="mensagem-sucesso">
            Lead incluída com sucesso!
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      // Definindo campos para compor o objeto lead
      nome_lead: "",
      telefone_lead: "",
      email_lead: "",
      tipo: "cliente_potencial",
      oportunidades: [],
      // Variável criada para alterar o texto entre 'Selecionar todas' e 'Deselecionar todas'
      btnSelecionaTodos: false,
      // Estado criado para exibir a mensagem de sucesso na tela
      mostrarMensagemSucesso: false,
      // Estados criados para representarem se determinado campo do formulário está com erro ou não
      errorFormLeadNome: {
        value: false,
        message: "O campo nome  não pode ser nulo",
      },
      errorFormLeadTelefone: {
        value: false,
        message:
          "O campo telefone não pode ser nulo e tem que estar escrito corretamente. Ex: (79) 99999-2222",
      },
      errorFormLeadEmail: {
        value: false,
        message:
          "O campo nome do e-mail não pode ser nulo e deve ser escrito corretamente",
      },
      errorFormLeadOportunidades: {
        value: false,
        message: "Selecione ao menos uma oportunidade.",
      },
    };
  },

  methods: {
    ...mapActions(["addLead"]),
    novoLead() {
      // Criando variáveis para ver se tem erro
      const hasNameError = this.nome_lead === "";

      const re_telefone = /^(\([0-9]{2}\))\s([9]{1})?([0-9]{4})-([0-9]{4})$/;
      const hasPhoneError =
        this.telefone_lead === "" || !re_telefone.test(this.telefone_lead);

      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const hasEmailError = this.email_lead === "" || !re.test(this.email_lead);

      const hasOportunidadeError = this.oportunidades.length === 0;

      // Só adiciona se não tiver erroa algum
      if (
        !hasNameError &&
        !hasPhoneError &&
        !hasEmailError &&
        !hasOportunidadeError
      ) {
        this.addLead({
          nome: this.nome_lead,
          tipo: this.tipo,
          telefone_lead: this.telefone_lead,
          email_lead: this.email_lead,
          oportunidades: this.oportunidades,
        });

        // Mostrar mensagem na tela
        this.mostrarMensagemSucesso = true;

        // Depois de 2s faz o roteamento
        let self = this;
        setTimeout(function () {
          self.$router.push("leads");
        }, 2000);
      }

      // Se tem erro em algum dos campos, o erro é exibido

      if (hasNameError) {
        this.errorFormLeadNome.value = true;
      } else {
        this.errorFormLeadNome.value = false;
      }

      if (hasPhoneError) {
        this.errorFormLeadTelefone.value = true;
      } else {
        this.errorFormLeadTelefone.value = false;
      }

      if (hasEmailError) {
        this.errorFormLeadEmail.value = true;
      } else {
        this.errorFormLeadEmail.value = false;
      }
      if (hasOportunidadeError) {
        this.errorFormLeadOportunidades.value = true;
      } else {
        this.errorFormLeadOportunidades.value = false;
      }
    },

    // Função criada para ser possivel selecionar e deselecionar todas as opções de checkbox
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
.fundo {
  background-color: #e3e5e8;
  height: 100vh;
}
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
  align-items: center;
  height: 100px;
  width: 800px;
  background: rgb(56, 58, 60);

  border-radius: 20px;
}
.novo-lead {
  margin-right: 50px;
  font-size: 2rem;
  letter-spacing: 1px;
  font-family: monospace;
  color: #ebebeb;
  font-weight: 300;
}

.imagem-head {
  width: 300px;
  height: 100%;
  background-image: url("~@/assets/elogroup.jpg");
  background-size: cover;
  background-color: red;
}

.flex-container-form {
  display: flex;
  flex-direction: column;
  width: 300px;
  justify-content: space-between;
  row-gap: 10px;
}

.flex-container-form label {
  font-weight: bold;
}
.flex-container-form input {
  outline: none;
  padding: 10px;
  border-radius: 15px;
  border: 0;
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.5);
}

.flex-container-content {
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 200px;
  background-color: white;
  padding: 20px;
  height: 100%;
  border-radius: 10px;
}

.flex-container-oportunidades {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.grid-container-oportunidades {
  display: flex;
  flex-direction: row;
  border: 1px solid red;
  width: 350px;
}

.flex-container-oportunidades-content {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 300px;
}

.grid-container-oportunidades > * {
  border: 1px solid red;
}

.label-oportunidades {
  background-color: #e0e0e0;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 4px;
  box-shadow: 0px 0px 1px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row;
  align-items: center;
}

.oportunidades-text {
  margin-bottom: 10px;
}

button {
  padding: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 2px;
  border-radius: 10px;
  outline: none;
  border: none;
  box-shadow: 0px 0px 1px 2px rgba(0, 0, 0, 0.2);
  background-color: #949494;
  color: white;
  margin-top: 10px;
  cursor: pointer;
}

button:hover {
  background-color: #adadad;
}

.label-seleciona {
  margin-left: 60px;
  font-weight: bold;
}

input[type="checkbox"] {
  appearance: none;
  height: 20px;
  width: 20px;
  background-color: #adadad;
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  margin-right: 10px;
}

input[type="checkbox"]:after {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: "\f00c";
  font-size: 15px;
  color: white;
  display: none;
}

input[type="checkbox"]:before {
  background-color: #696969;
}
input[type="checkbox"]:checked {
  background-color: #696969;
}
input[type="checkbox"]:checked:after {
  display: block;
}

.error {
  border-bottom: 2px solid red;
  /* outline: 2px solid red; */
}

.menssagem-erro {
  font-size: 0.9rem;
  color: red;
}

.mensagem-sucesso {
  background-color: #454545;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  color: white;
  font-weight: bold;
  letter-spacing: 2px;
  margin-top: 20px;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: opacity 2s ease;
}

.menssagem-aviso{
  color: blue;
  font-size: 0.8rem;
}
</style>
