<template>
  <div class="min-h-screen bg-gradient-to-b from-white to-slate-50">
    <header class="border-b border-gray-100 bg-white/80 backdrop-blur sticky top-0 z-30">
      <div class="max-w-7xl mx-auto px-6 py-5">
        <p class="text-xs text-gray-500"><router-link to="/" class="hover:text-gray-700">首页</router-link> · 联系合作</p>
        <h1 class="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">联系合作</h1>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-12">
      <div class="grid lg:grid-cols-2 gap-8">
        <!-- Left: Intro -->
        <section>
          <h2 class="text-xl font-semibold mb-3">告诉我们你的需求</h2>
          <p class="text-gray-600 mb-6">请尽可能详细地描述你的现状与目标，我们会在 1-2 个工作日内与你联系，提供初步建议或安排沟通。</p>
          <ul class="space-y-2 text-gray-700">
            <li>· 当前产线类型与规模</li>
            <li>· 现有处置方式与成本</li>
            <li>· 目标：减量/资源化/合规/品牌等</li>
            <li>· 期望时间与预算</li>
          </ul>
          <br><br>
          <h3 class="font-semibold mb-2">商务与技术支持</h3>
          <p class="text-sm text-gray-600">邮箱：contact@example.com<br>微信/电话：提交表单后由专人对接</p>
        </section>

        <!-- Right: Form (static) -->
        <section class="rounded-2xl border border-gray-100 bg-white p-6">
          <form class="space-y-4">
            <div>
              <label class="block text-sm text-gray-700 mb-1">公司/单位</label>
              <input class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="请输入公司/单位名称" />
            </div>
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-gray-700 mb-1">联系人</label>
                <input class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="你的姓名" />
              </div>
              <div>
                <label class="block text-sm text-gray-700 mb-1">联系方式</label>
                <input class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="邮箱/电话/微信" />
              </div>
            </div>
            <div>
              <label class="block text-sm text-gray-700 mb-1">需求简述</label>
              <textarea rows="6" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="你的问题、目标和背景..." />
            </div>
            <button type="button" class="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2.5 hover:shadow-lg">提交意向</button>
          </form>
          <p class="text-xs text-gray-500 mt-3">注：当前功能未生效</p>
        </section>
      </div>
    </main>
  </div>
</template>
