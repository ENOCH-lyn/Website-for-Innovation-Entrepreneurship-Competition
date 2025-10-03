<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <div class="relative isolate px-6 pt-14 lg:px-8">
      <div class="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            革新土木工程的未来
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            我们致力于通过先进的数字化解决方案，提升项目效率、安全性和可持续性。探索我们的创新技术，共同构建更美好的基础设施。
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a href="#" class="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">了解更多</a>
            <a href="#" class="text-sm font-semibold leading-6 text-gray-900">联系我们 <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="bg-gray-50 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:max-w-none">
          <div class="text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              值得信赖的合作伙伴
            </h2>
            <p class="mt-4 text-lg leading-8 text-gray-600">
              我们的平台已经为众多项目和专业人士提供了卓越的服务。
            </p>
          </div>
          <dl class="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-2">
            <div class="flex flex-col bg-gray-400/5 p-8">
              <dt class="text-sm font-semibold leading-6 text-gray-600">累计服务用户</dt>
              <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900">
                {{ userCount }}
              </dd>
            </div>
            <div class="flex flex-col bg-gray-400/5 p-8">
              <dt class="text-sm font-semibold leading-6 text-gray-600">网站累计访问量</dt>
              <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900">
                {{ pageViews }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const userCount = ref(0);
const pageViews = ref(0);

// onMounted 是一个生命周期钩子，它会在组件被加载到页面上时执行一次
onMounted(async () => {
  try {
    // 调用我们的后端 API 来获取统计数据
    const response = await fetch('/api/stats');
    const data = await response.json();

    if (response.ok) {
      userCount.value = data.userCount;
      pageViews.value = data.pageViews;
    } else {
      console.error('获取统计数据失败:', data.error);
    }
  } catch (error) {
    console.error('请求统计数据时发生网络错误:', error);
  }
});
</script>