<template>
  <div>
    <div class="container">
      <!-- Formulário Cadastro -->
      <div class="formulario">
        <Register v-if="registerForm" />

        <!-- Formulário Login -->
        <form @submit.prevent="loginForm" v-else>
          <!-- Campo Usuario -->
          <label v>Usuário <sup>*</sup></label>
          <input
            type="text"
            v-model="loginUser"
            placeholder="Coloque o seu usuário"
            :class="{
              error: errorFormUser.value,
            }"
          />
          <span
            v-if="loginUser.length === 0"
            class="posiciona-icone posiciona-icone-desativado"
          >
            <i class="far fa-trash-alt"></i>
            <span v-if="errorFormUser.value" class="messagem-erro">{{
              errorFormUser.message
            }}</span>
          </span>

          <span v-else class="posiciona-icone posiciona-icone-ativado">
            <i @click="cleanInputNameUser" class="far fa-trash-alt"></i>
          </span>

          <!-- Campo Senha -->
          <label v>Senha <sup>*</sup></label>
          <input
            :type="typeInput"
            v-model="passwordUser"
            placeholder="Sua senha"
            :class="{ error: errorFormPassword.value }"
          />
          <span
            v-if="passwordUser.length === 0"
            class="posiciona-icone posiciona-icone-desativado"
          >
            <i class="fas fa-lock-open"></i>
            <span v-if="errorFormPassword.value" class="menssagem-erro">{{
              errorFormPassword.message
            }}</span>
          </span>
          <span v-else class="posiciona-icone posiciona-icone-ativado">
            <i @click="changeTypeInputPassword" class="fas fa-lock-open"></i>
          </span>

          <span id="asterisco-obrigatorio">(*) - Campo Obrigatório</span>

          <BotaoCadastrarLogar funcao="Logar" />

          <span class="cadastre-se"
            >Não tem conta?
            <a @click="registerForm = !registerForm">Cadastre-se</a>
          </span>
        </form>
      </div>

      <!-- Imagem -->
      <div class="imagem-lateral"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Register from "./components/Register.vue";
import BotaoCadastrarLogar from "../../global_components/BotaoCadastrarLogar.vue";

export default {
  name: "Login",
  components: {
    Register,
    BotaoCadastrarLogar,
  },
  data() {
    return {
      // Definindo os campos do objeto de usuario
      loginUser: "",
      passwordUser: "",
      // Estado criado para definir se mostra o componente de login ou de cadastro
      registerForm: false,
      // Estados criados para indicar error no formulário
      errorFormUser: {
        value: false,
        message: "O campo usuário não pode ser nulo",
      },
      errorFormPassword: {
        value: false,
        message:
          "O campo senha não pode ser nulo e tem que ter mais de 8 caracteres",
      },
      typeInput: "password",
    };
  },
  computed: {
    ...mapGetters(["loggedUser"]),
  },
  methods: {
    ...mapActions(["login", "getUsers"]),

    loginForm() {
      if (
        this.loginUser !== "" &&
        this.passwordUser !== "" &&
        this.passwordUser.length >= 8
      ) {
        this.login({
          usuario: this.loginUser,
          password: this.passwordUser,
        });
        this.$router.push("/leads");
      }
      if (this.loginUser === "") {
        this.errorFormUser.value = true;
      } else {
        this.errorFormUser.value = false;
      }

      if (this.passwordUser === "" && this.passwordUser.length < 8) {
        this.errorFormPassword.value = true;
      } else {
        this.errorFormPassword.value = false;
      }
    },
    cleanInputNameUser() {
      this.loginUser = "";
    },
    changeTypeInputPassword() {
      if (this.typeInput == "password") {
        this.typeInput = "text";
      } else {
        this.typeInput = "password";
      }
    },
  },

  created() {
    this.getUsers();
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  background-color: #e3e5e8;
}

.imagem-lateral {
  background-image: url("~@/assets/background1.jpg");
  background-size: cover;
  width: 50vw;
  height: 100vh;
}

.formulario {
  flex-basis: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 300px;
}

input {
  padding: 10px;
  border: 0;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  width: 300px;
  background-color: #e3e5e8;
  font-family: sans-serif;
  font-size: 16px;
}

input:focus {
  outline: none;
}

label {
  color: #232324;
  font-size: 0.9rem;
  font-weight: 700;
  font-family: sans-serif;
}

label sup {
  font-size: 1.1rem;
  position: relative;
  top: 5px;
}

.cadastre-se a {
  color: #77777a;
  cursor: pointer;
  font-weight: bold;
}

.error {
  outline: 2px solid red;
}

.posiciona-icone {
  position: relative;
}

.posiciona-icone-desativado i {
  position: absolute;
  top: -37px;
  right: 15px;
  cursor: pointer;
  color: #edbcb9;
  opacity: 1;
}

.posiciona-icone-ativado i {
  position: absolute;
  top: -37px;
  right: 15px;
  cursor: pointer;
  color: red;
  opacity: 1;
}

#asterisco {
  color: #edbcb9;
  font-weight: bold;
  margin-top: 10px;
}
#asterisco-obrigatorio {
  color: red;
  font-size: 0.8rem;
  font-weight: bold;
}

.menssagem-erro {
  font-size: 0.9rem;
  color: red;
}
</style>
