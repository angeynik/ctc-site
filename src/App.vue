<template>
  <div id="app">
    <AppHeader @open-request-form="showRequestForm = true" />
    
    <!-- Показываем компоненты лендинга только на главной странице -->
    <div v-if="isHomePage">
      <AppEngineeringSystems 
        v-if="visibility.engineering"
        @navigate="navigateTo('/engineering')"
      />
      <AppService 
        v-if="visibility.service"
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
    </div>
    
    <!-- Отображаем компоненты маршрутов -->
    <router-view v-else></router-view>
    
    <AppFooter />
    <RequestForm 
      :is-visible="showRequestForm" 
      @close="showRequestForm = false" 
    />

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
import RequestForm from './components/RequestForm.vue'

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
    AppFooter,
    RequestForm
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
      },
      showRequestForm: false
    }
  },
  computed: {
    isHomePage() {
      return this.$route.path === '/';
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