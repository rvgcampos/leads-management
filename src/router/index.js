// import { createRouter, createWebHistory } from "vue-router";
import Leads from "../views/Leads/Leads";
import Login from "../views/Login/Login";
import NewLead from "../views/NewLead/NewLead";
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/leads",
      name: "Leads",
      component: Leads,
    },
    {
      path: "/new_lead",
      name: "New Leads",
      component: NewLead,
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
});

// Realizando a proteção de rotas
router.beforeEach((to, from, next) => {
  let usuario_logado = localStorage.getItem("usuario_logado");
  if (usuario_logado === null) {
    localStorage.setItem("usuario_logado", "");
  }
  console.log(usuario_logado);

  // Apenas usuarios logados podem acessar paginas diferentes da raiz
  if (usuario_logado === "" && to.path !== "/") {
    next("/");
  } else if (usuario_logado !== "" && to.path === "/") { // Se o usuário já estiver logado ele não poderá acessar a pagina de login
    next("/leads");
  } else {
    next();
  }
});

export default router;
