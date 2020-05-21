<template>
  <div class="app_wrapper">
    <navbar />
    <div class="main_container">
      <router-view />
    </div>
  </div>
</template>

<script>
import navbar from "./Navbar";
export default {
  name: "app_wrapper",
  components: {
    navbar
  }
};
</script>

<style lang="scss">
.main_container {
  padding: 10px;
  box-sizing: border-box;
}
</style>