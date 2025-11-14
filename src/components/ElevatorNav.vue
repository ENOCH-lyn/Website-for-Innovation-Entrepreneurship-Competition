<template>
  <nav v-show="visible" class="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3" tabindex="0" @keydown.prevent="onKeydown">
    <a v-for="s in sections" :key="s.id" :href="`#${s.id}`" :title="s.label"
       class="group inline-flex items-center" @click.prevent="scrollToSection(s.id)" :aria-current="isActive(s.id) ? 'true' : undefined">
      <span :class="dotClass(s.id)" class="w-3 h-3 rounded-full transition-all"></span>
      <span class="ml-2 text-xs text-gray-600 transition"
            :class="isActive(s.id) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'">
        {{ s.label }}
      </span>
    </a>
  </nav>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const sections = [
  { id: 'top', label: '顶部' },
  { id: 'core-values', label: '核心价值' },
  { id: 'industrial-paradox', label: '时代之问' },
  { id: 'solution', label: '解决方案' },
  { id: 'faq', label: 'FAQ' },
  { id: 'footer', label: '底部' },
];

const active = ref('');
let observer;
let observedEls = [];
const visible = ref(true);
const route = useRoute();

function isActive(id){
  return active.value === id;
}

function dotClass(id){
  const isActive = (active.value === id) || (!id && active.value==='');
  return isActive
    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 w-3.5 h-3.5 shadow'
    : 'bg-gray-300 hover:bg-gray-400';
}

function getOffset(){
  const nav = document.querySelector('nav.sticky');
  return (nav?.offsetHeight || 72) + 8; // sticky nav height + small gap
}

function scrollToSection(id){
  if (!id || id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - getOffset();
  window.scrollTo({ top, behavior: 'smooth' });
}

function attachObservers(){
  // 清理旧的观察
  observedEls.forEach(el=>observer?.unobserve(el));
  observedEls = [];

  const opts = { root: null, threshold: 0.5, rootMargin: `-${getOffset()}px 0px 0px 0px` };
  observer?.disconnect();
  observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const id = e.target.getAttribute('id') || '';
        active.value = id || 'top';
      }
    });
  }, opts);

  const nodes = document.querySelectorAll('section[id], footer[id]');
  nodes.forEach(el=>{
    observer.observe(el);
    observedEls.push(el);
  });
}

onMounted(() => {
  // 等待 RouterView 内容渲染后再附加观察者
  requestAnimationFrame(()=>{
    attachObservers();
    // 再次尝试，兼容异步渲染
    setTimeout(attachObservers, 200);
  });
  window.addEventListener('resize', attachObservers);
});

watch(()=>route.name, (name)=>{
  // 只在首页显示电梯
  visible.value = (name === 'home');
  attachObservers();
});

function onKeydown(e){
  const idx = sections.findIndex(s=>isActive(s.id));
  if (e.key === 'ArrowUp') {
    const next = Math.max(0, idx - 1);
    scrollToSection(sections[next].id);
  } else if (e.key === 'ArrowDown') {
    const next = Math.min(sections.length - 1, idx + 1);
    scrollToSection(sections[next].id);
  }
}

onBeforeUnmount(()=>{
  observer?.disconnect();
  window.removeEventListener('resize', attachObservers);
});
</script>
