<template>
  <div class="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
    <!-- 背景层：渐变 + 纹理 + 光斑 -->
    <div class="absolute inset-0 -z-20 bg-gradient-to-b from-slate-50 via-blue-50/50 to-indigo-50"></div>
    <div class="absolute inset-0 -z-10 opacity-[0.15]" aria-hidden="true"
         style="background-image: radial-gradient(circle at 1px 1px, #4f46e5 1px, transparent 0); background-size: 24px 24px;"></div>
    <div class="pointer-events-none absolute -z-10 inset-0 overflow-hidden" aria-hidden="true">
      <div class="absolute -top-20 -left-10 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-24 -right-10 w-[28rem] h-[28rem] bg-indigo-400/30 rounded-full blur-3xl"></div>
    </div>

    <div class="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <!-- 左侧品牌（大屏显示） -->
      <div class="hidden lg:flex flex-col gap-6 px-2">
        <div>
          <span class="inline-block text-sm font-semibold text-blue-700/80 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">加入我们</span>
          <h1 class="mt-4 text-4xl xl:text-5xl font-extrabold leading-tight">
            立即开启
            <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">锰创未来</span>
            之旅
          </h1>
          <p class="mt-3 text-gray-600 text-lg">材料 × 智能，连接工业级自进化体系。</p>
        </div>
        <ul class="space-y-3 text-gray-700">
          <li class="flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-blue-600 text-white grid place-items-center text-xs">1</span><span>注册即享统一身份与权限</span></li>
          <li class="flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-indigo-600 text-white grid place-items-center text-xs">2</span><span>对接 IIoT/数据中台，快速接入</span></li>
          <li class="flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-cyan-600 text-white grid place-items-center text-xs">3</span><span>渐进式开通更多闭环模块</span></li>
        </ul>
      </div>

      <!-- 右侧表单卡片 -->
      <div class="px-2">
        <div class="w-full max-w-md ml-auto bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_10px_40px_-10px_rgba(31,38,135,0.25)] rounded-2xl p-8">
          <div class="text-center mb-6">
            <div class="inline-grid place-items-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white mb-3">✨</div>
            <h2 class="text-2xl font-extrabold text-gray-900">创建您的账户</h2>
            <p class="text-sm text-gray-500 mt-1">用户名 + 邮箱 + 密码</p>
          </div>

          <form @submit.prevent="handleRegister" class="space-y-4">
            <div>
              <label for="username" class="block text-gray-700 text-sm font-medium mb-2">用户名</label>
              <input
                v-model="username"
                type="text"
                id="username"
                placeholder="3-20位，字母/数字/下划线"
                @blur="uTouched = true"
                :aria-invalid="uTouched && !username ? 'true' : 'false'"
                class="appearance-none border rounded-lg w-full py-2.5 px-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 bg-white/90 border-gray-300 focus:ring-blue-500"
                :class="uTouched && !username ? 'border-rose-300 focus:ring-rose-500' : ''"
                required
              >
            </div>
            <div>
              <label for="email" class="block text-gray-700 text-sm font-medium mb-2">邮箱地址</label>
              <input
                v-model="email"
                type="email"
                id="email"
                placeholder="请输入您的邮箱"
                @blur="eTouched = true"
                :aria-invalid="eTouched && !email ? 'true' : 'false'"
                class="appearance-none border rounded-lg w-full py-2.5 px-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 bg-white/90 border-gray-300 focus:ring-blue-500"
                :class="eTouched && !email ? 'border-rose-300 focus:ring-rose-500' : ''"
                required
              >
            </div>
            <div class="mb-1">
              <label for="password" class="block text-gray-700 text-sm font-medium mb-2">密码</label>
              <input
                v-model="password"
                type="password"
                id="password"
                placeholder="请输入至少6位密码"
                @blur="pTouched = true"
                :aria-invalid="pTouched && password && password.length < 6 ? 'true' : 'false'"
                class="appearance-none border rounded-lg w-full py-2.5 px-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 bg-white/90 border-gray-300 focus:ring-blue-500"
                :class="pTouched && password && password.length < 6 ? 'border-rose-300 focus:ring-rose-500' : ''"
                required
              >
            </div>
            <div class="flex items-center justify-between text-sm">
              <router-link to="/login" class="text-blue-600 hover:text-indigo-600">已有账号？去登录</router-link>
              <router-link to="/" class="text-gray-500 hover:text-gray-700">返回首页</router-link>
            </div>
            <div>
              <button
                type="submit"
                :disabled="isLoading"
                class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition duration-200 disabled:opacity-60"
              >
                {{ isLoading ? '注册中...' : '立即注册' }}
              </button>
            </div>
          </form>

          <!-- 提示信息 -->
          <p v-if="errorMessage" class="mt-4 text-center text-red-500 text-sm">{{ errorMessage }}</p>
          <p v-if="successMessage" class="mt-4 text-center text-green-600 text-sm">{{ successMessage }}</p>
        </div>
      </div>
    </div>
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
// 交互状态：仅失焦后且无效时才提示
const uTouched = ref(false);
const eTouched = ref(false);
const pTouched = ref(false);
const router = useRouter();

const handleRegister = async () => {
  if (password.value.length < 6) {
    errorMessage.value = '密码不能少于6位。';
    return;
  }

  // 提交前触发校验态
  uTouched.value = true;
  eTouched.value = true;
  pTouched.value = true;

  if (!username.value || !email.value || !password.value) {
    errorMessage.value = '请填写完整信息后再提交。';
    return;
  }
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