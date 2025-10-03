<template>
  <div class="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-xl">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">创建您的账户</h2>
    
    <form @submit.prevent="handleRegister">
      <div class="mb-4">
        <label for="username" class="block text-gray-700 text-sm font-bold mb-2">用户名</label>
        <input 
          v-model="username"
          type="text" 
          id="username" 
          placeholder="3-20位，字母/数字/下划线"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">邮箱地址</label>
        <input 
          v-model="email"
          type="email" 
          id="email" 
          placeholder="请输入您的邮箱"
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
          placeholder="请输入至少6位密码"
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
          {{ isLoading ? '注册中...' : '立即注册' }}
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
const username = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const isLoading = ref(false);
const router = useRouter();

const handleRegister = async () => {
  if (password.value.length < 6) {
    errorMessage.value = '密码不能少于6位。';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    // 调用我们自己的后端 API，而不是 Firebase 的前端 SDK
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // 如果后端返回错误（例如邮箱已存在）
      throw new Error(data.error || 'Registration failed.');
    }

    // 注册成功
    const registrationNumber = data.registrationNumber;
    successMessage.value = `注册成功！欢迎你，${data.username}。你是第 ${registrationNumber} 位用户。`;

    // 保存登录状态并跳转
    login({ username: data.username, email: data.email });
    setTimeout(() => {
      router.push('/');
    }, 1500);

  } catch (error) {
    errorMessage.value = error.message;
    console.error('注册错误:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>