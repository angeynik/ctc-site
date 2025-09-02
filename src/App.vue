<template>
  <div id="app">
    <AppHeader />
    
    <!-- Компоненты лендинга с управлением видимостью -->
    <!-- <router-view></router-view> -->

    <AppEngineeringSystems 
      v-if="visibility.engineering && $route.path === '/'"
      @navigate="navigateTo('/engineering')"
    />
    <AppService 
      v-if="visibility.engineering && $route.path === '/'"
      @navigate="navigateTo('/service')"
    />
    <AppRepair 
      v-if="visibility.repair"
      @navigate="navigateTo('/repair')"
    />
    <AppAerodynamics 
      v-if="visibility.aerodynamics"
      @navigate="navigateTo('/aero')"
    />
    <AppAutomation 
      v-if="visibility.automation"
      @navigate="navigateTo('/automation')"
    />
    <AppClients 
      v-if="visibility.clients"
      @navigate="navigateTo('/clients')"
    />
    <AppReviews 
      v-if="visibility.reviews"
      @navigate="navigateTo('/reviews')"
    />
    <AppWorkflow 
      v-if="visibility.workflow"
      @navigate="navigateTo('/workflow')"
    />
    
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppEngineeringSystems from './components/AppEngineeringSystems.vue'
import AppService from './components/AppService.vue'
import AppRepair from './components/AppRepair.vue'
import AppAerodynamics from './components/AppAerodynamics.vue'
import AppAutomation from './components/AppAutomation.vue'
import AppClients from './components/AppClients.vue'
import AppReviews from './components/AppReviews.vue'
import AppWorkflow from './components/AppWorkflow.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppEngineeringSystems,
    AppService,
    AppRepair,
    AppAerodynamics,
    AppAutomation,
    AppClients,
    AppReviews,
    AppWorkflow,
    AppFooter
  },
  data() {
    return {
      visibility: {
        engineering: true,
        service: true,
        repair: true,
        aerodynamics: true,
        automation: true,
        clients: true,
        reviews: true,
        workflow: true,
      }
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
  }
}
</script>

<style lang="css" src="@/assets/style.css"></style>