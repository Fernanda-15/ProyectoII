<template>
    <div class="row">
        <div style="margin-top: 3%">
            <h2>{{ title }}</h2>
            <router-link class="button button-primary" to="/movie/create">Agregar</router-link>
            <table style="margin-top: 1%;">
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Año de lanzamiento</th>
                        <th>Estudio</th>
                        <th>Director</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='movie in movies'>
                        <td>{{ movie.title }}</td>
                        <td>{{ movie.ano_lanzamiento }}</td>
                        <td>{{ movie.estudio }}</td>
                        <td>{{ movie.director }}</td>
                        <td>
                            <router-link class="button" :to="'/movie/show/' + movie.id"
                                style="color: cornflowerblue">Mostrar</router-link>
                            <router-link class="button" :to="'/movie/edit/' + movie.id"
                                style="color:rgb(231, 205, 55)">Editar</router-link>
                            <a class="button" v-on:click="deleteMovie(movie.id)" style="color:crimson">Eliminar</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            movies: [],
            title: 'Lista de peliculas'
        }
    },
    methods: {
        allMovies() {
            fetch('http://localhost:1337/movies', {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            })
                .then((response) => response.json())
                .then((result) => {
                    this.movies = result;
                    const promiseDirector = this.movies.map((movie) =>
                        fetch('http://localhost:1337/director/' + movie.director, {
                            method: 'GET',
                            headers: { 'Accept': 'application/json' }
                        })
                            .then((response) => response.json())
                            .then((directorResult) => {
                                movie.director = directorResult.nombre;

                            })
                    );

                    const promiseStudio = this.movies.map((movie) =>
                        fetch('http://localhost:1337/studio/' + movie.estudio, {
                            method: 'GET',
                            headers: { 'Accept': 'application/json' }
                        })
                            .then((response) => response.json())
                            .then((studioResult) => {
                                movie.estudio = studioResult.nombre;

                            })
                    );

                    return Promise.all([promiseDirector, promiseStudio]);
                })
                .then(() => {
                    console.log(this.movies);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

        },
        deleteMovie(id) {
            fetch('http://localhost:1337/movie/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((result) => {
                })
            this.allMovies();
        }
    },
    mounted() {
        this.allMovies()
    }
}
</script>