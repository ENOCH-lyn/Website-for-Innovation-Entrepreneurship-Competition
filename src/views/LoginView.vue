<template>
  <div class="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-xl">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">登录您的账户</h2>
    
    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label for="identifier" class="block text-gray-700 text-sm font-bold mb-2">用户名或邮箱</label>
        <input 
          v-model="identifier"
          type="text" 
          id="identifier" 
          placeholder="请输入用户名或邮箱"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
      </div>
      <div class="mb-6">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">密码</label>
        <input 
          v-model="password"
          type="password" 
          id="password" 
          placeholder="请输入密码"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
      </div>
      <div class="flex items-center justify-center">
        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 disabled:bg-blue-300"
        >
          {{ isLoading ? '登录中...' : '立即登录' }}
        </button>
      </div>
    </form>

    <!-- 提示信息 -->
    <p v-if="errorMessage" class="mt-4 text-center text-red-500 text-sm">{{ errorMessage }}</p>
    <p v-if="successMessage" class="mt-4 text-center text-green-600 text-sm">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/store/auth';

const { login } = useAuth();
const identifier = ref('');
const password = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const isLoading = ref(false);
const router = useRouter();

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier: identifier.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed.');
    }

  successMessage.value = `欢迎回来，${data.username}！登录成功。`;

  // 保存登录状态
  login({ username: data.username, email: data.email });

    setTimeout(() => {
      router.push('/'); // 登录成功后跳转到首页
    }, 2000);

  } catch (error) {
    errorMessage.value = error.message;
    console.error('登录错误:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>