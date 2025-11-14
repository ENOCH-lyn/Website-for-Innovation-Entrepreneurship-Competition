<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <!-- 导航栏 -->
    <nav class="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-12">
            <router-link to="/" class="flex items-center py-5">
              <span class="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">锰创未来</span>
            </router-link>
            <div class="hidden md:flex space-x-8">
              <router-link to="/" class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">首页</router-link>
              <router-link to="/solution" class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">解决方案</router-link>
              <router-link to="/cases" class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">案例与影响</router-link>
              <router-link to="/contact" class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">联系合作</router-link>
            </div>
          </div>
          <!-- 右侧导航 -->
          <div class="flex items-center space-x-4">
            <template v-if="isLoggedIn">
              <div class="relative" ref="menuRef">
                <button @click="toggleMenu" class="py-2 pl-2 pr-3 bg-white/60 border border-gray-200 rounded-full hover:shadow-lg transition duration-300 flex items-center gap-3">
                  <span class="relative inline-flex items-center justify-center">
                    <span class="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 opacity-30"></span>
                    <span class="relative inline-grid place-items-center w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-semibold ring-2 ring-white">
                      {{ username?.[0]?.toUpperCase() || 'U' }}
                    </span>
                  </span>
                  <span class="font-semibold text-gray-800">{{ username }}</span>
                  <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div v-show="menuOpen" class="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur border border-gray-200 rounded-xl shadow-xl py-2 z-50" @keydown.esc.prevent="menuOpen = false" @click.stop tabindex="0">
                  <div class="px-4 pb-2 text-xs text-gray-500">{{ email }}</div>
                  <button type="button" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">个人中心（待开通）</button>
                  <div class="my-1 border-t border-gray-100"></div>
                  <button type="button" @mousedown.stop.prevent="handleLogout" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">退出登录</button>
                </div>
              </div>
            </template>
            <template v-else>
              <router-link to="/login" class="py-2.5 px-4 rounded-full border border-gray-200 text-gray-700 hover:bg-white hover:shadow-sm transition duration-200">登录</router-link>
              <router-link to="/register" class="py-2.5 px-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg hover:-translate-y-0.5 transition duration-200">注册</router-link>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- 页面视图 -->
    <main class="snap-y snap-mandatory scroll-smooth overflow-y-scroll" style="scrollbar-gutter: stable;">
      <ElevatorNav />
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { useAuth } from './store/auth';
import ElevatorNav from './components/ElevatorNav.vue';

const router = useRouter();
const { isLoggedIn, username, email, logout } = useAuth();
const menuOpen = ref(false);
const menuRef = ref(null);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function onClickOutside(e) {
  const el = menuRef.value;
  if (!el) return;
  if (menuOpen.value && !el.contains(e.target)) {
    menuOpen.value = false;
  }
}

onMounted(() => {
  window.addEventListener('click', onClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', onClickOutside);
});

// 路由变化时自动关闭菜单
watch(() => router.currentRoute.value.fullPath, () => {
  menuOpen.value = false;
});

function handleLogout() {
  menuOpen.value = false;
  logout();
  // 若当前就在首页，可使用 replace 避免同路径 push 无效果
  const to = '/';
  if (router.currentRoute.value.fullPath === to) {
    router.replace(to);
  } else {
    router.push(to);
  }
}
</script>