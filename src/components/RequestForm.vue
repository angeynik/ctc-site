<template>
  <div class="request-form-overlay" v-if="isVisible" @click.self="close">
    <div class="request-form-container">
      <button class="close-btn" @click="close">×</button>
      
      <div v-if="!isSubmitted">
        <h2>Заявка на консультацию</h2>
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
            <div class="phone-input-container" :class="{ error: phoneError, success: formData.phone && !phoneError }">
              <select id="country" v-model="formData.country" @change="updatePlaceholder" class="country-select">
                <option value="by">BY</option>
                <option value="ru">RU</option>
                <option value="other">Other</option>
              </select>
              <input 
                id="phone" 
                v-model="formData.phone" 
                type="tel" 
                required 
                :placeholder="phonePlaceholder"
                class="phone-input"
                @blur="validatePhone"
                @input="clearPhoneError"
              >
            </div>
            <small class="format-hint" v-if="formData.country && !phoneError">
              Формат: {{ phonePlaceholder }}
            </small>
            <small v-if="phoneError" class="format-error">
              {{ phoneError }}
            </small>
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
              <span>{{ service.label }}</span>
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
          
          <button type="submit" class="submit-btn" :disabled="isSubmitting || phoneError">
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
import { validatePhone } from '@/store/modules/validate.js'

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
        country: 'by',
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
      countdownInterval: null,
      phoneError: ''
    }
  },
  watch: {
    isVisible(newVal) {
      if (newVal && this.isSubmitted) {
        this.resetForm();
      }
    }
  },
  computed: {
    phonePlaceholder() {
      switch (this.formData.country) {
        case 'ru':
          return '+7 (XXX) XXX-XX-XX';
        case 'by':
          return '+375 (XX) XXX-XX-XX';
        case 'other':
          return 'Введите международный номер';
        default:
          return 'Сначала выберите страну';
      }
    }
  },
  methods: {
    updatePlaceholder() {
      // Очищаем поле при смене страны и сбрасываем ошибку
      this.formData.phone = '';
      this.phoneError = '';
    },
    
    validatePhone() {
      if (!this.formData.phone.trim()) {
        this.phoneError = 'Поле телефона обязательно для заполнения';
        return false;
      }

      const isValid = validatePhone({
        number: this.formData.phone,
        region: this.formData.country.toUpperCase()
      });

      if (!isValid) {
        switch (this.formData.country) {
          case 'ru':
            this.phoneError = 'Неверный формат номера. Пример: +7 (912) 345-67-89';
            break;
          case 'by':
            this.phoneError = 'Неверный формат номера. Пример: +375 (29) 123-45-67';
            break;
          default:
            this.phoneError = 'Неверный формат международного номера. Пример: +123 (456) 789-01-23';
        }
        return false;
      }

      this.phoneError = '';
      return true;
    },
    
    clearPhoneError() {
      if (this.phoneError) {
        this.phoneError = '';
      }
    },
    
    submitForm() {
      // Проверяем валидность телефона перед отправкой
      if (!this.validatePhone()) {
        return;
      }

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
        country: 'by',
        email: '',
        interests: [],
        message: ''
      };
      this.phoneError = '';
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