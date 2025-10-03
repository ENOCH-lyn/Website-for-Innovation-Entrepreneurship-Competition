<template>
  <div id="app" class="bg-gray-50 min-h-screen">
    <!-- 导航栏 -->
    <nav class="bg-white shadow-md">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex justify-between">
          <div class="flex space-x-7">
            <div>
              <!-- 网站 Logo -->
              <router-link to="/" class="flex items-center py-4 px-2">
                <span class="font-bold text-gray-700 text-lg">项目官网</span>
              </router-link>
            </div>
          </div>
          <!-- 右侧导航 -->
          <div class="flex items-center space-x-3">
            <template v-if="isLoggedIn">
              <div class="relative" ref="menuRef">
                <button @click="toggleMenu" class="py-2 px-3 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition duration-300 flex items-center gap-2">
                  <span class="inline-block w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">{{ username?.[0]?.toUpperCase() || 'U' }}</span>
                  <span class="font-medium">{{ username }}</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div v-show="menuOpen" class="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md py-1 z-50" @keydown.esc.prevent="menuOpen = false" @click.stop tabindex="0">
                  <div class="px-4 py-2 text-sm text-gray-600">{{ email }}</div>
                  <hr>
                  <button type="button" @mousedown.stop.prevent="handleLogout" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">退出登录</button>
                </div>
              </div>
            </template>
            <template v-else>
              <router-link to="/login" class="py-2 px-3 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition duration-300">登录</router-link>
              <router-link to="/register" class="py-2 px-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">注册</router-link>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- 页面视图 -->
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { useAuth } from './store/auth';

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