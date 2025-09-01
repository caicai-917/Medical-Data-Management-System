<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white shadow-xl rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
      <div class="p-8">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-800">医疗数据管理系统</h2>
          <p class="text-gray-500 mt-2">
            {{ currentForm === 'login' ? '请登录您的账号' : 
              currentForm === 'register' ? '创建新账号' : '重置您的密码' }}
          </p>
        </div>
        
        <!-- 登录表单 -->
        <form v-if="currentForm === 'login'" @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <i class="fas fa-user"></i>
              </span>
              <input 
                id="username"
                v-model="loginForm.username" 
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                type="text" 
                required
                placeholder="请输入用户名"
              >
            </div>
            <p v-if="loginErrors.username" class="mt-1 text-sm text-red-600">{{ loginErrors.username }}</p>
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <i class="fas fa-lock"></i>
              </span>
              <input 
                id="password"
                v-model="loginForm.password" 
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                type="password" 
                required
                placeholder="请输入密码"
              >
            </div>
            <p v-if="loginErrors.password" class="mt-1 text-sm text-red-600">{{ loginErrors.password }}</p>
          </div>
          
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <input 
                id="remember" 
                type="checkbox" 
                v-model="rememberMe"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              >
              <label for="remember" class="ml-2 block text-sm text-gray-700">记住我</label>
            </div>
            <button 
              type="button" 
              @click="switchForm('forgot')"
              class="text-sm text-blue-600 hover:text-blue-500"
            >
              忘记密码?
            </button>
          </div>
          
          <button 
            type="submit"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200 font-medium flex items-center justify-center"
            :disabled="isLoading"
          >
            <i v-if="isLoading" class="fas fa-spinner fa-spin mr-2"></i>
            <i v-else class="fas fa-sign-in-alt mr-2"></i> 
            登录
          </button>
          
          <div class="text-center">
            <span class="text-gray-600">还没有账号? </span>
            <button 
              type="button" 
              @click="switchForm('register')"
              class="text-blue-600 hover:text-blue-500 font-medium"
            >
              立即注册
            </button>
          </div>
        </form>
        
        <!-- 注册表单 -->
        <form v-if="currentForm === 'register'" @submit.prevent="handleRegister" class="space-y-6">
          <div>
            <label for="reg-username" class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <i class="fas fa-user"></i>
              </span>
              <input 
                id="reg-username"
                v-model="registerForm.username" 
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                type="text" 
                required
                placeholder="请设置用户名"
              >
            </div>
            <p v-if="registerErrors.username" class="mt-1 text-sm text-red-600">{{ registerErrors.username }}</p>
          </div>
          
          <div>
            <label for="reg-email" class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <i class="fas fa-envelope"></i>
              </span>
              <input 
                id="reg-email"
                v-model="registerForm.email" 
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                type="email" 
                required
                placeholder="请输入邮箱"
              >
            </div>
            <p v-if="registerErrors.email" class="mt-1 text-sm text-red-600">{{ registerErrors.email }}</p>
          </div>
          
          <div>
            <label for="reg-password" class="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <i class="fas fa-lock"></i>
              </span>
              <input 
                id="reg-password"
                v-model="registerForm.password" 
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                type="password" 
                required
                placeholder="请设置密码（至少6位）"
              >
            </div>
            <p v-if="registerErrors.password" class="mt-1 text-sm text-red-600">{{ registerErrors.password }}</p>
          </div>
          
          <div>
            <label for="reg-confirm" class="block text-sm font-medium text-gray-700 mb-1">确认密码</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <i class="fas fa-lock"></i>
              </span>
              <input 
                id="reg-confirm"
                v-model="registerForm.confirmPassword" 
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                type="password" 
                required
                placeholder="请再次输入密码"
              >
            </div>
            <p v-if="registerErrors.confirmPassword" class="mt-1 text-sm text-red-600">{{ registerErrors.confirmPassword }}</p>
          </div>
          
          <button 
            type="submit"
            class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition duration-200 font-medium flex items-center justify-center"
            :disabled="isLoading"
          >
            <i v-if="isLoading" class="fas fa-spinner fa-spin mr-2"></i>
            <i v-else class="fas fa-user-plus mr-2"></i> 
            注册
          </button>
          
          <div class="text-center">
            <span class="text-gray-600">已有账号? </span>
            <button 
              type="button" 
              @click="switchForm('login')"
              class="text-blue-600 hover:text-blue-500 font-medium"
            >
              立即登录
            </button>
          </div>
        </form>
        
        <!-- 忘记密码表单 -->
        <form v-if="currentForm === 'forgot'" @submit.prevent="handleForgotPassword" class="space-y-6">
          <div>
            <label for="forgot-username" class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <i class="fas fa-user"></i>
              </span>
              <input 
                id="forgot-username"
                v-model="forgotForm.username" 
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                type="text" 
                required
                placeholder="请输入用户名"
              >
            </div>
          </div>
          
          <div>
            <label for="forgot-email" class="block text-sm font-medium text-gray-700 mb-1">注册邮箱</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <i class="fas fa-envelope"></i>
              </span>
              <input 
                id="forgot-email"
                v-model="forgotForm.email" 
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                type="email" 
                required
                placeholder="请输入注册邮箱"
              >
            </div>
          </div>
          
          <button 
            type="submit"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200 font-medium flex items-center justify-center"
            :disabled="isLoading"
          >
            <i v-if="isLoading" class="fas fa-spinner fa-spin mr-2"></i>
            <i v-else class="fas fa-paper-plane mr-2"></i> 
            发送重置链接
          </button>
          
          <div class="text-center">
            <button 
              type="button" 
              @click="switchForm('login')"
              class="text-blue-600 hover:text-blue-500 font-medium"
            >
              返回登录
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * @component LoginPage
 * @description 包含登录、注册和忘记密码功能的页面组件
 */
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

