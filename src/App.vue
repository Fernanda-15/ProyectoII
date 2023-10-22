<template>
  <div id="app" class="container" style="justify-content: center; flex-direction: column; display: flex; align-items: center;">
    <div class="row" style="margin-top: 5%;">
      <router-link class="button button-primary" 
       style="margin-right: 50px;" to="/movie">Peliculas
      </router-link> 
      <router-link class="button button-primary" 
       style="margin-right: 50px;" to="/director">Directores
      </router-link>
      <router-link class="button button-primary" 
       to="/estudio">Estudios
      </router-link>
    </div>
    <router-view>
    </router-view>
  </div>
</template>
    
    <script>
    export default {
      name: "App",
    };
    </script>