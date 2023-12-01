<template>
  <div id="app">
    <router-view />
  </div>
  <footer id="footer">Desenvolvido por Michael Lima ©</footer>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  margin-bottom: 20px;
}
#footer{
  margin-top: 6%;
}

</style>
