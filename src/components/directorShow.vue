<template>
    <div class="row">
        <div style="margin-top: 5%">
            <h2>{{ title }}</h2>
            <form>
                <div class="row">
                    <div class="eight columns">
                        <label for="nombreInput">Nombre</label>
                        <input class="u-full-width" type="text" v-model="director.nombre" readonly>
                    </div>
                    <div class="four columns">
                        <label for="lanzamientoInput">Pais de origen</label>
                        <input class="u-full-width" type="tel" v-model="director.origen" readonly>
                    </div>
                </div>
                <div class="row">
                    <label for="sinopsisInput">Año de nacimiento</label>
                    <input class="u-full-width" type="tel" v-model="director.nacimiento" readonly>
                </div>
                <div class="row">
                    <router-link class="button button-primary" to="/director">Back</router-link>
                </div>

            </form>
        </div>

    </div>
</template>
  

<script>
import { useRoute } from 'vue-router'

export default {
    data: function () {
        return {
            title: "Datos del director",
            director: {
                'id': 0,
                'nombre': '',
                'origen': '',
                'nacimiento': 0,
                'image': ''
            },
        }
    },
    created() {
        const route = useRoute();
        this.findDirector(route.params.id);
    },
    methods: {
        findDirector: function (id) {
            fetch(this.url + '/.netlify/functions/directorFind/' + id, { headers: { 'Accept': 'application/json' } })
                .then((response) => response.json())
                .then((result) => {
                    this.director = result;
                })
                .catch((error) => {
                    console.error('Error en la primera llamada:', error);
                });
        },
    }
}
</script>