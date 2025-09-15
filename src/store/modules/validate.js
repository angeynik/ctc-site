// src/store/modules/validate.js
export function validatePhone({ number, region }) {
    /**
     * Валидирует телефонный номер по региону
     *
     * @param number  — строка, введённый номер
     * @param region  — 'RU' | 'BY' | 'OTHER'
     * @returns {boolean} true, если валидно
     */
  // Убираем все пробелы, дефисы, скобки и плюсы
  const raw = String(number).replace(/[\s\-()+]/g, '')

  let pattern

  switch (region) {
    case 'RU':
      // +7XXXXXXXXXX, 7XXXXXXXXXX или 8XXXXXXXXXX (11 цифр)
      pattern = /^(\+7|7|8)\d{10}$/
      break

    case 'BY':
      // +375XXXXXXXXX или 375XXXXXXXXX (12 цифр)
      pattern = /^(\+375|375)\d{9}$/
      break

    default:
      // Для других стран - минимум 5 цифр
      pattern = /^\d{5,}$/
  }

  return pattern.test(raw)
}
export function validateEmail(email) {
  /**
   * Валидирует email адрес
   *
   * @param email - строка, email для проверки
   * @returns {boolean} true, если email валиден
   */
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  // Базовый паттерн для проверки email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Дополнительная проверка на минимальную длину доменной части
  const parts = email.split('@');
  if (parts.length !== 2) {
    return false;
  }
  
  const domainParts = parts[1].split('.');
  if (domainParts.length < 2 || domainParts.some(part => part.length === 0)) {
    return false;
  }
  
  // Проверяем, чтобы доменная часть была не короче 2 символов
  const lastPart = domainParts[domainParts.length - 1];
  if (lastPart.length < 2) {
    return false;
  }
  
  return emailPattern.test(email);
}

export default {
  namespaced: true,
  actions: {
    validatePhone(context, payload) {
      return validatePhone(payload);
    },
    validateEmail(context, email) {
      return validateEmail(email);
    },
  }
}