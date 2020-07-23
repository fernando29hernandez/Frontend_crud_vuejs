<template>

  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class=" titulo navbar-nav mr-auto">
          <span >CRUD EXAMPLE</span>
      </div>
    </nav>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped>
.titulo{
color: beige;
}
</style>