<template>
  <div class="app-header">
    <div class="header-icon" @click="goHome">
      <img 
        :src="iconUrl" 
        :alt="logo" 
        @error="handleIconError"
      >
    </div>
        <!-- <div class="app-header">
        <h1 @click="goHome" style="cursor: pointer;">AppHeader</h1>
    </div> -->
    <!-- <div>
        <button @click="openRequestForm" class="submit-btn ">Заявка</button>
    </div> -->
    <div class="header-title">
      <!-- <h1>{{ appName }}</h1> -->

       <h1> Инженерные системы зданий </h1>
    </div>
    
  <div class="header-icon" @click="toggleMenu">
      <img 
        :src="menuIconUrl" 
        alt="Меню" 
        @error="handleIconError"
      >
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: {
    ...mapGetters('icons', ['getIconUrl']),
    iconUrl() {
      return this.getIconUrl('logo');
    },
    menuIconUrl() {
      return this.getIconUrl('menu');
    }
  },
  methods: {
        ...mapActions('icons', ['handleIconError']),
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