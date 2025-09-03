const contentFolders = {
  landingContent: 'landing',
  headerContent: 'header',
  footerContent: 'footer'
};

export default {
  namespaced: true,
  state: {
    landingContent: {},
    headerContent: {},
    footerContent: {},
    isLoading: false
  },
  mutations: {
    UPDATE_LANDING_CONTENT(state, newContent) {
      state.landingContent = { ...state.landingContent, ...newContent };
    },
    UPDATE_HEADER_CONTENT(state, newContent) {
      state.headerContent = { ...state.headerContent, ...newContent };
    },
    UPDATE_FOOTER_CONTENT(state, newContent) {
      state.footerContent = { ...state.footerContent, ...newContent };
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    }
  },
  actions: {
    async fetchContent({ commit, state }, { contentType, componentKey }) {
      // Если контент уже есть в состоянии, не загружаем повторно
      if (state[contentType] && state[contentType][componentKey]) {
        return state[contentType][componentKey];
      }
      
      commit('SET_LOADING', true);
      try {
        // Динамически импортируем контент из папки data
        const folder = contentFolders[contentType] || contentType;
        const contentModule = await import(`@/data/${folder}/${componentKey}.js`);
        commit(`UPDATE_${contentType.toUpperCase()}_CONTENT`, {
          [componentKey]: contentModule.default
        });
        return contentModule.default;
      } catch (error) {
        console.error(`Ошибка загрузки контента для ${componentKey}:`, error);
        // Возвращаем fallback контент
        return {
          title: componentKey,
          subtitle: "Информация временно недоступна",
          icon: "default",
          infoBlocks: [
            {
              title: "Информация",
              description: "Загрузка контента..."
            }
          ],
          buttonText: "Подробнее",
          buttonAction: "/"
        };
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },
  getters: {
    getContent: (state) => (contentType, componentKey) => {
      return state[contentType] && state[contentType][componentKey] 
        ? state[contentType][componentKey] 
        : null;
    },
    isLoading: (state) => state.isLoading
  }
};