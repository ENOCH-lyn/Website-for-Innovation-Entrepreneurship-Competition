<template>
  <div class="min-h-screen bg-gradient-to-b from-white to-slate-50">
    <header class="border-b border-gray-100 bg-white/80 backdrop-blur sticky top-0 z-30">
      <div class="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div>
          <p class="text-xs text-gray-500"><router-link to="/" class="hover:text-gray-700">首页</router-link> · 案例与影响</p>
          <h1 class="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">案例与影响</h1>
        </div>
        <router-link to="/contact" class="hidden md:inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white">联系合作</router-link>
      </div>
    </header>

    <main class="py-12">
      <!-- Case Cards -->
      <section class="max-w-7xl mx-auto px-6 mb-12">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6">典型应用案例（示例）</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <article v-for="c in cases" :key="c.title" class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition">
            <div class="h-44 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
                <!-- Image from public/cases, with lazy loading and alt -->
                <img v-if="c.image" :src="c.image" :alt="c.title" loading="lazy" class="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03]" />
            </div>
            <div class="p-5">
              <div class="flex items-center gap-2 mb-2">
                <span v-for="t in c.tags" :key="t" class="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{{ t }}</span>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">{{ c.title }}</h3>
              <p class="text-sm text-gray-600 mb-4">{{ c.desc }}</p>
              <div class="grid grid-cols-3 gap-3 text-center">
                <div class="rounded-lg bg-slate-50 p-3">
                  <div class="text-lg font-extrabold">{{ c.kpis[0] }}</div>
                  <div class="text-[11px] text-gray-500">毒性风险</div>
                </div>
                <div class="rounded-lg bg-slate-50 p-3">
                  <div class="text-lg font-extrabold">{{ c.kpis[1] }}</div>
                  <div class="text-[11px] text-gray-500">资源化率</div>
                </div>
                <div class="rounded-lg bg-slate-50 p-3">
                  <div class="text-lg font-extrabold">{{ c.kpis[2] }}</div>
                  <div class="text-[11px] text-gray-500">成本变化</div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Impact Metrics -->
      <section class="bg-white py-12 border-t border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-6">
          <h2 class="text-2xl md:text-3xl font-extrabold mb-8">影响力指标（样例累计）</h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="rounded-2xl p-6 bg-gradient-to-br from-slate-50 to-blue-50 border border-gray-100">
              <div class="text-3xl font-extrabold">12.4 万吨</div>
              <div class="text-gray-600">固废减量（估算）</div>
            </div>
            <div class="rounded-2xl p-6 bg-gradient-to-br from-slate-50 to-blue-50 border border-gray-100">
              <div class="text-3xl font-extrabold">↑ 82%</div>
              <div class="text-gray-600">平均资源化率</div>
            </div>
            <div class="rounded-2xl p-6 bg-gradient-to-br from-slate-50 to-blue-50 border border-gray-100">
              <div class="text-3xl font-extrabold">↓ 45%</div>
              <div class="text-gray-600">综合处理成本</div>
            </div>
            <div class="rounded-2xl p-6 bg-gradient-to-br from-slate-50 to-blue-50 border border-gray-100">
              <div class="text-3xl font-extrabold">26 家</div>
              <div class="text-gray-600">合作单位（示例）</div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="max-w-7xl mx-auto px-6 py-12 text-center">
        <h3 class="text-xl font-semibold mb-3">想要评估你的工厂改造可行性？</h3>
        <p class="text-gray-600 mb-6">我们可在 2 周内完成初步样本评估与方案建议。</p>
        <router-link to="/contact" class="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg">与我们联系</router-link>
      </section>
    </main>
  </div>
</template>

<script setup>
const cases = [
  { title: '西南某年产 20 万吨产线', desc: '边云协同，毒性风险显著降低并产出绿色建材。', tags: ['电解锰渣', '改性+资源化'], kpis: ['↓97%', '85%', '↓48%'], image: '/cases/case-1.svg' },
  { title: '华中某综合园区试点', desc: '多源固废协同处置与孪生看板联动，实现跨厂区优化。', tags: ['园区协同', '孪生看板'], kpis: ['↓92%', '81%', '↓36%'], image: '/cases/case-2.svg' },
  { title: '西北某矿冶企业示范', desc: '机理/数据双模迭代上线，闭环调参提升良品率。', tags: ['双模推理', '闭环优化'], kpis: ['↓95%', '83%', '↓44%'], image: '/cases/case-3.svg' },
];
</script>
