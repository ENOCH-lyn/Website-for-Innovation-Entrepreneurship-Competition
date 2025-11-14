<template>
  <div class="min-h-screen bg-gradient-to-b from-white to-slate-50">
    <!-- Page Header / Breadcrumb -->
    <header class="border-b border-gray-100 bg-white/80 backdrop-blur sticky top-0 z-30">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex items-center justify-between py-5">
          <div>
            <p class="text-xs text-gray-500"><router-link to="/" class="hover:text-gray-700">首页</router-link> · 解决方案</p>
            <h1 class="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">锰创未来 解决方案</h1>
          </div>
        </div>
        <!-- Sticky Subnav -->

      </div>
    </header>

    <!-- Fixed Right-side Elevator Nav (desktop) -->
    <nav
      class="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3"
      aria-label="解决方案锚点导航"
    >
      <a
        v-for="s in sections"
        :key="s.id"
        :href="`#${s.id}`"
        :title="s.label"
        class="group inline-flex items-center"
        @click.prevent="scrollTo(s.id)"
        :aria-current="active===s.id ? 'true' : undefined"
      >
        <span :class="dotClass(s.id)" class="w-3 h-3 rounded-full transition-all"></span>
        <span
          class="ml-2 text-xs text-gray-600 transition"
          :class="active===s.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'"
        >
          {{ s.label }}
        </span>
      </a>
    </nav>

    <main>
      <!-- Overview -->
      <section id="overview" class="py-14">
        <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">材料 × 智能：一个自进化的闭环系统</h2>
            <p class="text-gray-700 leading-relaxed mb-6">锰创未来 将 ICMI 惰性晶格固定化技术与认知数字孪生平台融合，打通“物质改性—过程感知—机理/数据双模—自适应优化—价值闭环”的全链路，形成可以部署与规模化复制的工业级解决方案。</p>
            <ul class="space-y-3 text-gray-700">
              <li class="flex items-start gap-3"><span class="w-5 h-5 rounded-full bg-blue-600 text-white grid place-items-center text-xs">1</span><span>根治毒性：从晶格层面惰性化，消除长期环境风险。</span></li>
              <li class="flex items-start gap-3"><span class="w-5 h-5 rounded-full bg-indigo-600 text-white grid place-items-center text-xs">2</span><span>流程自优化：IIoT 数据 + 机理/数据双模，持续预测与调参。</span></li>
              <li class="flex items-start gap-3"><span class="w-5 h-5 rounded-full bg-cyan-600 text-white grid place-items-center text-xs">3</span><span>价值转化：绿色建材产品化与 ESG 可量化，环境负债变资产。</span></li>
            </ul>
          </div>
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div class="grid grid-cols-2 gap-6">
              <div class="rounded-xl p-5 bg-gradient-to-br from-blue-50 to-indigo-50">
                <h3 class="font-bold text-gray-900 mb-2">ICMI 物理层</h3>
                <p class="text-gray-600 text-sm">晶格重构 · 长效惰性化 · 工程性能赋能</p>
              </div>
              <div class="rounded-xl p-5 bg-gradient-to-br from-purple-50 to-pink-50">
                <h3 class="font-bold text-gray-900 mb-2">数字孪生层</h3>
                <p class="text-gray-600 text-sm">认知图谱 · 双模推理 · 自适应优化</p>
              </div>
              <div class="rounded-xl p-5 bg-gradient-to-br from-teal-50 to-emerald-50">
                <h3 class="font-bold text-gray-900 mb-2">IIoT 感知层</h3>
                <p class="text-gray-600 text-sm">关键参数采集 · 边云协同 · 实时闭环</p>
              </div>
              <div class="rounded-xl p-5 bg-gradient-to-br from-amber-50 to-orange-50">
                <h3 class="font-bold text-gray-900 mb-2">ESG 价值层</h3>
                <p class="text-gray-600 text-sm">可量化指标 · 合规报告 · 品牌增益</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Process Flow -->
      <section id="process" class="py-14 bg-white">
        <div class="max-w-7xl mx-auto px-6">
          <h2 class="text-2xl md:text-3xl font-extrabold mb-8">工艺流程（示意）</h2>
          <div class="overflow-x-auto">
            <div class="min-w-[840px] grid grid-cols-6 gap-6 items-start">
              <div v-for="(step,i) in steps" :key="step.title" class="text-center">
                <div class="relative">
                  <div class="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white grid place-items-center text-xl font-bold">{{ i+1 }}</div>
                  <div v-if="i<steps.length-1" class="hidden md:block absolute top-1/2 left-full w-24 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 translate-y-[-50%]"></div>
                </div>
                <h3 class="mt-4 font-semibold">{{ step.title }}</h3>
                <p class="text-sm text-gray-600 mt-1">{{ step.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Architecture -->
      <section id="architecture" class="py-14">
        <div class="max-w-7xl mx-auto px-6">
          <h2 class="text-2xl md:text-3xl font-extrabold mb-8">认知数字孪生架构</h2>
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div class="grid lg:grid-cols-4 gap-6">
              <div class="rounded-xl border border-gray-100 p-4">
                <h3 class="font-bold mb-2">边缘感知</h3>
                <p class="text-sm text-gray-600">传感器/PLC 数据采集；边缘网关进行初步清洗与压缩。</p>
              </div>
              <div class="rounded-xl border border-gray-100 p-4">
                <h3 class="font-bold mb-2">数据中台</h3>
                <p class="text-sm text-gray-600">时序库 + 对象存储；ETL/特征工程；质量监控与标签。</p>
              </div>
              <div class="rounded-xl border border-gray-100 p-4">
                <h3 class="font-bold mb-2">机理 × 数据双模</h3>
                <p class="text-sm text-gray-600">结合机理模型（热/质传）与数据模型（时序/图）协同推理。</p>
              </div>
              <div class="rounded-xl border border-gray-100 p-4">
                <h3 class="font-bold mb-2">编排与闭环</h3>
                <p class="text-sm text-gray-600">优化器/控制器输出建议或自动调参；看板与告警联动。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Metrics -->
      <section id="metrics" class="py-14 bg-white">
        <div class="max-w-7xl mx-auto px-6">
          <h2 class="text-2xl md:text-3xl font-extrabold mb-8">性能与价值指标（样例）</h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="m in metrics" :key="m.title" class="rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 p-6 border border-gray-100">
              <div class="text-3xl font-extrabold text-gray-900">{{ m.value }}</div>
              <div class="text-gray-600 mt-1">{{ m.title }}</div>
              <p class="text-xs text-gray-500 mt-3">{{ m.note }}</p>
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-4">注：数据为示例展示，实际以联调与第三方检测为准。</p>
        </div>
      </section>

      <!-- Solution FAQ -->
      <section id="faq" class="py-14">
        <div class="max-w-5xl mx-auto px-6">
          <h2 class="text-2xl md:text-3xl font-extrabold mb-8">常见问题</h2>
          <div class="flex flex-col gap-4">
            <details class="group w-full bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <summary class="w-full flex items-center justify-between gap-3 cursor-pointer select-none list-none">
                <span class="font-semibold text-gray-900">是否支持渐进式部署？</span>
                <span class="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 grid place-items-center group-open:rotate-45 transition">+</span>
              </summary>
              <div class="mt-3 text-gray-700 text-sm">支持模块化与分期上线，先上感知与看板，再接入优化闭环，确保风险可控与价值可见。</div>
            </details>
            <details class="group w-full bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <summary class="w-full flex items-center justify-between gap-3 cursor-pointer select-none list-none">
                <span class="font-semibold text-gray-900">如何与既有 DCS/SCADA 集成？</span>
                <span class="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 grid place-items-center group-open:rotate-45 transition">+</span>
              </summary>
              <div class="mt-3 text-gray-700 text-sm">通过标准协议网关或定制适配，读写权限分级；默认以旁路建议模式接入，逐步过渡闭环。</div>
            </details>
            <details class="group w-full bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <summary class="w-full flex items-center justify-between gap-3 cursor-pointer select-none list-none">
                <span class="font-semibold text-gray-900">数据与隐私如何保障？</span>
                <span class="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 grid place-items-center group-open:rotate-45 transition">+</span>
              </summary>
              <div class="mt-3 text-gray-700 text-sm">采用分层脱敏与最小化采集策略，传输与存储全链路加密；支持本地化与专有云部署。</div>
            </details>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const sections = [
  { id: 'overview', label: '核心方案' },
  { id: 'process', label: '工艺流程' },
  { id: 'architecture', label: '数字架构' },
  { id: 'metrics', label: '性能指标' },
  { id: 'faq', label: '常见问题' },
];

const steps = [
  { title: '源端评估', desc: '样本采集与毒性/组成分析' },
  { title: '参数建模', desc: '机理先验与数据特征融合' },
  { title: '工艺改性', desc: 'ICMI 晶格重构与性能赋能' },
  { title: '在线感知', desc: 'IIoT 采集与质量监控' },
  { title: '智能优化', desc: '双模推理与控制建议/闭环' },
  { title: '价值转化', desc: '绿色建材产品化与 ESG 报告' },
];

const metrics = [
  { title: '渗滤毒性风险', value: '↓ 90%~99%', note: '晶格惰性化后长期毒性显著降低' },
  { title: '资源化率', value: '≥ 80%', note: '因源端差异会调整，以检测为准' },
  { title: '综合成本', value: '↓ 30%~60%', note: '相较外运/堆填模式' },
  { title: '部署周期', value: '≈ 8~16 周', note: '按模块化阶段落地' },
];

const active = ref('overview');
let observer;

function getOffset(){
  const nav = document.querySelector('nav.sticky');
  return (nav?.offsetHeight || 68) + 8;
}

function scrollTo(id){
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - getOffset();
  window.scrollTo({ top, behavior: 'smooth' });
}

onMounted(()=>{
  const opts = { root: null, threshold: 0.5, rootMargin: `-${getOffset()}px 0px 0px 0px` };
  observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if (e.isIntersecting) {
        active.value = e.target.id;
      }
    })
  }, opts);
  sections.forEach(s=>{
    const el = document.getElementById(s.id);
    if (el) observer.observe(el);
  })
});

onBeforeUnmount(()=>observer?.disconnect());

function dotClass(id){
  const isOn = active.value === id;
  return isOn
    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 w-3.5 h-3.5 shadow'
    : 'bg-gray-300 hover:bg-gray-400';
}
</script>
