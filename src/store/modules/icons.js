// store/modules/icons.js
export default {
  namespaced: true,
  state: {
    iconBasePath: '/icons'
  },
  getters: {
    getIconUrl: (state) => (iconName) => {
      // Проверяем, содержит ли имя иконки уже расширение
      const hasExtension = iconName.includes('.');
      
      if (hasExtension) {
        return `${state.iconBasePath}/${iconName}`;
      } else {
        // Пробуем сначала загрузить SVG, если нет - PNG
        return `${state.iconBasePath}/${iconName}.svg`;
      }
    }
  },
  actions: {
    handleIconError({ state }, event) {
      const img = event.target;
      const src = img.src;
      
      // Если не загрузилась svg, пробуем png
      if (src.endsWith('.svg')) {
        const iconName = src.split('/').pop().replace('.svg', '');
        img.src = `${state.iconBasePath}/${iconName}.png`;
        img.onerror = null; // Сбрасываем обработчик чтобы избежать цикла
      }
    }
  }
};