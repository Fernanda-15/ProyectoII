<template>
    <div class="row">
        <div class="eleven column" style="margin-top: 5%">
            <h2>{{ title }}</h2>
            <form>
                <div class="row">
                    <label for="nombreInput">Nombre</label>
                    <input class="u-full-width" type="text" v-model="estudio.nombre">
                </div>
                <div class="row">
                    <div class="six columns">
                        <label for="origenInput">Ubicación</label>
                        <input class="u-full-width" type="tel" v-model="estudio.ubicacion">
                    </div>
                    <div class="six columns" style="margin-bottom: 2%;">
                        <label for="nacimientoInput">Año de fundacion</label>
                        <input class="u-full-width" type="tel" v-model="estudio.fundacion">
                    </div>
                    <router-link class="button button-primary" to="/estudio">Back</router-link>
                    <a v-if='edit' class="button button-primary" style="float: right" v-on:click="updateEstudio()">Update</a>
                    <a v-if='create' class="button button-primary" style="float: right"
                        v-on:click="createEstudio()">Create</a>
                </div>

            </form>
        </div>
    </div>
</template>
  
<script>

import { useRoute } from 'vue-router'

export default {
    props: ['create', 'edit'],
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
            id: 0,
        }
    },
    created() {
        const route = useRoute();
        this.id = route.params.id;
        this.findEstudio(route.params.id);
    },
    methods: {
        findEstudio: function (id) {
            fetch(this.url + '/.netlify/functions/studioFind/' + id,
                { headers: { 'Accept': 'application/json' } })
                .then((response) => response.json())
                .then((result) => {
                    this.estudio = result;
                })
        },
        updateEstudio: function () {
            fetch(this.url + '/.netlify/functions/studioUpdate/' + this.id,
                {
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.estudio)
                })
                .then((data) => {

                    this.$router.push('/estudio');
                }
                )
        },
        createEstudio: function () {
            fetch(this.url + '/.netlify/functions/studioInsert',
                {
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.director)
                })
                .then((data) => {
                    this.$router.push('/estudio');
                }
                )
        },
        findId() {
            fetch(this.url + '/.netlify/functions/studioFindAll', {
                headers: { 'Accept': 'application/json' }
            })
                .then((response) => response.json())
                .then((result) => {
                    const estudios = result;
                    this.estudio.id = estudios[estudios.length - 1].id + 1;
                });
        },
    },
    mounted() {
        this.findId()
    }
}
</script>