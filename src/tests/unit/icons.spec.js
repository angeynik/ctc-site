// tests/unit/icons.spec.js
import icons from '../../store/modules/icons';

describe('Icons Vuex Module', () => {
  describe('State', () => {
    it('should have correct initial state', () => {
      // state - это объект, а не функция
      expect(icons.state).toEqual({
        iconBasePath: '/icons'
      });
    });
  });

  describe('Getters', () => {
    let state;

    beforeEach(() => {
      state = {
        iconBasePath: '/icons'
      };
    });

    describe('getIconUrl', () => {
      it('should return SVG URL for icon without extension', () => {
        const getter = icons.getters.getIconUrl;
        const result = getter(state)('user');
        
        expect(result).toBe('/icons/user.svg');
      });

      it('should return original URL for icon with extension', () => {
        const getter = icons.getters.getIconUrl;
        const result = getter(state)('user.png');
        
        expect(result).toBe('/icons/user.png');
      });

      it('should handle icons with multiple dots in name', () => {
        const getter = icons.getters.getIconUrl;
        const result = getter(state)('user.profile.avatar');
        
        expect(result).toBe('/icons/user.profile.avatar');
      });

      it('should handle empty icon name', () => {
        const getter = icons.getters.getIconUrl;
        const result = getter(state)('');
        
        expect(result).toBe('/icons/.svg');
      });

      it('should handle different base paths', () => {
        state.iconBasePath = '/assets/images';
        const getter = icons.getters.getIconUrl;
        const result = getter(state)('logo');
        
        expect(result).toBe('/assets/images/logo.svg');
      });
    });
  });

  describe('Actions', () => {
    let commit;
    let dispatch;
    let state;
    let rootState;

    beforeEach(() => {
      commit = jest.fn();
      dispatch = jest.fn();
      state = {
        iconBasePath: '/icons'
      };
      rootState = {};
    });

    describe('handleIconError', () => {
      it('should change SVG to PNG on error', () => {
        const mockEvent = {
          target: {
            src: '/icons/user.svg',
            onerror: jest.fn()
          }
        };

        icons.actions.handleIconError({ state, commit, dispatch, rootState }, mockEvent);

        expect(mockEvent.target.src).toBe('/icons/user.png');
        expect(mockEvent.target.onerror).toBeNull();
      });

      it('should not change PNG URLs', () => {
        const mockEvent = {
          target: {
            src: '/icons/user.png',
            onerror: jest.fn()
          }
        };

        icons.actions.handleIconError({ state, commit, dispatch, rootState }, mockEvent);

        expect(mockEvent.target.src).toBe('/icons/user.png');
        expect(mockEvent.target.onerror).not.toBeNull();
      });

      it('should handle complex icon names', () => {
        const mockEvent = {
          target: {
            src: '/icons/user-profile-avatar.svg',
            onerror: jest.fn()
          }
        };

        icons.actions.handleIconError({ state, commit, dispatch, rootState }, mockEvent);

        expect(mockEvent.target.src).toBe('/icons/user-profile-avatar.png');
        expect(mockEvent.target.onerror).toBeNull();
      });

    //   it('should handle URLs with query parameters', () => {
    //     const mockEvent = {
    //       target: {
    //         src: '/icons/user.svg?v=1.0',
    //         onerror: jest.fn()
    //       }
    //     };

    //     icons.actions.handleIconError({ state, commit, dispatch, rootState }, mockEvent);

    //     // Ожидаем, что query параметры будут удалены при замене на PNG
    //     expect(mockEvent.target.src).toBe('/icons/user.png');
    //     expect(mockEvent.target.onerror).toBeNull();
    //   });

      it('should handle different base paths', () => {
        state.iconBasePath = '/assets/images';
        const mockEvent = {
          target: {
            src: '/assets/images/logo.svg',
            onerror: jest.fn()
          }
        };

        icons.actions.handleIconError({ state, commit, dispatch, rootState }, mockEvent);

        expect(mockEvent.target.src).toBe('/assets/images/logo.png');
        expect(mockEvent.target.onerror).toBeNull();
      });
    });
  });

  describe('Integration', () => {
    it('getIconUrl and handleIconError should work together', () => {
      const state = { iconBasePath: '/icons' };
      const getter = icons.getters.getIconUrl;
      
      // Получаем URL через геттер
      const iconUrl = getter(state)('user');
      expect(iconUrl).toBe('/icons/user.svg');
      
      // Эмулируем ошибку загрузки
      const mockEvent = {
        target: {
          src: iconUrl,
          onerror: jest.fn()
        }
      };
      
      icons.actions.handleIconError({ state }, mockEvent);
      
      // Проверяем, что URL изменился на PNG
      expect(mockEvent.target.src).toBe('/icons/user.png');
    });
  });
});