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
          <input type="text" />
          <label>Telefone*</label>
          <input type="text" />
          <label>E-mail*</label>
          <input type="text" />
        </form>
        <!-- OPORTUNIDADES -->
        <div class="flex-container-oportunidades">
          <div class="grid-container-oportunidades">
            <input type="checkbox" />
            <span></span>
            <input type="checkbox" />
            <span>RPA</span>
            <input type="checkbox" />
            <span>Produto Digital</span>
            <input type="checkbox" />
            <span>Analytics</span>
            <input type="checkbox" />
            <span>BPM</span>
          </div>
          <button>Salvar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
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
