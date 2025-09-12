<template>
  <div :class="componentClass" @click="navigate">
    <div v-if="loading" class="loading-spinner">
      Загрузка...
    </div>
    
    <div v-else-if="content" class="component-content">
      <div class="component-header">
        <div class="component-header__title">{{ content.title }}</div>
        <div class="component-header__description">{{ content.subtitle }}</div>
      </div>
      <div class="header-divider"></div>
      
      <div class="component-body">
        <div class="component-icon">
            <img 
              :src="iconUrl" 
              :alt="content.title" 
              @error="handleIconError"
            >
        </div>
        
        <div class="info-blocks">
          <div 
            v-for="(block, index) in content.infoBlocks" 
            :key="index" 
            class="info-block"
          >
            <h3 v-if="block.title">{{ block.title }}</h3>
            <ContentRenderer :content="block.content || convertLegacyContent(block)" />
          </div>
        </div>
      </div>
      
      <div class="component-footer">
        <button class="action-btn" @click.stop="handleButtonClick">
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
import ContentRenderer from './ContentRenderer.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AppClients',
  components: {
    ContentRenderer
  },
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
    computed: {
    ...mapGetters('icons', ['getIconUrl']),
    iconUrl() {
      return this.content ? this.getIconUrl(this.content.icon) : '';
    }
  },
  methods: {
    ...mapActions('icons', ['handleIconError']),
    navigate() {
      // Не срабатывает при клике на кнопку благодаря @click.stop
      this.$emit('navigate');
    },
    handleButtonClick() {
      this.$emit('request-form');
    },
    convertLegacyContent(block) {
      if (block.description) {
        return [
          {
            type: "paragraph",
            text: block.description
          }
        ];
      }
      return [];
    }
  },
  async mounted() {
    this.loading = true;
    console.log('[AppClients] - Mounted - Попытка загрузки контента');
    try {
      this.content = await this.$store.dispatch('content/fetchContent', {
        contentType: 'landingContent',
        componentKey: 'clients'
      });
      console.log('[AppClients] - Mounted - Контент загружен:', this.content);
    } catch (error) {
      console.error('Ошибка загрузки контента:', error);
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style lang="css" src="@/assets/style.css"></style>