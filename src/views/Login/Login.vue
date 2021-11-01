<template>
  <div class="container">
    <!-- Formulário Cadastro -->
    <form @submit.prevent="addUserLocalStorage" v-if="registerForm">
      <label> Usuário*</label>
      <input
        type="text"
        v-model.trim="usuario"
        placeholder="Coloque o seu usuário"
        :class="{ error: errorForm }"
      />
      <label> Senha*</label>
      <input
        type="password"
        v-model.trim="password"
        placeholder="Sua senha"
        :class="{ error: errorForm }"
      />
      <label> Confirmação Senha*</label>
      <input
        type="password"
        v-model.trim="confirmPassword"
        placeholder="Confirme sua Senha"
        :class="{ error: errorForm }"
      />
      <span id="asterisco">(*) - Campo Obrigatório</span>
      <button>Registrar</button>
    </form>

    <!-- Formulário Login -->
    <form @submit.prevent="loginForm" v-else>
      <label v>Usuário</label>
      <input type="text" v-model="loginUser" />
      <!-- <i class="far fa-trash-alt"></i> -->

      <label v>Senha</label>
      <input type="password" v-model="passwordUser" />
      <button>Logar</button>
      <span class="cadastre-se"
        >Não tem conta?
        <a @click="registerForm = !registerForm">Cadastre-se</a>
      </span>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      // ...mapGetters(["loggedUser"]),
      usuario: "",
      password: "",
      confirmPassword: "",
      loginUser: "",
      passwordUser: "",
      registerForm: false,
      errorForm: false,
    };
  },
  computed: {
    ...mapGetters(["loggedUser"]),
  },
  methods: {
    ...mapActions(["addUser", "login", "getUsers"]),
    hasSpecialCaractere(password) {
      const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      let digits_bool = false;
      const LOCASE_CHARACTERS = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ];
      let locase_bool = false;

      const UPCASE_CHARACTERS = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "M",
        "N",
        "O",
        "p",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];
      let upcase_bool = false;

      const SYMBOLS = [
        "@",
        "#",
        "$",
        "%",
        "=",
        ":",
        "?",
        ".",
        "/",
        "|",
        "~",
        ">",
        "*",
        "(",
        ")",
        "<",
      ];
      let symbols_bool = false;

      DIGITS.forEach((item) => {
        if (password.indexOf(item) > -1) {
          digits_bool = true;
        }
      });

      LOCASE_CHARACTERS.forEach((item) => {
        if (password.indexOf(item) > -1) {
          locase_bool = true;
        }
      });

      UPCASE_CHARACTERS.forEach((item) => {
        if (password.indexOf(item) > -1) {
          upcase_bool = true;
        }
      });

      SYMBOLS.forEach((item) => {
        if (password.indexOf(item) > -1) {
          symbols_bool = true;
        }
      });

      return digits_bool && locase_bool && upcase_bool && symbols_bool;
    },
    addUserLocalStorage() {
      if (
        this.usuario !== "" &&
        this.password !== "" &&
        this.confirmPassword !== "" &&
        this.password.length >= 8 &&
        this.password === this.confirmPassword &&
        this.hasSpecialCaractere(this.password)
      ) {
        this.addUser({
          usuario: this.usuario,
          password: this.password,
          confirmPassword: this.confirmPassword,
        });
      } else {
        this.errorForm = true;
      }
    },
    loginForm() {
      if (this.loginUser !== "" && this.passwordUser !== "") {
        this.login({
          usuario: this.loginUser,
          password: this.passwordUser,
        });
      } else {
        return;
      }
      console.log(this.loggedUser.usuario);

      if (this.loggedUser.usuario !== undefined) {
        this.$router.push("/leads");
      } else {
        console.log("Usuario nao logado");
      }
    },
  },

  created() {
    this.getUsers();
  },
};
</script>

<style scoped>
#asterisco {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  z-index: 1;
}

.container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  z-index: -1;
  background: url("https://image.freepik.com/vetores-gratis/copie-o-fundo-digital-dos-circuitos-azuis-do-espaco_23-2148821699.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 10px;
}

input {
  padding: 10px;
  border: 0;
  box-shadow: 0 0 5px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  width: 300px;
  font-family: sans-serif;
  font-size: 16px;
}

label {
  color: #3081bf;
  font-size: 20px;
  font-family: sans-serif;
}

button {
  padding: 10px;
  margin-top: 10px;
  border-radius: 20px;
  color: #fff;
  background: #3081bf;
  border: none;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 2px;
  cursor: pointer;
}

.cadastre-se a {
  color: #3081bf;
  cursor: pointer;
}

.error {
  border: 1px solid red;
}
</style>
