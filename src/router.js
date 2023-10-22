import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import movieIndex from "./components/movieIndex.vue";
import movieDetails from "./components/movieDetails.vue";
import estudioIndex from "./components/estudioIndex.vue";
import estudioDetails from "./components/estudioDetails.vue";
import directorIndex from "./components/directorIndex.vue";
import directorDetails from "./components/directorDetails.vue";

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
  { path: "/estudio", component: estudioIndex },  
  { path: "/estudio/show/:id", 
    component: estudioDetails, props: {show:true} },  
  { path: "/estudio/edit/:id", 
    component: estudioDetails, props: {edit:true} },
  { path: "/estudio/create/:id", 
    component: estudioDetails, props: {create:true} },
  { path: "/estudio/delete/:id", 
    component: estudioDetails, props: {delete:true} },
  { path: "/director", component: directorIndex },  
  { path: "/director/show/:id", 
    component: directorDetails, props: {show:true} },  
  { path: "/director/edit/:id", 
    component: directorDetails, props: {edit:true} },
  { path: "/director/create/:id", 
    component: directorDetails, props: {create:true} },
  { path: "/director/delete/:id", 
    component: directorDetails, props: {delete:true} },      
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;