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
import ContentRenderer from './ContentRenderer.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AppEngineeringSystems',
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
      this.$emit('navigate');
    },
    navigateTo() {
      if (this.content && this.content.buttonAction) {
        this.$router.push(this.content.buttonAction);
      }
    },
    // getIconUrl(iconName) {
    //   // Проверяем, содержит ли имя иконки уже расширение
    //   const hasExtension = iconName.includes('.');
      
    //   if (hasExtension) {
    //     return `/icons/${iconName}`;
    //   } else {
    //     // Пробуем сначала загрузить SVG, если нет - PNG
    //     return `/icons/${iconName}.svg`;
    //   }
    // },
    //   handleIconError(event) {
    //   const img = event.target;
    //   const src = img.src;
      
    //   // Если не загрузилась svg, пробуем png
    //   if (src.endsWith('.svg')) {
    //     img.src = src.replace('.svg', '.png');
    //     img.onerror = null; // Сбрасываем обработчик чтобы избежать цикла
    //   }
    // },
    // Метод для конвертации старой структуры в новую
    convertLegacyContent(block) {
      if (block.description) {
        // Если есть описание, преобразуем его в параграф
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