<template>
  <div class="content-renderer">
    <div v-for="(item, index) in content" :key="index" class="content-item">
      <!-- Базовые типы контента -->
      <p v-if="item.type === 'paragraph'" class="content-paragraph">{{ item.text }}</p>
      
      <ul v-if="item.type === 'list'" class="content-list">
        <li v-for="(listItem, listIndex) in item.items" :key="listIndex" class="content-list-item">
          {{ listItem }}
        </li>
      </ul>
      
      <!-- Специальные типы для конкретных компонентов -->
      <div v-if="item.type === 'client'" class="client-item">
        <img :src="getIconUrl(item.icon)" :alt="item.name" class="client-icon">
        <div class="client-info">
          <h4>{{ item.name }}</h4>
          <p>{{ item.description }}</p>
          <a v-if="item.link" :href="item.link" target="_blank" class="client-link">Сайт компании</a>
        </div>
      </div>
      
      <div v-if="item.type === 'review'" class="review-item">
        <img :src="getIconUrl(item.icon)" :alt="item.company" class="review-icon">
        <div class="review-info">
          <h4>{{ item.company }}</h4>
          <p>{{ item.text }}</p>
          <div class="review-links">
            <a v-if="item.link" :href="item.link" target="_blank" class="review-link">Сайт компании</a>
            <a v-if="item.document" :href="item.document" target="_blank" class="review-link">Отзыв PDF</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentRenderer',
  props: {
    content: {
      type: Array,
      required: true
    }
  },
  methods: {
    getIconUrl(iconName) {
      return `/icons/${iconName}.svg`;
    }
  }
}
</script>

<style scoped>
/* Стили для клиентов и отзывов */
.client-item, .review-item {
  display: flex;
  align-items: center;
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.client-icon, .review-icon {
  width: 50px;
  height: 50px;
  margin-right: 1rem;
  object-fit: contain;
}

.client-info h4, .review-info h4 {
  margin: 0 0 0.5rem 0;
  color: var(--light_font);
}

.client-link, .review-link {
  color: var(--green);
  text-decoration: none;
  margin-right: 1rem;
}

.client-link:hover, .review-link:hover {
  text-decoration: underline;
}

.review-links {
  margin-top: 0.5rem;
}
</style>