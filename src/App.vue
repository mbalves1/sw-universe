


<template>
  <v-app id="inspire">
    <v-app-bar app class="navbar" dark elevation="0">

      <router-link to="/">
        <v-toolbar-title class="navbar-title">Star Wars Universe</v-toolbar-title>
      </router-link>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ drawer: null }),
  }
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&family=Poppins:wght@300&display=swap');
* {
  font-family: 'Fira Code', monospace;
}

a {
  text-decoration: none;
}

.navbar {
  &-title {
    color: white;
    font-weight: bold;
  }
}
</style>