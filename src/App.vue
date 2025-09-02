<template>
  <div id="app">
    <AppHeader @open-request-form="showRequestForm = true" />
    
  <main class="main-content">
    <!-- Показываем компоненты лендинга только на главной странице -->
    <div v-if="isHomePage" class="landing-grid">
      <AppEngineeringSystems 
        v-if="visibility.engineering"
        @navigate="navigateTo('/engineering')"
        class="select-component"
      />
      <AppService 
        v-if="visibility.service"
        @navigate="navigateTo('/service')"
        class="select-component"
      />
      <AppRepair 
        v-if="visibility.repair"
        @navigate="navigateTo('/repair')"
        class="select-component"
      />
      <AppAerodynamics 
        v-if="visibility.aerodynamics"
        @navigate="navigateTo('/aero')"
        class="select-component"
      />
      <AppAutomation 
        v-if="visibility.automation"
        @navigate="navigateTo('/automation')"
        class="select-component"
      />
      <AppClients 
        v-if="visibility.clients"
        @navigate="navigateTo('/clients')"
        class="select-component"
      />
      <AppReviews 
        v-if="visibility.reviews"
        @navigate="navigateTo('/reviews')"
        class="select-component"
      />
      <AppWorkflow 
        v-if="visibility.workflow"
        @navigate="navigateTo('/workflow')"
        class="select-component"
      />
    </div>
    
    <!-- Отображаем компоненты маршрутов -->
    <router-view v-else></router-view>
  </main>

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