<template>
    <div class="row">
        <div style="margin-top: 5%">
            <h2>{{ title }}</h2>
            <form>
                <div class="row">
                    <div class="eight columns">
                        <label for="tituloInput">Titulo</label>
                        <input class="u-full-width" type="text" v-model="movie.title" readonly>
                    </div>
                    <div class="four columns">
                        <label for="lanzamientoInput">Año de lanzamiento</label>
                        <input class="u-full-width" type="tel" v-model="movie.ano_lanzamiento" readonly>
                    </div>
                </div>
                <div class="row">
                    <label for="sinopsisInput">Sinopsis</label>
                    <textarea class="u-full-width" rows="4" cols="50" v-model="movie.sinopsis" readonly></textarea>
                </div>
                <div class="row">
                    <div class="six columns">
                        <label for="directorInput">Director</label>
                        <input class="u-full-width" type="tel" v-model="movie.director" readonly>
                    </div>
                    <div class="six columns">
                        <label for="estudioInput">Estudio</label>
                        <input class="u-full-width" type="tel" v-model="movie.estudio" readonly>
                    </div>

                    <router-link class="button button-primary" to="/movie">Back</router-link>
                    <a v-if='edit' class="button button-primary" style="float: right" v-on:click="updateMovie()">Update</a>
                    <a v-if='create' class="button button-primary" style="float: right"
                        v-on:click="createMovie()">Create</a>
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
            title: "Datos de la pelicula",
            movie: {
                'id': 0,
                'title': '',
                'sinopsis': '',
                'ano_lanzamiento': 0,
                'estudio': 0,
                'director': 0,
                'img': ''
            },
        }
    },
    created() {
        const route = useRoute();
        this.findMovie(route.params.id);
    },
    methods: {
        findMovie: function (id) {
            fetch(this.url + '/.netlify/functions/movieFind/' + id, { headers: { 'Accept': 'application/json' } })
                .then((response) => response.json())
                .then((result) => {
                    this.movie = result;
                    fetch(this.url + '/.netlify/functions/directorFind/' + this.movie.director, { headers: { 'Accept': 'application/json' } })
                        .then((response) => response.json())
                        .then((result) => {
                            this.movie.director = result.nombre;
                        })
                        .catch((error) => {
                            console.error('Error en la segunda llamada:', error);
                        });

                    fetch(this.url + '/.netlify/functions/studioFind/' + this.movie.estudio, { headers: { 'Accept': 'application/json' } })
                        .then((response) => response.json())
                        .then((result) => {
                            this.movie.estudio = result.nombre;
                        })
                        .catch((error) => {
                            console.error('Error en la segunda llamada:', error);
                        });
                })
                .catch((error) => {
                    console.error('Error en la primera llamada:', error);
                });
        },
    }
}
</script>