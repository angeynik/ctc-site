<template>
    <div class="app-header">
        <h1 @click="goHome" style="cursor: pointer;">AppHeader</h1>
    </div>
</template>

<script>
export default {
      methods: {
    goHome() {
      this.$router.push('/');
    }
  }
}
</script>

<style>

</style>