// 表单切换状态管理
const currentForm = ref('login'); // 可能的值: login, register, forgot

// 登录表单数据
const loginForm = ref({
  username: '',
  password: ''
});

// 注册表单数据
const registerForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

// 忘记密码表单数据
const forgotForm = ref({
  username: '',
  email: ''
});

// 错误信息
const loginErrors = ref({
  username: '',
  password: ''
});

const registerErrors = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

// 状态管理
const isLoading = ref(false);
const rememberMe = ref(false);
const router = useRouter();

// 切换表单
const switchForm = (formType) => {
  currentForm.value = formType;
  // 重置错误信息
  Object.keys(loginErrors.value).forEach(key => {
    loginErrors.value[key] = '';
  });
  Object.keys(registerErrors.value).forEach(key => {
    registerErrors.value[key] = '';
  });
};

// 登录处理
const handleLogin = async () => {
  // 简单验证
  let isValid = true;
  
  if (!loginForm.value.username.trim()) {
    loginErrors.value.username = '请输入用户名';
    isValid = false;
  } else {
    loginErrors.value.username = '';
  }
  
  if (!loginForm.value.password.trim()) {
    loginErrors.value.password = '请输入密码';
    isValid = false;
  } else {
    loginErrors.value.password = '';
  }
  
  if (!isValid) return;
  
  try {
    isLoading.value = true;
    const res = await axios.post('http://localhost:3001/api/login', {
      username: loginForm.value.username,
      password: loginForm.value.password,
    });
    
    if (res.data.code === 200) {
      // 存储用户信息
      localStorage.setItem('isLogin', 'true');
      localStorage.setItem('currentUser', loginForm.value.username);
      localStorage.setItem('token', res.data.token);
      
      // 如果勾选记住我，可以存储更长时间的登录状态
      if (rememberMe.value) {
        localStorage.setItem('rememberMe', 'true');
      }
      
      router.push('/patients');
    } else {
      alert('登录失败：' + (res.data.message || '用户名或密码错误'));
    }
  } catch (err) {
    console.error('登录请求失败:', err);
    alert('登录失败，请检查网络连接或后端服务是否启动');
  } finally {
    isLoading.value = false;
  }
};

// 注册处理
const handleRegister = async () => {
  // 表单验证
  let isValid = true;
  
  if (!registerForm.value.username.trim()) {
    registerErrors.value.username = '请输入用户名';
    isValid = false;
  } else {
    registerErrors.value.username = '';
  }
  
  if (!registerForm.value.email.trim()) {
    registerErrors.value.email = '请输入邮箱';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.value.email)) {
    registerErrors.value.email = '请输入有效的邮箱地址';
    isValid = false;
  } else {
    registerErrors.value.email = '';
  }
  
  if (!registerForm.value.password.trim()) {
    registerErrors.value.password = '请设置密码';
    isValid = false;
  } else if (registerForm.value.password.length < 6) {
    registerErrors.value.password = '密码长度至少6位';
    isValid = false;
  } else {
    registerErrors.value.password = '';
  }
  
  if (registerForm.value.confirmPassword !== registerForm.value.password) {
    registerErrors.value.confirmPassword = '两次输入的密码不一致';
    isValid = false;
  } else if (!registerForm.value.confirmPassword.trim()) {
    registerErrors.value.confirmPassword = '请确认密码';
    isValid = false;
  } else {
    registerErrors.value.confirmPassword = '';
  }
  
  if (!isValid) return;
  
  try {
    isLoading.value = true;
    const res = await axios.post('http://localhost:3001/api/register', {
      username: registerForm.value.username,
      email: registerForm.value.email,
      password: registerForm.value.password
    });
    
    if (res.data.code === 200) {
      alert('注册成功，请登录');
      switchForm('login');
      // 自动填充用户名
      loginForm.value.username = registerForm.value.username;
      // 重置注册表单
      registerForm.value = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      };
    } else {
      alert('注册失败：' + (res.data.message || '注册过程中出现错误'));
    }
  } catch (err) {
    console.error('注册请求失败:', err);
    alert('注册失败，请检查网络连接或后端服务是否启动');
  } finally {
    isLoading.value = false;
  }
};

// 忘记密码处理
const handleForgotPassword = async () => {
  if (!forgotForm.value.username.trim() || !forgotForm.value.email.trim()) {
    alert('请输入用户名和邮箱');
    return;
  }
  
  try {
    isLoading.value = true;
    const res = await axios.post('http://localhost:3001/api/forgot', {
      username: forgotForm.value.username,
      email: forgotForm.value.email
    });
    
    if (res.data.code === 200) {
      alert('重置密码的链接已发送到您的邮箱，请查收');
      switchForm('login');
    } else {
      alert('发送失败：' + (res.data.message || '用户名或邮箱不正确'));
    }
  } catch (err) {
    console.error('忘记密码请求失败:', err);
    alert('操作失败，请检查网络连接或后端服务是否启动');
  } finally {
    isLoading.value = false;
  }
};
</script>
