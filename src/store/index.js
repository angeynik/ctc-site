import { createStore } from 'vuex';
import content from './modules/content';
import websocket from './modules/websocket';
import icons from './modules/icons'; // Добавляем модуль иконок
// import log from './modules/log';
// import sortParams from './modules/sortParams';
// import config from './modules/config';

const store = createStore({
  modules: {
    content,
    websocket,
    icons,
  },
  actions: {
    toLowerCase(_, str) {
      return str.toLowerCase();
    },
    // initializeStore({ commit }) {
    //   const authData = localStorage.getItem('authData');
    //   if (authData) {
    //     try {
    //       const parsedData = JSON.parse(authData);
    //       commit('auth/RESTORE_AUTH', parsedData);
    //     } catch (e) {
    //       localStorage.removeItem('authData');
    //       console.error('Ошибка восстановления сессии', e);
    //     }
    //   }
    // },
  },
  getters: {
    // isAuthenticated: (state) => !!state.auth.token,
    // authStatus: (state) => state.auth.status,
    // user: (state) => state.auth.user.username || '',
    // level: (state) => state.auth.level || 0,
    // dID: (state) => state.auth.dID || null,
    // roomKey: (state) => state.sortParams.roomKey || localStorage.getItem('roomKey') || null,
    // paramKey: (state) => state.sortParams.paramKey || localStorage.getItem('paramKey') || null,
    // getConfig: state => name => state.configs[name] || {},
    // isLoading: state => state.loading,
  }
});

export default store;
