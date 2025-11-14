<template>
  <div class="home">
    <!-- Hero Section with Animated Background -->
  <section id="top" class="relative min-h-screen snap-start flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <!-- Animated Background Particles -->
      <div class="absolute inset-0 opacity-20">
        <div class="particle-container">
          <div v-for="i in 50" :key="i" class="particle" :style="{ left: Math.random() * 100 + '%', animationDelay: Math.random() * 5 + 's', animationDuration: (5 + Math.random() * 10) + 's' }"></div>
        </div>
      </div>
      
      <div class="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h1 class="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight">
          锰创未来: <br/>
          <span class="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            重构工业物质循环的智能炼金术
          </span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
          我们并非简单地处理废弃物，而是通过材料科学与认知智能的深度融合，<br class="hidden md:block"/>
          将工业副产品转化为驱动循环经济的高价值资产。
        </p>
        <div class="flex flex-wrap justify-center gap-6">
          <router-link to="/solution" class="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-full hover:shadow-2xl transform hover:-translate-y-1 transition duration-300">
            了解解决方案
          </router-link>
          <a href="#faq" class="px-8 py-4 bg-white/10 backdrop-blur text-white font-bold rounded-full border-2 border-white/30 hover:bg-white/20 transition duration-300">
            查看常见问题
          </a>
        </div>
      </div>
    </section>

    <!-- Core Value Pillars -->
    <section id="core-values" class="min-h-screen snap-start flex items-center bg-white py-24">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">核心价值支柱</h2>
        <div class="grid md:grid-cols-3 gap-12">
          <!-- Pillar 1 -->
          <div class="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 hover:shadow-2xl transition duration-500 transform hover:-translate-y-2">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-900">智能材料转化</h3>
            <p class="text-lg text-gray-700 leading-relaxed">
              独创的惰性晶格固定化(ICMI)技术，从原子层面重组电解锰渣结构，根除其环境毒性，并赋予其卓越的工程性能。
            </p>
          </div>

          <!-- Pillar 2 -->
          <div class="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 hover:shadow-2xl transition duration-500 transform hover:-translate-y-2">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-900">认知流程孪生</h3>
            <p class="text-lg text-gray-700 leading-relaxed">
              部署行业首个针对固废处理的AI数字孪生系统，实现从被动响应到主动预测与自主优化的革命性跃迁。
            </p>
          </div>

          <!-- Pillar 3 -->
          <div class="group bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl p-8 hover:shadow-2xl transition duration-500 transform hover:-translate-y-2">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-900">可量化的ESG影响力</h3>
            <p class="text-lg text-gray-700 leading-relaxed">
              为合作伙伴提供符合国际标准的环境、社会与治理(ESG)绩效提升方案，将环境负债转化为品牌资产与市场竞争力。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- The Industrial Paradox -->
    <section id="industrial-paradox" class="min-h-screen snap-start flex items-center bg-gradient-to-br from-white via-sky-50 to-indigo-50 text-gray-900 py-24">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">时代之问：工业文明的"代谢"悖论</h2>
          <h3 class="text-2xl md:text-3xl font-semibold text-indigo-700">无法回避的"锰"题，一个行业的结构性阵痛</h3>
        </div>
        <div class="bg-white/90 backdrop-blur-sm rounded-3xl p-10 md:p-12 shadow-xl ring-1 ring-indigo-100">
          <p class="text-xl leading-relaxed text-gray-700">
            在全球对关键矿物需求激增的背景下，电解锰行业正面临着一个深刻的内在矛盾：产量的增长与废渣的指数级累积同步发生。每年，数千万吨具有高浸出毒性的电解锰废渣如悬顶之剑，威胁着我们的水土生态安全。传统的堆填、封存等线性处理模式，本质上只是将污染的爆发点延后，其高昂的土地成本、持续的环境风险与微乎其微的资源回收率，已成为制约整个产业链可持续发展的核心桎梏。我们正处在一个十字路口，亟需一场颠覆性的技术范式转移。
          </p>
        </div>
      </div>
    </section>

    <!-- Symbiotic Solution Preview -->
    <section id="solution" class="min-h-screen snap-start flex items-center bg-white py-24">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-6 text-gray-900">我们的答案：一个自进化的智能生命体</h2>
          <h3 class="text-2xl md:text-3xl font-semibold text-indigo-600">融汇物理与数字的系统化解法</h3>
        </div>
        
        <div class="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-10 md:p-12 mb-12">
          <p class="text-xl leading-relaxed text-gray-700 mb-12">
            "锰创未来"并非单一技术，而是一个集成了前沿材料科学、人工智能和工业物联网(IIoT)的自适应、自优化生态系统。它将物理世界的物质转化与数字世界的认知智能无缝链接，形成了一个高效的闭环。
          </p>

          <div class="grid md:grid-cols-2 gap-8">
            <!-- Physical Layer -->
            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h4 class="text-2xl font-bold text-gray-900">核心物理层</h4>
              </div>
              <p class="text-lg text-gray-700 mb-6">材料科学的突破</p>
              <p class="text-gray-600 leading-relaxed mb-6">
                深入了解我们如何通过ICMI技术，将废渣转化为高性能绿色建材。
              </p>
              <a href="/solution" class="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition duration-300">
                了解详情 →
              </a>
            </div>

            <!-- Digital Layer -->
            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 class="text-2xl font-bold text-gray-900">核心数字层</h4>
              </div>
              <p class="text-lg text-gray-700 mb-6">AI驱动的"中枢神经"</p>
              <p class="text-gray-600 leading-relaxed mb-6">
                探索我们的认知数字孪生平台如何精准预测、优化并自主调控复杂的化学反应流程。
              </p>
              <a href="/solution" class="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition duration-300">
                了解详情 →
              </a>
            </div>
          </div>
        </div>

        <div class="text-center">
          <a href="/solution" class="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xl font-bold rounded-full hover:shadow-2xl transform hover:-translate-y-1 transition duration-300">
            深入了解解决方案
          </a>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="min-h-screen snap-start flex items-center bg-gradient-to-b from-white to-slate-50 py-24">
      <div class="w-full max-w-6xl mx-auto px-6">
        <div class="text-center mb-14">
          <h2 class="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-gray-900">常见问题 · FAQ</h2>
          <p class="text-lg text-gray-600">我们挑选了大家最关心的四个问题，帮助你快速理解 锰创未来 的技术与价值。</p>
        </div>
  <div class="flex flex-col gap-6 w-full max-w-6xl mx-auto min-w-0">
          <details class="group w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-none will-change-auto">
            <summary class="w-full flex items-center justify-between gap-3 cursor-pointer select-none list-none">
              <span class="text-xl font-semibold text-gray-900">ICMI 技术与传统固废处理方式有何本质不同？</span>
              <span class="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 grid place-items-center group-open:rotate-45 transition">+</span>
            </summary>
            <div class="mt-4 text-gray-700 leading-relaxed">
              传统方式以“封存/隔离”为主，未消除材料的内在毒性；ICMI 从原子层面重构晶格，实现长效惰性化，同时赋予新工程性能，实现“消除风险 + 创造价值”的双重目标。
            </div>
          </details>
          <details class="group w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-none will-change-auto">
            <summary class="w-full flex items-center justify-between gap-3 cursor-pointer select-none list-none">
              <span class="text-xl font-semibold text-gray-900">认知数字孪生如何在实际工厂落地？</span>
              <span class="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 grid place-items-center group-open:rotate-45 transition">+</span>
            </summary>
            <div class="mt-4 text-gray-700 leading-relaxed">
              通过 IIoT 采集关键过程数据，结合先验机理模型与数据驱动模型构建“认知图谱”，在云边协同的架构下提供预测性维护、工艺自优化与主动告警能力。
            </div>
          </details>
          <details class="group w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-none will-change-auto">
            <summary class="w-full flex items-center justify-between gap-3 cursor-pointer select-none list-none">
              <span class="text-xl font-semibold text-gray-900">经济性如何？是否具备规模化可行性？</span>
              <span class="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 grid place-items-center group-open:rotate-45 transition">+</span>
            </summary>
            <div class="mt-4 text-gray-700 leading-relaxed">
              相比堆填/外运，综合成本可显著降低，并可通过绿色建材产品化带来新增现金流；方案支持模块化部署与按需扩展，适配不同规模的生产线。
            </div>
          </details>
          <details class="group w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-none will-change-auto">
            <summary class="w-full flex items-center justify-between gap-3 cursor-pointer select-none list-none">
              <span class="text-xl font-semibold text-gray-900">合规与 ESG 方面有哪些可量化指标？</span>
              <span class="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 grid place-items-center group-open:rotate-45 transition">+</span>
            </summary>
            <div class="mt-4 text-gray-700 leading-relaxed">
              我们提供标准化的排放与材料性能报告，支持第三方检测；平台内置 ESG 指标盘，实现减排量、资源化率、用地节约等多维度量化评估。
            </div>
          </details>
        </div>
      </div>
    </section>

    <!-- Footer with Stats at Bottom -->
  <footer id="footer" class="bg-gray-950 text-gray-300 pt-16">
      <!-- Metrics Band -->
      <div class="max-w-7xl mx-auto px-6">
        <div class="rounded-3xl bg-gradient-to-r from-indigo-600/20 via-blue-600/10 to-cyan-500/20 border border-white/10 p-8 md:p-10 mb-12">
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div class="text-4xl md:text-5xl font-extrabold text-white tracking-tight">{{ formatNumber(userCount) }}</div>
              <div class="mt-2 text-sm uppercase tracking-widest text-indigo-300/80">注册用户数</div>
            </div>
            <div>
              <div class="text-4xl md:text-5xl font-extrabold text-white tracking-tight">{{ formatNumber(pageViews) }}</div>
              <div class="mt-2 text-sm uppercase tracking-widest text-cyan-300/80">访客量</div>
            </div>
            <div>
              <div class="text-2xl md:text-3xl font-bold text-white tracking-tight">{{ lastUpdated || '—' }}</div>
              <div class="mt-2 text-sm uppercase tracking-widest text-blue-200/70">数据更新时间</div>
            </div>
            <div>
              <div class="text-2xl md:text-3xl font-bold text-white tracking-tight">ICMI · AI Twin</div>
              <div class="mt-2 text-sm uppercase tracking-widest text-purple-200/70">技术引擎</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Rich Footer Content -->
      <div class="max-w-7xl mx-auto px-6 pb-12">
        <div class="grid md:grid-cols-3 gap-10">
          <div>
            <h4 class="text-white text-lg font-semibold mb-4">关于 锰创未来</h4>
            <p class="text-gray-400 leading-relaxed">
              我们致力于用材料科学与认知智能，重构工业物质循环的“代谢系统”，把环境负债转化为规模化可持续价值。
            </p>
          </div>
          <div>
            <h4 class="text-white text-lg font-semibold mb-4">快速导航</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition">主页</a></li>
              <li><a href="/solution" class="hover:text-white transition">解决方案</a></li>
              <li><router-link to="/cases" class="hover:text-white transition">案例与影响</router-link></li>
              <li><router-link to="/contact" class="hover:text-white transition">联系合作</router-link></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white text-lg font-semibold mb-4">资源中心</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition">技术白皮书</a></li>
              <li><a href="#" class="hover:text-white transition">材料性能报告</a></li>
              <li><a href="#" class="hover:text-white transition">ESG 指标模板</a></li>
              <li><a href="#" class="hover:text-white transition">开发者 API</a></li>
            </ul>
          </div>
        </div>
        <div class="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-sm text-gray-500">© 2025 锰创未来. All rights reserved.</p>
          <div class="flex items-center gap-4 text-gray-400">
            <a href="#" class="hover:text-white transition" aria-label="WeChat">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 10a4.5 4.5 0 1 1 4.243-6H12a4.5 4.5 0 0 1 0 9H9l-3 2 .5-2.5A4.48 4.48 0 0 1 7.5 10Zm9 0a4.5 4.5 0 1 1 4.243-6H21a4.5 4.5 0 0 1 0 9h-3l-3 2 .5-2.5a4.48 4.48 0 0 1 1-2.5Z"/></svg>
            </a>
            <a href="#" class="hover:text-white transition" aria-label="GitHub">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.793 23.4c.6.111.82-.26.82-.58 0-.286-.01-1.043-.016-2.048-3.338.726-4.042-1.61-4.042-1.61-.547-1.39-1.335-1.76-1.335-1.76-1.09-.744.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.072 1.836 2.812 1.306 3.497.998.108-.776.42-1.306.764-1.606-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.469-2.381 1.236-3.22-.124-.304-.536-1.528.117-3.184 0 0 1.008-.322 3.3 1.23a11.48 11.48 0 0 1 6.006 0c2.29-1.552 3.297-1.23 3.297-1.23.655 1.656.243 2.88.119 3.184.77.839 1.235 1.91 1.235 3.22 0 4.61-2.807 5.622-5.48 5.92.431.372.815 1.102.815 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.217.697.826.578A12.002 12 0 0 0 12 .5Z"/></svg>
            </a>
            <a href="#" class="hover:text-white transition" aria-label="X">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21l-6.5 7.43L22 22h-6.8l-4.43-5.79L5.6 22H3l7.03-8.03L2 2h6.9l4.02 5.38L18.244 2Zm-2.38 18h1.98L8.26 4H6.2l9.665 16Z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const userCount = ref(0);
const pageViews = ref(0);
const lastUpdated = ref('');

function formatNumber(n) {
  try {
    return Number(n || 0).toLocaleString('zh-CN');
  } catch (_) {
    return String(n ?? 0);
  }
}

// onMounted 是一个生命周期钩子，它会在组件被加载到页面上时执行一次
onMounted(async () => {
  try {
    // 调用我们的后端 API 来获取统计数据
    const response = await fetch('/api/stats');
    const data = await response.json();

    if (response.ok) {
      userCount.value = data.userCount;
      pageViews.value = data.pageViews;
      // 更新时间戳
      const now = new Date();
      lastUpdated.value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    } else {
      console.error('获取统计数据失败:', data.error);
    }
  } catch (error) {
    console.error('请求统计数据时发生网络错误:', error);
  }
});
</script>