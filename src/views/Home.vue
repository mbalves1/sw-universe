<template>
  <div class="home">
    <!-- <Content></Content> -->
    <component :is="current"></component>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// @ is an alias to /src
import Content from '../components/Content.vue'
import Movie from '../components/Movie.vue'

export default {
  name: 'Home',
  components: {
    Content,
    Movie
  },
  computed: {
    ...mapState(['current'])
  }
}
</script>
