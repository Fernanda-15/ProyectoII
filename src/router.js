import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import movieIndex from "./components/movieIndex.vue";
import movieDetails from "./components/movieDetails.vue";

const routes = [
  { path: "/", component: Home },
  
  { path: "/movie", component: movieIndex },
  { path: "/movie/show/:id", 
    component: movieDetails, props: {show:true} },
  { path: "/movie/edit/:id", 
    component: movieDetails, props: {edit:true} },
  { path: "/movie/create", 
    component: movieDetails, props: {create:true} },
  { path: "/movie/delete/:id", 
    component: movieDetails, props: {delete:true} },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;