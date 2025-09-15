<template>
  <div id="app">
    <AppHeader @open-request-form="showRequestForm = true" />
    
    <main class="main-content">
      <!-- Показываем компоненты лендинга только на главной странице -->
      <div v-if="isHomePage" class="landing-grid">
        <!-- <AppEngineeringSystems 
          v-if="visibility.engineering"
          @navigate="navigateTo('/engineering')"
          @request-form="showRequestForm = true"
          :class="getComponentClass('engineering')"
        /> -->
          <!-- @navigate="navigateTo('/service')"
          @navigate="navigateTo('/repair')"
          @navigate="navigateTo('/aero')"
          @navigate="navigateTo('/automation')"
          @navigate="navigateTo('/clients')"
          @navigate="navigateTo('/reviews')"
          @navigate="navigateTo('/workflow')" -->


        <AppEngineeringSystems 
          v-if="visibility.engineering"
          @request-form="showRequestForm = true"
          :class="getComponentClass('engineering')"
        />
        <AppService 
          v-if="visibility.service"
          @request-form="showRequestForm = true"
          :class="getComponentClass('service')"
        />
        <AppRepair 
          v-if="visibility.repair"
          @request-form="showRequestForm = true"
          :class="getComponentClass('repair')"
        />
        <AppAerodynamics 
          v-if="visibility.aerodynamics"
          @request-form="showRequestForm = true"
          :class="getComponentClass('aerodynamics')"
        />
        <AppAutomation 
          v-if="visibility.automation"
          @request-form="showRequestForm = true"
          :class="getComponentClass('automation')"
        />
        <AppClients 
          v-if="visibility.clients"
          @request-form="showRequestForm = true"
          :class="getComponentClass('clients')"
        />
        <AppReviews 
          v-if="visibility.reviews"
          @request-form="showRequestForm = true"
          :class="getComponentClass('reviews')"
        />
        <AppWorkflow 
          v-if="visibility.workflow"
          @request-form="showRequestForm = true"
          :class="getComponentClass('workflow')"
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
        engineering: false,
        service: true,
        repair: true,
        aerodynamics: true,
        automation: false,
        clients: false,
        reviews: false,
        workflow: false,
      },
      showRequestForm: false
    }
  },
  computed: {
    isHomePage() {
      return this.$route.path === '/';
    },
    // Вычисляем порядок видимых компонентов
    visibleComponentsOrder() {
      const order = [
        'engineering', 'service', 'repair', 'aerodynamics', 
        'automation', 'clients', 'reviews', 'workflow'
      ];
      
      return order.filter(key => this.visibility[key]);
    },
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    // Метод для определения класса компонента
    getComponentClass(componentKey) {
      const index = this.visibleComponentsOrder.indexOf(componentKey);
      return index % 2 === 0 ? 'landing-component' : 'landing-component-dark';
    },
  },

}
</script>

<style lang="css" src="@/assets/style.css"></style>