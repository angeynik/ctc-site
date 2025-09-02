<template>
  <div class="request-form-overlay" v-if="isVisible" @click.self="close">
    <div class="request-form-container">
      <button class="close-btn" @click="close">×</button>
      
      <div v-if="!isSubmitted">
        <h2>Заполните форму</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Имя:</label>
            <input 
              id="name" 
              v-model="formData.name" 
              type="text" 
              required 
              placeholder="Введите ваше имя"
            >
          </div>
          
          <div class="form-group">
            <label for="phone">Телефон:</label>
            <input 
              id="phone" 
              v-model="formData.phone" 
              type="tel" 
              required 
              placeholder="+7 (XXX) XXX-XX-XX"
            >
          </div>
          
          <div class="form-group">
            <label for="email">Email:</label>
            <input 
              id="email" 
              v-model="formData.email" 
              type="email" 
              required 
              placeholder="your@email.com"
            >
          </div>
          
          <div class="form-group">
            <label>Интересует:</label>
            <div class="checkbox-group">
              <label v-for="service in services" :key="service.value" class="checkbox-label">
                <input 
                  type="checkbox" 
                  :value="service.value" 
                  v-model="formData.interests"
                >
                {{ service.label }}
              </label>
            </div>
          </div>
          
          <div class="form-group">
            <label for="message">Сообщение:</label>
            <textarea 
              id="message" 
              v-model="formData.message" 
              placeholder="Расскажите о вашем проекте или задайте вопрос"
              rows="4"
            ></textarea>
          </div>
          
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? 'Отправка...' : 'Отправить' }}
          </button>
        </form>
      </div>
      
      <div v-else class="success-message">
        <h2>Спасибо!</h2>
        <p>Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.</p>
        <div class="success-icon">✓</div>
        <p class="closing-text">Окно закроется автоматически через {{ countdown }} секунд...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RequestForm',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        name: '',
        phone: '',
        email: '',
        interests: [],
        message: ''
      },
      services: [
        { value: 'engineering', label: 'Инженерные системы' },
        { value: 'service', label: 'Сервисное обслуживание' },
        { value: 'repair', label: 'Ремонт оборудования' },
        { value: 'aerodynamics', label: 'Аэродинамика' },
        { value: 'automation', label: 'Автоматизация' }
      ],
      isSubmitting: false,
      isSubmitted: false,
      countdown: 3,
      countdownInterval: null
    }
  },
  watch: {
    isVisible(newVal) {
      if (newVal && this.isSubmitted) {
        this.resetForm();
      }
    }
  },
  methods: {
    submitForm() {
      this.isSubmitting = true;
      
      // Имитация отправки данных
      setTimeout(() => {
        console.log('Форма отправлена:', this.formData);
        this.isSubmitting = false;
        this.isSubmitted = true;
        this.startCountdown();
      }, 1500);
    },
    
    startCountdown() {
      this.countdown = 3;
      this.countdownInterval = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          this.close();
        }
      }, 1000);
    },
    
    close() {
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
      }
      this.$emit('close');
      this.resetForm();
    },
    
    resetForm() {
      this.formData = {
        name: '',
        phone: '',
        email: '',
        interests: [],
        message: ''
      };
      this.isSubmitted = false;
      this.isSubmitting = false;
    }
  },
  beforeUnmount() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}
</script>

<style lang="css" src="@/assets/style.css"></style>