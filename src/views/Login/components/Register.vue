<template>
  <div>
    <form @submit.prevent="addUserLocalStorage">
      <label> Usuário*</label>
      <input
        type="text"
        v-model.trim="usuario"
        placeholder="Coloque o seu usuário"
        :class="{ error: errorFormUser.value }"
      />
      <span v-if="errorFormUser.value" class="menssagem-erro">{{
        errorFormUser.message
      }}</span>

      <label> Senha*</label>
      <input
        type="password"
        v-model.trim="password"
        placeholder="Sua senha"
        :class="{ error: errorFormPassword.value }"
      />
      <span v-if="errorFormPassword.value" class="menssagem-erro">{{
        errorFormPassword.message
      }}</span>

      <label> Confirmação Senha*</label>
      <input
        type="password"
        v-model.trim="confirmPassword"
        placeholder="Confirme sua Senha"
        :class="{ error: errorFormConfirmPassword.value }"
      />
      <span v-if="errorFormConfirmPassword.value" class="menssagem-erro">{{
        errorFormConfirmPassword.message
      }}</span>

      <span id="asterisco">(*) - Campo Obrigatório</span>
      <BotaoCadastrarLogar funcao="Cadastrar" />
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import hasSpecialCaractere from "../../../utils/senha";
import BotaoCadastrarLogar from "../../../global_components/BotaoCadastrarLogar.vue";

export default {
  components: {
    BotaoCadastrarLogar,
  },
  data() {
    return {
      usuario: "",
      password: "",
      confirmPassword: "",
      errorFormUser: {
        value: false,
        message: "O campo usuário não pode ser nulo",
      },
      errorFormPassword: {
        value: false,
        message:
          "O campo senha tem que ter mais de 8 caracteres e conter ao menos um caracter especial, númerico e alfanumérico ",
      },
      errorFormConfirmPassword: {
        value: false,
        message:
          "O campo confirmação de senha tem que ser igual a senha digitada",
      },
    };
  },
  methods: {
    ...mapActions(["addUser"]),

    addUserLocalStorage() {
      if (
        this.usuario !== "" &&
        this.password !== "" &&
        this.confirmPassword !== "" &&
        this.password.length >= 8 &&
        this.password === this.confirmPassword &&
        hasSpecialCaractere(this.password)
      ) {
        this.addUser({
          usuario: this.usuario,
          password: this.password,
          confirmPassword: this.confirmPassword,
        });
        this.$router.push("/leads");
      }

      if (this.usuario === "") {
        this.errorFormUser.value = true;
      } else {
        this.errorFormUser.value = false;
      }

      if (
        this.password === "" ||
        this.password.length < 8 ||
        !hasSpecialCaractere(this.password)
      ) {
        this.errorFormPassword.value = true;
      } else {
        this.errorFormPassword.value = false;
      }

      if (this.confirmPassword !== this.password || this.password === "") {
        this.errorFormConfirmPassword.value = true;
      } else {
        this.errorFormConfirmPassword.value = false;
      }
    },
  },
};
</script>

<style scoped>
#asterisco {
  color: red;
  font-weight: bold;
  font-size: 0.8rem;
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

.error {
  outline: 2px solid red;
}

label sup {
  font-size: 1.1rem;
  position: relative;
  top: 5px;
}
.menssagem-erro {
  font-size: 0.9rem;
  color: red;
}
</style>
