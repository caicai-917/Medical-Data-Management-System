<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 导航栏 -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <button 
              @click="goBack"
              class="text-gray-500 hover:text-gray-700 mr-4"
            >
              <i class="fas fa-arrow-left"></i>
            </button>
            <h1 class="text-xl font-semibold text-gray-800">
              <i class="fas fa-hospital-user mr-2 text-blue-600"></i>医疗数据管理系统
            </h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <button 
              @click="showUserMenu = !showUserMenu"
              class="flex items-center text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <i class="fas fa-user-circle text-xl mr-1"></i>
              <span>{{ currentUser }}</span>
              <i class="fas fa-chevron-down ml-1 text-xs"></i>
            </button>
            
            <!-- 用户菜单 -->
            <div 
              v-if="showUserMenu"
              class="absolute right-4 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
            >
              <button 
                @click="goToUserProfile"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <i class="fas fa-user mr-2"></i>个人信息
              </button>
              <button 
                @click="handleLogout"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <i class="fas fa-sign-out-alt mr-2"></i>退出登录
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主内容区 -->
    <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-800">个人信息管理</h2>
        <p class="text-gray-500 mt-1">修改您的账户信息和密码</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 修改用户名表单 -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">
            <i class="fas fa-user-edit mr-2 text-blue-600"></i>修改用户名
          </h3>
          
          <form @submit.prevent="changeUsername">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">当前用户名</label>
                <p class="text-gray-900 font-medium">{{ currentUser }}</p>
              </div>
              
              <div>
                <label for="newUsername" class="block text-sm font-medium text-gray-700 mb-1">新用户名</label>
                <input 
                  id="newUsername"
                  v-model="newUsername" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  type="text" 
                  required
                  minlength="3"
                >
              </div>
              
              <div>
                <label for="usernamePassword" class="block text-sm font-medium text-gray-700 mb-1">密码确认</label>
                <input 
                  id="usernamePassword"
                  v-model="usernamePassword" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  type="password" 
                  required
                >
              </div>
            </div>
            
            <div class="mt-6">
              <button 
                type="submit"
                class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
              >
                保存新用户名
              </button>
            </div>
          </form>
        </div>
        
        <!-- 修改密码表单 -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">
            <i class="fas fa-key mr-2 text-green-600"></i>修改密码
          </h3>
          
          <form @submit.prevent="changePassword">
            <div class="space-y-4">
              <div>
                <label for="oldPassword" class="block text-sm font-medium text-gray-700 mb-1">当前密码</label>
                <input 
                  id="oldPassword"
                  v-model="oldPassword" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  type="password" 
                  required
                >
              </div>
              
              <div>
                <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-1">新密码</label>
                <input 
                  id="newPassword"
                  v-model="newPassword" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  type="password" 
                  required
                  minlength="6"
                >
                <p class="text-xs text-gray-500 mt-1">密码长度至少6位</p>
              </div>
              
              <div>
                <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">确认新密码</label>
                <input 
                  id="confirmPassword"
                  v-model="confirmPassword" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  type="password" 
                  required
                >
                <p v-if="newPassword !== confirmPassword && confirmPassword" class="text-xs text-red-500 mt-1">
                  两次输入的密码不一致
                </p>
              </div>
            </div>
            
            <div class="mt-6">
              <button 
                type="submit"
                :disabled="newPassword !== confirmPassword"
                class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 font-medium"
                :class="newPassword !== confirmPassword ? 'opacity-50 cursor-not-allowed' : ''"
              >
                保存新密码
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

// 状态管理
const currentUser = ref(localStorage.getItem('currentUser') || '');
const showUserMenu = ref(false);

// 修改用户名相关
const newUsername = ref('');
const usernamePassword = ref('');

// 修改密码相关
const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const router = useRouter();

// 返回上一页
const goBack = () => {
  router.push('/patients');
};

// 修改用户名
const changeUsername = async () => {
  try {
    const res = await axios.post('http://localhost:3001/api/changeUsername', {
      oldUsername: currentUser.value,
      newUsername: newUsername.value,
      password: usernamePassword.value
    });
    
    if (res.data.code === 200) {
      alert('用户名修改成功，请重新登录');
      // 更新本地存储并跳转到登录页
      localStorage.removeItem('isLogin');
      localStorage.removeItem('currentUser');
      router.push('/login');
    } else {
      alert('修改失败：' + res.data.message);
    }
  } catch (err) {
    console.error('修改用户名失败:', err);
    alert('修改失败，请检查后端服务');
  }
};

// 修改密码
const changePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    alert('两次输入的密码不一致');
    return;
  }
  
  try {
    const res = await axios.post('http://localhost:3001/api/changePassword', {
      username: currentUser.value,
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    });
    
    if (res.data.code === 200) {
      alert('密码修改成功，请重新登录');
      // 清空表单并跳转到登录页
      oldPassword.value = '';
      newPassword.value = '';
      confirmPassword.value = '';
      
      localStorage.removeItem('isLogin');
      localStorage.removeItem('currentUser');
      router.push('/login');
    } else {
      alert('修改失败：' + res.data.message);
    }
  } catch (err) {
    console.error('修改密码失败:', err);
    alert('修改失败，请检查后端服务');
  }
};

// 刷新个人信息页面
const goToUserProfile = () => {
  showUserMenu.value = false;
};

// 退出登录
const handleLogout = () => {
  localStorage.removeItem('isLogin');
  localStorage.removeItem('currentUser');
  router.push('/login');
};
</script>
