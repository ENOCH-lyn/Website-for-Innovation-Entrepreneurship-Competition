<template>
  <div class="max-w-5xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">管理后台</h1>

    <div class="bg-white p-4 rounded-lg shadow mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-1">管理员密钥</label>
      <input v-model="adminSecret" type="password" placeholder="请输入管理员密钥"
             class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 修改统计 -->
      <section class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">修改统计</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">用户总数</label>
            <input v-model.number="userCount" type="number" min="0"
                   class="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">访问总量</label>
            <input v-model.number="pageViews" type="number" min="0"
                   class="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button @click="updateStats" :disabled="!adminSecret || updating"
                  class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300">
            {{ updating ? '更新中...' : '立即更新' }}
          </button>
          <p v-if="statsMsg" :class="statsOk ? 'text-green-600' : 'text-red-600'" class="text-sm text-center">{{ statsMsg }}</p>
        </div>
      </section>

      <!-- 用户管理 -->
      <section class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">用户管理</h2>
        <div class="flex items-center gap-3 mb-4">
          <button @click="loadUsers" :disabled="!adminSecret || loadingUsers"
                  class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300">
            {{ loadingUsers ? '加载中...' : '加载用户' }}
          </button>
          <span v-if="usersMsg" class="text-sm" :class="usersOk ? 'text-green-600' : 'text-red-600'">{{ usersMsg }}</span>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">序号</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户名</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">邮箱</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">注册时间</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="!users.length && !loadingUsers">
                <td colspan="5" class="text-center p-4 text-gray-500">暂无注册用户。</td>
              </tr>
              <tr v-for="u in users" :key="u.email">
                <td class="px-6 py-4 whitespace-nowrap">{{ u.registrationNumber }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ u.username || '-' }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ u.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(u.createdAt) }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button class="text-red-600 hover:bg-red-50 border border-red-200 rounded px-2 py-1 text-sm"
                          @click="confirmDelete(u)">删除</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 清空数据库 -->
      <section class="bg-white p-6 rounded-lg shadow md:col-span-2">
        <h2 class="text-xl font-semibold mb-4 text-red-600">危险操作：清空数据库</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label class="block text-sm font-medium text-gray-700">范围（scope）</label>
            <select v-model="clearScope" class="mt-1 w-full border rounded px-3 py-2">
              <option value="users">仅用户数据（user:email:*, user:username:*, userCount）</option>
              <option value="stats">仅统计（pageViews）</option>
              <option value="all">全部键（极度危险）</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">确认文本</label>
            <input v-model="confirmText" placeholder="输入 YES 才能执行"
                   class="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <button @click="clearDb" :disabled="!adminSecret || confirmText !== 'YES' || clearing"
                  class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-red-300">
            {{ clearing ? '执行中...' : '立即清空' }}
          </button>
        </div>
        <p v-if="clearMsg" :class="clearOk ? 'text-green-600' : 'text-red-600'" class="mt-3 text-sm">{{ clearMsg }}</p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const adminSecret = ref('');

// 修改统计
const userCount = ref(0);
const pageViews = ref(0);
const updating = ref(false);
const statsMsg = ref('');
const statsOk = ref(false);

async function updateStats() {
  statsMsg.value = '';
  statsOk.value = false;
  updating.value = true;
  try {
    const res = await fetch('/api/updateStats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newUserCount: userCount.value, newPageViews: pageViews.value, secret: adminSecret.value }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || '更新失败');
    statsOk.value = true;
    statsMsg.value = data.message || '更新成功';
  } catch (e) {
    statsOk.value = false;
    statsMsg.value = String(e.message || e);
  } finally {
    updating.value = false;
  }
}

// 用户管理
const loadingUsers = ref(false);
const users = ref([]);
const usersMsg = ref('');
const usersOk = ref(false);

function formatDate(d) {
  try { return new Date(d).toLocaleString(); } catch { return '-'; }
}

async function loadUsers() {
  usersMsg.value = '';
  usersOk.value = false;
  loadingUsers.value = true;
  users.value = [];
  try {
    const res = await fetch(`/api/getUsers?secret=${encodeURIComponent(adminSecret.value)}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || '加载失败');
    const list = Array.isArray(data) ? data : [];
    list.sort((a, b) => (a.registrationNumber || 0) - (b.registrationNumber || 0));
    users.value = list;
    usersOk.value = true;
    usersMsg.value = `已加载 ${list.length} 个用户。`;
  } catch (e) {
    usersOk.value = false;
    usersMsg.value = String(e.message || e);
  } finally {
    loadingUsers.value = false;
  }
}

// 清空数据库
const clearScope = ref('users');
const confirmText = ref('');
const clearing = ref(false);
const clearMsg = ref('');
const clearOk = ref(false);

async function clearDb() {
  clearMsg.value = '';
  clearOk.value = false;
  clearing.value = true;
  try {
    const res = await fetch('/api/adminClear?scope=' + encodeURIComponent(clearScope.value) + '&confirm=YES', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: adminSecret.value }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || '执行失败');
    clearOk.value = true;
    clearMsg.value = `已清空（scope=${data.scope}），删除键数：${data.deleted}`;
  } catch (e) {
    clearOk.value = false;
    clearMsg.value = String(e.message || e);
  } finally {
    clearing.value = false;
  }
}

// 删除用户（基于用户名）
async function deleteUserByUsername(username) {
  try {
    const res = await fetch('/api/deleteUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': adminSecret.value },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || '删除失败');
    return data;
  } catch (e) {
    throw e;
  }
}

async function confirmDelete(u) {
  const name = u?.username || '';
  if (!name) {
    usersMsg.value = '该用户没有可用的用户名，无法删除。';
    usersOk.value = false;
    return;
  }
  const ok = window.confirm(`确认删除用户「${name}」吗？该操作不可恢复。`);
  if (!ok) return;
  try {
    const result = await deleteUserByUsername(name);
    // 从列表中移除该用户
    users.value = users.value.filter(x => (x.username || '').toLowerCase() !== name.toLowerCase());
    usersOk.value = true;
    usersMsg.value = `已删除用户 ${result.username}${result.email ? ' <' + result.email + '>' : ''}`;
  } catch (e) {
    usersOk.value = false;
    usersMsg.value = String(e.message || e);
  }
}
</script>

<style scoped>
</style>
