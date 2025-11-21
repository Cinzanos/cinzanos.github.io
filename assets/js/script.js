// Система мультиязычности
let currentLang = localStorage.getItem('language') || 'ru';
let translations = {};

// Загрузка переводов
async function loadTranslations(lang) {
  try {
    const response = await fetch(`/_data/${lang}.yml`);
    if (!response.ok) {
      // Если файл не найден, используем встроенные переводы
      translations = window.translationsData || {};
      return;
    }
    // Для Jekyll на GitHub Pages YAML файлы обрабатываются сервером
    // Используем встроенные данные из Jekyll
    translations = window.translationsData || {};
  } catch (error) {
    console.error('Error loading translations:', error);
    translations = window.translationsData || {};
  }
}

// Установка языка
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', lang);
  updatePageContent();
  updateLanguageSwitcher();
}

// Обновление контента страницы
function updatePageContent() {
  const langData = translations[currentLang] || {};
  
  // Обновление навигации
  const navLinks = document.querySelectorAll('[data-translate-nav]');
  navLinks.forEach(link => {
    const key = link.getAttribute('data-translate-nav');
    if (langData.nav && langData.nav[key]) {
      link.textContent = langData.nav[key];
    }
  });

  // Обновление главной страницы
  const homeElements = document.querySelectorAll('[data-translate-home]');
  homeElements.forEach(element => {
    const key = element.getAttribute('data-translate-home');
    if (langData.home && langData.home[key]) {
      element.textContent = langData.home[key];
    }
  });

  // Обновление навыков
  const skillElements = document.querySelectorAll('[data-translate-skill]');
  skillElements.forEach(element => {
    const key = element.getAttribute('data-translate-skill');
    if (langData.skills && langData.skills[key]) {
      element.textContent = langData.skills[key];
    }
  });

  // Обновление проектов
  const projectElements = document.querySelectorAll('[data-translate-project]');
  projectElements.forEach(element => {
    const key = element.getAttribute('data-translate-project');
    if (langData.projects && langData.projects[key]) {
      element.textContent = langData.projects[key];
    }
  });

  // Обновление контактов
  const contactElements = document.querySelectorAll('[data-translate-contact]');
  contactElements.forEach(element => {
    const key = element.getAttribute('data-translate-contact');
    if (langData.contacts && langData.contacts[key]) {
      element.textContent = langData.contacts[key];
    }
  });

  // Обновление футера
  const footerElements = document.querySelectorAll('[data-translate-footer]');
  footerElements.forEach(element => {
    const key = element.getAttribute('data-translate-footer');
    if (langData.footer && langData.footer[key]) {
      element.textContent = langData.footer[key];
    }
  });

  // Обновление общих элементов
  const commonElements = document.querySelectorAll('[data-translate-common]');
  commonElements.forEach(element => {
    const key = element.getAttribute('data-translate-common');
    if (langData.common && langData.common[key]) {
      element.textContent = langData.common[key];
    }
  });
}

// Обновление переключателя языков
function updateLanguageSwitcher() {
  const switchers = document.querySelectorAll('.lang-switcher');
  switchers.forEach(switcher => {
    const ruBtn = switcher.querySelector('.lang-ru');
    const enBtn = switcher.querySelector('.lang-en');
    
    if (currentLang === 'ru') {
      if (ruBtn) ruBtn.classList.add('active');
      if (enBtn) enBtn.classList.remove('active');
    } else {
      if (ruBtn) ruBtn.classList.remove('active');
      if (enBtn) enBtn.classList.add('active');
    }
  });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  // Загрузка переводов (данные будут встроены в HTML через Jekyll)
  if (window.translationsData) {
    translations = window.translationsData;
    setLanguage(currentLang);
  }

  // Обработчики переключения языков
  document.querySelectorAll('.lang-switcher a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const lang = this.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  // Добавление анимации на прокрутку
  window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        element.classList.add('in-view');
      }
    });
  });
});
  