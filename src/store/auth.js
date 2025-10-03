// 轻量登录状态管理（基于 localStorage）
import { reactive, computed } from 'vue';

const state = reactive({
  user: null,
});

const STORAGE_KEY = 'app_current_user';

// 初始化：尝试从 localStorage 恢复
try {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) state.user = JSON.parse(raw);
} catch {}

export function useAuth() {
  const isLoggedIn = computed(() => !!state.user);
  const username = computed(() => state.user?.username || '');
  const email = computed(() => state.user?.email || '');

  function login(user) {
    state.user = user;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  function logout() {
    state.user = null;
    localStorage.removeItem(STORAGE_KEY);
  }

  return { state, isLoggedIn, username, email, login, logout };
}
