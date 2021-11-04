<template>
  <button>{{ funcao }}</button>
</template>

<script>
export default {
  // 'função' é o nome que irá aparecer no botão 'Logar' ou 'Cadastrar
  props: ["funcao"],
};
</script>

<style scoped>
button {
  padding: 10px;
  margin-top: 10px;
  border-radius: 20px;
  color: #fff;
  background: #77777a;
  border: none;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 2px;
  cursor: pointer;
}

button:hover {
  background-color: #878686;
}
</style>
