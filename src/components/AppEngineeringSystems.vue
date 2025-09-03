<template>
  <div :class="componentClass" @click="navigate">
    <div v-if="loading" class="loading-spinner">
      Загрузка...
    </div>
    
    <div v-else-if="content" class="component-content">
      <div class="component-header">
        <h2>{{ content.title }}</h2>
        <p>{{ content.subtitle }}</p>
      </div>
      
      <div class="component-body">
        <div class="component-icon">
          <img :src="getIconUrl(content.icon)" :alt="content.title">
        </div>
        
        <div class="info-blocks">
          <div 
            v-for="(block, index) in content.infoBlocks" 
            :key="index" 
            class="info-block"
          >
            <h3>{{ block.title }}</h3>
            <p>{{ block.description }}</p>
          </div>
        </div>
      </div>
      
      <div class="component-footer">
        <button class="action-btn" @click.stop="navigateTo">
          {{ content.buttonText }}
        </button>
      </div>
    </div>
    
    <div v-else class="error-message">
      Контент не загружен
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppEngineeringSystems',
  props: {
    componentClass: {
      type: String,
      default: 'landing-component'
    }
  },
  data() {
    return {
      content: null,
      loading: false
    };
  },
  methods: {
    navigate() {
      this.$emit('navigate');
    },
    navigateTo() {
      if (this.content && this.content.buttonAction) {
        this.$router.push(this.content.buttonAction);
      }
    },
    getIconUrl(iconName) {
      return `/icons/${iconName}.svg`;
    }
  },
  async mounted() {
    this.loading = true;
    console.log('[AppEngineeringSystems] - Mounted - Попытка загрузки контента');
    try {
      this.content = await this.$store.dispatch('content/fetchContent', {
        contentType: 'landingContent',
        componentKey: 'engineering'
      });
      console.log('[AppEngineeringSystems] - Mounted - Контент загружен:', this.content);
    } catch (error) {
      console.error('Ошибка загрузки контента:', error);
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style lang="css" src="@/assets/style.css"></style>