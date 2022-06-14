import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: [],
    characters: [],
    current: 'Content',
    currentId: '',
    currentMovie: '',
    testemonial: {},
    charactersMovie: ''
  },
  mutations: {
    SET_MOVIES (state, data) {
      state.movies = data
    },
    SET_CHARACTERS (state, data) {
      state.characters = data
    },
    SET_CHARACTERS_MOVIE (state, data) {
      state.charactersMovie = data
    },
    SET_CURRENT (state, data) {
      state.currentMovie = data
    },
    SET_CURRENT_ID (state, data) {
      state.currentId = data
    },
    SET_COMMENT (state, data) {
      state.testemonial = data
    }
  },
  actions: {
    async getMovies (context) {
      try {
        const response = await axios.get('https://swapi.dev/api/films/')
        context.commit('SET_MOVIES', response.data.results)
      } catch (error) {
        console.error(error)
      }
    },
    async getCharacters (context) {
      let endpoints = [
        'https://swapi.dev/api/people/?page=1',
        'https://swapi.dev/api/people/?page=2',
        'https://swapi.dev/api/people/?page=3',
        'https://swapi.dev/api/people/?page=4',
        'https://swapi.dev/api/people/?page=5',
        'https://swapi.dev/api/people/?page=6',
        'https://swapi.dev/api/people/?page=7',
        'https://swapi.dev/api/people/?page=8',
        'https://swapi.dev/api/people/?page=9',
      ]

      try {
        axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
          (data) => {
            let resp = data.reduce((total, valor) => {
              return total.concat(valor.data.results);
            }, []);
            context.commit('SET_CHARACTERS', resp)
        });
      } catch (error) {
        console.error(error)
      }
    },
    async goToMovie (context, id) {
      try {
        const response = await axios.get(`https://swapi.dev/api/films/${id}`)
        let endpoints = response.data.characters || []
        axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
          (data) => {
            let m = data.map(i => i.data)
            return context.commit('SET_CHARACTERS_MOVIE', m)
        });
        context.commit('SET_CURRENT', response.data)
      } catch (error) {
        console.error(error)
      }
    },
    async sendMessage (context, payload) {
      try {
        const response = await axios.post('https://swapi.dev/api/films/', payload)
        context.commit('SET_COMMENT', response.data)
      } catch (error) {
        console.error(error)
      }
    }
  },
  modules: {
  }
})
