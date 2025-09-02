<template>
    <div class="app-header">
        <h1 @click="goHome" style="cursor: pointer;">AppHeader</h1>
        <button @click="openRequestForm" class="submit-btn ">Заявка</button>
    </div>
</template>

<script>
export default {
      methods: {
    goHome() {
      this.$router.push('/');
    },
        openRequestForm() {
      this.$emit('open-request-form');
    },

  }
}
</script>

<style lang="css" src="@/assets/style.css"></style>