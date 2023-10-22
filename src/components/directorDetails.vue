<template>
    <div class="row">
        <div class="eleven column" style="margin-top: 5%">
            <h2>{{ title }}</h2>
            <form>
                <div class="row">
                    <label for="nombreInput">Nombre</label>
                    <input class="u-full-width" type="text" v-model="director.nombre">
                </div>
                <div class="row">
                    <div class="six columns">
                        <label for="origenInput">Pais de origen</label>
                        <input class="u-full-width" type="tel" v-model="director.origen">
                    </div>
                    <div class="six columns" style="margin-bottom: 2%;">
                        <label for="nacimientoInput">Año de nacimiento</label>
                        <input class="u-full-width" type="tel" v-model="director.nacimiento">
                    </div>
                    <router-link class="button button-primary" to="/director">Back</router-link>
                    <a v-if='edit' class="button button-primary" style="float: right" v-on:click="updateDirector()">Update</a>
                    <a v-if='create' class="button button-primary" style="float: right"
                        v-on:click="createDirector()">Create</a>
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
            title: "Datos del director",
            director: {
                'id': 0,
                'nombre': '',
                'origen': '',
                'nacimiento': 0,
                'image': ''
            },
            id: 0,
        }
    },
    created() {
        const route = useRoute();
        this.id = route.params.id;
        this.findDirector(route.params.id);
    },
    methods: {
        findDirector: function (id) {
            fetch('http://localhost:1337/director/' + id,
                { headers: { 'Accept': 'application/json' } })
                .then((response) => response.json())
                .then((result) => {
                    this.director = result;
                })
        },
        updateDirector: function () {
            fetch('http://localhost:1337/director/' + this.id,
                {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: JSON.stringify(this.director)
                })
                .then((data) => {

                    this.$router.push('/director');
                }
                )
        },
        createDirector: function () {
            fetch('http://localhost:1337/director',
                {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'PUT',
                    body: JSON.stringify(this.director)
                })
                .then((data) => {
                    this.$router.push('/director');
                }
                )
        },
        findId() {
            fetch('http://localhost:1337/director', {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            })
                .then((response) => response.json())
                .then((result) => {
                    const directores = result;
                    this.director.id = directores[directores.length - 1].id + 1;
                });
        },
    },
    mounted() {
        this.findId()
    }
}
</script>