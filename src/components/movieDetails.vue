<template>
    <div class="row">
        <div class="eleven column" style="margin-top: 5%">
            <h2>{{ title }}</h2>
            <form>
                <div class="row">
                    <label for="tituloInput">Titulo</label>
                    <input class="u-full-width" type="text" v-model="movie.title">
                </div>
                <div class="row">
                    <label for="sinopsisInput">Sinopsis</label>
                    <textarea class="u-full-width" rows="4" cols="50" v-model="movie.sinopsis"></textarea>
                </div>
                <div class="row">
                    <div class="six columns">
                        <label for="directorInput">Director</label>
                        <select class="u-full-width" id="director" v-model="movie.director">
                            <option v-for="(option, index) in director" :key="index" :value="option.id">{{ option.nombre
                            }}</option>
                        </select>
                    </div>
                    <div class="six columns">
                        <label for="estudioInput">Estudio</label>
                        <select class="u-full-width" id="estudio" v-model="movie.estudio">
                            <option v-for="(option2, index) in estudio" :key="index" :value="option2.id">{{
                                option2.nombre }}</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="seven columns">
                        <label for="imagenInput">Imagen</label>
                        <input type="file" ref="fileInput" accept="image/*">
                        <button @click="uploadImage" style="margin-left: 10px;">Subir</button>
                    </div>
                    <div class="five columns" style="margin-bottom: 2%;">
                        <label for="lanzamientoInput">Año de lanzamiento</label>
                        <input class="u-full-width" type="tel" v-model="movie.ano_lanzamiento">
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
    props: ['create', 'edit'],
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
            director: [],
            estudio: [],
            id: 0,
        }
    },
    created() {
        const route = useRoute();
        this.id = route.params.id;
        this.findMovie(route.params.id);
    },
    methods: {
        findMovie: function (id) {
            fetch('http://localhost:1337/movie/' + id,
                { headers: { 'Accept': 'application/json' } })
                .then((response) => response.json())
                .then((result) => {
                    this.movie = result;
                })
        },
        updateMovie: function () {
            fetch('http://localhost:1337/movie/' + this.id,
                {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: JSON.stringify(this.movie)
                })
                .then((data) => {

                    this.$router.push('/movie');
                }
                )
        },
        createMovie: function () {
            fetch(this.url + '/.netlify/functions/bookInsert',
                {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: JSON.stringify(this.book)
                })
                .then((data) => {
                    this.$router.push('/book');
                }
                )
        },
        loadData() {

            fetch('http://localhost:1337/director', {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            })
                .then((response) => response.json())
                .then((result) => {
                    this.director = result;
                });

            fetch('http://localhost:1337/studio', {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            })
                .then((response) => response.json())
                .then((result) => {
                    this.estudio = result;
                });
        },
        async uploadImage() {
            console.log("LLEGA");
            const fileInput = this.$refs.fileInput;
            const formData = new FormData();
            formData.append('imagen', fileInput.files[0]); // 'imagen' es el nombre del campo en el servidor

            try {
                const response = await fetch('http://localhost:1337/imagen', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    console.log('Imagen subida con éxito');
                } else {
                    console.error('Error al subir la imagen');
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        },
        findId() {
            fetch('http://localhost:1337/movies', {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            })
                .then((response) => response.json())
                .then((result) => {
                    const movies = result;
                    this.movie.id = movies[movies.length - 1].id + 1;
                });
        },
    },
    mounted() {
        this.loadData()
        this.findId()
    }
}
</script>