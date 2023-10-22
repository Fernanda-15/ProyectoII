import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

 import './assets/CSS/normalize.css';
import './assets/CSS/skeleton.css';

const app = createApp(App);
  
app.config.globalProperties.url = 'https://tourmaline-lollipop-786e11.netlify.app';


app.use(router).mount("#app");