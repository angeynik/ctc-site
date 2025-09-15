// tests/validate.test.js
import { validatePhone, validateEmail } from '../../store/modules/validate.js';

describe('validatePhone', () => {
  describe('RU region', () => {
    test('validates correct RU phone numbers', () => {
      expect(validatePhone({ number: '+79161234567', region: 'RU' })).toBe(true);
      expect(validatePhone({ number: '79161234567', region: 'RU' })).toBe(true);
      expect(validatePhone({ number: '89161234567', region: 'RU' })).toBe(true);
      expect(validatePhone({ number: '+7 (916) 123-45-67', region: 'RU' })).toBe(true);
      expect(validatePhone({ number: '8(916)123-45-67', region: 'RU' })).toBe(true);
    });

    test('rejects invalid RU phone numbers', () => {
      expect(validatePhone({ number: '+7916123456', region: 'RU' })).toBe(false); // слишком короткий
      expect(validatePhone({ number: '+791612345678', region: 'RU' })).toBe(false); // слишком длинный
      expect(validatePhone({ number: '+19161234567', region: 'RU' })).toBe(false); // неправильный код страны
      expect(validatePhone({ number: '9161234567', region: 'RU' })).toBe(false); // без кода страны
      expect(validatePhone({ number: '', region: 'RU' })).toBe(false); // пустая строка
      expect(validatePhone({ number: 'abc', region: 'RU' })).toBe(false); // не цифры
    });
  });

  describe('BY region', () => {
    test('validates correct BY phone numbers', () => {
      expect(validatePhone({ number: '+375291234567', region: 'BY' })).toBe(true);
      expect(validatePhone({ number: '375291234567', region: 'BY' })).toBe(true);
      expect(validatePhone({ number: '+375 (29) 123-45-67', region: 'BY' })).toBe(true);
      expect(validatePhone({ number: '375(29)123-45-67', region: 'BY' })).toBe(true);
    });

    test('rejects invalid BY phone numbers', () => {
      expect(validatePhone({ number: '+37529123456', region: 'BY' })).toBe(false); // слишком короткий
      expect(validatePhone({ number: '+3752912345678', region: 'BY' })).toBe(false); // слишком длинный
      expect(validatePhone({ number: '+374291234567', region: 'BY' })).toBe(false); // неправильный код страны
      expect(validatePhone({ number: '291234567', region: 'BY' })).toBe(false); // без кода страны
      expect(validatePhone({ number: '', region: 'BY' })).toBe(false); // пустая строка
    });
  });

  describe('OTHER region', () => {
    test('validates correct international phone numbers', () => {
      expect(validatePhone({ number: '12345', region: 'OTHER' })).toBe(true);
      expect(validatePhone({ number: '+44123456789', region: 'OTHER' })).toBe(true);
      expect(validatePhone({ number: '1-800-123-4567', region: 'OTHER' })).toBe(true);
      expect(validatePhone({ number: '+1 (800) 123-4567', region: 'OTHER' })).toBe(true);
      expect(validatePhone({ number: '123456789012345', region: 'OTHER' })).toBe(true); // длинный номер
    });

    test('rejects invalid international phone numbers', () => {
      expect(validatePhone({ number: '1234', region: 'OTHER' })).toBe(false); // слишком короткий
      expect(validatePhone({ number: '', region: 'OTHER' })).toBe(false); // пустая строка
      expect(validatePhone({ number: 'abcde', region: 'OTHER' })).toBe(false); // не цифры
    });
  });

  test('handles non-string input', () => {
    expect(validatePhone({ number: 79161234567, region: 'RU' })).toBe(true); // число
    expect(validatePhone({ number: null, region: 'RU' })).toBe(false); // null
    expect(validatePhone({ number: undefined, region: 'RU' })).toBe(false); // undefined
  });
});

describe('validateEmail', () => {
  test('validates correct email addresses', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    expect(validateEmail('first.last@sub.domain.com')).toBe(true);
    expect(validateEmail('email123@test.org')).toBe(true);
    expect(validateEmail('a@b.cd')).toBe(true); // минимально допустимый
  });

  test('rejects invalid email addresses', () => {
    expect(validateEmail('')).toBe(false); // пустая строка
    expect(validateEmail('test@')).toBe(false); // нет домена
    expect(validateEmail('@example.com')).toBe(false); // нет имени пользователя
    expect(validateEmail('test@.com')).toBe(false); // пустой домен
    expect(validateEmail('test@domain.')).toBe(false); // пустая TLD
    expect(validateEmail('test@domain.c')).toBe(false); // TLD слишком короткий
    expect(validateEmail('test@domain..com')).toBe(false); // двойная точка
    expect(validateEmail('test@domain.com.')).toBe(false); // точка в конце
    expect(validateEmail('test domain@example.com')).toBe(false); // пробел в имени
    expect(validateEmail('test@domain@com')).toBe(false); // два @
  });

  test('handles non-string input', () => {
    expect(validateEmail(null)).toBe(false);
    expect(validateEmail(undefined)).toBe(false);
    expect(validateEmail(123)).toBe(false);
    expect(validateEmail({})).toBe(false);
  });

  test('rejects emails with invalid domain structure', () => {
    expect(validateEmail('test@.')).toBe(false);
    expect(validateEmail('test@domain.')).toBe(false);
    expect(validateEmail('test@.com')).toBe(false);
  });
});