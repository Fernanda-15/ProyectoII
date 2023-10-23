<template>
    <div class="row">
        <div style="margin-top: 5%">
            <h2>{{ title }}</h2>
            <form>
                <div class="row">
                    <label for="nombreInput">Nombre</label>
                    <input class="u-full-width" type="text" v-model="estudio.nombre" readonly>
                </div>
                <div class="row">
                    <label for="lanzamientoInput">Ubicación</label>
                    <input class="u-full-width" type="tel" v-model="estudio.ubicacion" readonly>
                </div>
                <div class="row">
                    <label for="sinopsisInput">Año de fundación</label>
                    <input class="u-full-width" type="tel" v-model="estudio.fundacion" readonly>
                </div>
                <div class="row">
                    <router-link class="button button-primary" to="/estudio">Back</router-link>
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
            title: "Datos del estudio",
            estudio: {
                'id': 0,
                'nombre': '',
                'ubicacion': '',
                'fundacion': 0,
                'image': ''
            },
        }
    },
    created() {
        const route = useRoute();
        this.findEstudio(route.params.id);
    },
    methods: {
        findEstudio: function (id) {
            fetch(this.url + '/.netlify/functions/studioFind/' + id, { headers: { 'Accept': 'application/json' } })
                .then((response) => response.json())
                .then((result) => {
                    this.estudio = result;
                })
                .catch((error) => {
                    console.error('Error en la primera llamada:', error);
                });
        },
    }
}
</script>