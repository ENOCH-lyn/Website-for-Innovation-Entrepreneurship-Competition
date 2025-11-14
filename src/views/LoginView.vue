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

    <!-- 内容区域 -->
    <div class="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <!-- 左侧品牌（大屏显示） -->
      <div class="hidden lg:flex flex-col gap-6 px-2">
        <div>
          <span class="inline-block text-sm font-semibold text-blue-700/80 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">欢迎回来</span>
          <h1 class="mt-4 text-4xl xl:text-5xl font-extrabold leading-tight">
            <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">锰创未来</span>
            账户中心
          </h1>
          <p class="mt-3 text-gray-600 text-lg">连接材料与智能，开启工业级自进化闭环。</p>
        </div>
        <ul class="space-y-3 text-gray-700">
          <li class="flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-blue-600 text-white grid place-items-center text-xs">1</span><span>统一身份登录，安全合规</span></li>
          <li class="flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-indigo-600 text-white grid place-items-center text-xs">2</span><span>与 IIoT/数据中台无缝衔接</span></li>
          <li class="flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-cyan-600 text-white grid place-items-center text-xs">3</span><span>支持渐进式功能开通与权限管理</span></li>
        </ul>
      </div>

      <!-- 右侧表单卡片 -->
      <div class="px-2">
        <div class="w-full max-w-md ml-auto bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_10px_40px_-10px_rgba(31,38,135,0.25)] rounded-2xl p-8">
          <div class="text-center mb-6">
            <div class="inline-grid place-items-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white mb-3">🔑</div>
            <h2 class="text-2xl font-extrabold text-gray-900">登录您的账户</h2>
            <p class="text-sm text-gray-500 mt-1">使用用户名或邮箱进行登录</p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-4">
            <div>
              <label for="identifier" class="block text-gray-700 text-sm font-medium mb-2">用户名或邮箱</label>
              <input
                v-model="identifier"
                type="text"
                id="identifier"
                placeholder="请输入用户名或邮箱"
                @blur="idTouched = true"
                :aria-invalid="idTouched && !identifier ? 'true' : 'false'"
                class="appearance-none border rounded-lg w-full py-2.5 px-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 bg-white/90 border-gray-300 focus:ring-blue-500"
                :class="idTouched && !identifier ? 'border-rose-300 focus:ring-rose-500' : ''"
                required
              >
            </div>
            <div class="mb-1">
              <label for="password" class="block text-gray-700 text-sm font-medium mb-2">密码</label>
              <input
                v-model="password"
                type="password"
                id="password"
                placeholder="请输入密码"
                @blur="pwdTouched = true"
                :aria-invalid="pwdTouched && !password ? 'true' : 'false'"
                class="appearance-none border rounded-lg w-full py-2.5 px-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 bg-white/90 border-gray-300 focus:ring-blue-500"
                :class="pwdTouched && !password ? 'border-rose-300 focus:ring-rose-500' : ''"
                required
              >
            </div>
            <div class="flex items-center justify-between text-sm">
              <router-link to="/register" class="text-blue-600 hover:text-indigo-600">没有账号？去注册</router-link>
              <router-link to="/" class="text-gray-500 hover:text-gray-700">返回首页</router-link>
            </div>
            <div>
              <button
                type="submit"
                :disabled="isLoading"
                class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition duration-200 disabled:opacity-60"
              >
                {{ isLoading ? '登录中...' : '立即登录' }}
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
const identifier = ref('');
const password = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const isLoading = ref(false);
// 交互状态：仅在用户离开输入框且无效时才显示红色
const idTouched = ref(false);
const pwdTouched = ref(false);
const router = useRouter();

const handleLogin = async () => {
  // 提交前触发校验态
  idTouched.value = true;
  pwdTouched.value = true;

  if (!identifier.value || !password.value) {
    errorMessage.value = '请输入用户名/邮箱和密码';
    return;
  }

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