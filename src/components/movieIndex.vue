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
            <a class="button" v-on:click="cargarCambios()" style="color:darkorchid">Ejecutar cambios</a>
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
            console.log("URL", this.url);
            fetch(this.url + '/netlify/functions/movieFindAll',
                { headers: { 'Accept': 'application/json' } })
                .then((response) => response.json())
                .then((items) => {
                    this.movies = items;
                })

        },
        deleteMovie(id) {
            fetch(this.url+'/.netlify/functions/movieDelete/'+id,
           { headers: {'Content-Type': 'application/json'},
             method: 'DELETE'})
            .then((items) => {
              this.allmovies();
            }
          )
        },
        cargarCambios(id) {
            fetch(this.url+'/.netlify/functions/movieTasks/',
           { headers: {'Content-Type': 'application/json'},
             method: 'GET'})
            .then((items) => {
              this.allmovies();
            }
          )
        }
    },
    mounted() {
        this.allMovies()
    }
}
</script>