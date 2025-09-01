<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 导航栏 -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
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
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">患者管理</h2>
          <p class="text-gray-500 mt-1">管理和查看所有患者的体检数据</p>
        </div>
        
        <button 
          @click="openAddPatientModal"
          class="mt-4 md:mt-0 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition duration-200 font-medium flex items-center"
        >
          <i class="fas fa-plus mr-2"></i> 添加患者
        </button>
      </div>
      
      <!-- 搜索框 -->
      <div class="mb-6">
        <div class="relative">
          <input 
            v-model="searchQuery"
            @input="filterPatients"
            class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            type="text"
            placeholder="搜索患者姓名、科室..."
          >
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <i class="fas fa-search"></i>
          </span>
        </div>
      </div>
      
      <!-- 患者表格 -->
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">姓名</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">年龄</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">性别</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">就诊科室</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">体检日期</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <template v-if="filteredPatients.length > 0">
              <tr 
                v-for="patient in filteredPatients" 
                :key="patient.patient_id" 
                class="hover:bg-gray-50 transition duration-150"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ patient.patient_id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ patient.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ patient.age }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span :class="patient.gender === '男' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800' " class="px-2 py-1 text-xs rounded-full">
                    {{ patient.gender }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ patient.department }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(patient.check_date) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    @click="goToDetail(patient.patient_id)"
                    class="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <i class="fas fa-eye mr-1"></i>查看
                  </button>
                  <button 
                    @click="openEditPatientModal(patient)"
                    class="text-yellow-600 hover:text-yellow-900 mr-4"
                  >
                    <i class="fas fa-edit mr-1"></i>编辑
                  </button>
                  <button 
                    @click="handleDeletePatient(patient.patient_id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    <i class="fas fa-trash mr-1"></i>删除
                  </button>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="7" class="px-6 py-10 text-center text-gray-500">
                  <i class="fas fa-search-minus text-2xl mb-2"></i>
                  <p>未找到匹配的患者记录</p>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </main>

    <!-- 添加/编辑患者模态框 -->
    <div v-if="showPatientModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-800">{{ isEditing ? '编辑患者' : '添加患者' }}</h3>
            <button @click="closePatientModal" class="text-gray-400 hover:text-gray-500">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form @submit.prevent="savePatient">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                <input 
                  v-model="patientForm.name" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  type="text" 
                  required
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">年龄</label>
                <input 
                  v-model="patientForm.age" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  type="number" 
                  required
                  min="0"
                  max="150"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">性别</label>
                <div class="flex space-x-4">
                  <label class="inline-flex items-center">
                    <input 
                      v-model="patientForm.gender" 
                      type="radio" 
                      value="男" 
                      class="form-radio text-blue-600"
                    >
                    <span class="ml-2">男</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input 
                      v-model="patientForm.gender" 
                      type="radio" 
                      value="女" 
                      class="form-radio text-blue-600"
                    >
                    <span class="ml-2">女</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">就诊科室</label>
                <input 
                  v-model="patientForm.department" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  type="text" 
                  required
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">体检日期</label>
                <input 
                  v-model="patientForm.check_date" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  type="date" 
                  required
                >
              </div>
            </div>
            
            <div class="mt-6 flex space-x-3">
              <button 
                type="button"
                @click="closePatientModal"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                取消
              </button>
              <button 
                type="submit"
                class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                {{ isEditing ? '更新' : '保存' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 修正：删除未使用的 computed 导入
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

// 状态管理
const patientList = ref([]);
const filteredPatients = ref([]);
const searchQuery = ref('');
const currentUser = ref(localStorage.getItem('currentUser') || '');
const showUserMenu = ref(false);
const showPatientModal = ref(false);
const isEditing = ref(false);
const patientForm = ref({
  patient_id: null,
  name: '',
  age: '',
  gender: '男',
  department: '',
  check_date: ''
});

const router = useRouter();

// 页面加载时获取患者列表
onMounted(async () => {
  await fetchPatients();
});

// 获取患者列表
const fetchPatients = async () => {
  try {
    const res = await axios.get('http://localhost:3001/api/patients');
    patientList.value = res.data.data;
    filteredPatients.value = [...patientList.value];
  } catch (err) {
    console.error('获取患者列表失败:', err);
    alert('获取患者列表失败，请检查后端服务');
  }
};

// 筛选患者
const filterPatients = () => {
  if (!searchQuery.value) {
    filteredPatients.value = [...patientList.value];
    return;
  }
  
  const query = searchQuery.value.toLowerCase();
  filteredPatients.value = patientList.value.filter(patient => 
    patient.name.toLowerCase().includes(query) || 
    patient.department.toLowerCase().includes(query) ||
    patient.gender.toLowerCase().includes(query)
  );
};

// 格式化日期（增强兼容性处理）
// 替换原 formatDate 函数
const formatDate = (dateString) => {
  if (!dateString) return '';
  // 处理多种可能的日期格式（如 yyyy-MM-dd、yyyy/MM/dd、时间戳等）
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    // 尝试用时间戳（毫秒/秒）解析
    const timestamp = Number(dateString);
    if (!isNaN(timestamp)) {
      return new Date(timestamp).toLocaleDateString('zh-CN');
    }
    return '无效日期';
  }
  return date.toLocaleDateString('zh-CN');
};
// 打开添加患者模态框
const openAddPatientModal = () => {
  isEditing.value = false;
  patientForm.value = {
    patient_id: null,
    name: '',
    age: '',
    gender: '男',
    department: '',
    check_date: new Date().toISOString().split('T')[0]
  };
  showPatientModal.value = true;
};

// 打开编辑患者模态框
const openEditPatientModal = (patient) => {
  isEditing.value = true;
  // 深拷贝患者数据，避免直接修改原数据
  patientForm.value = JSON.parse(JSON.stringify(patient)); 
  // 标准化日期格式，适配输入框
  if (patient.check_date) {
    const date = new Date(patient.check_date);
    if (!isNaN(date.getTime())) {
      patientForm.value.check_date = date.toISOString().split('T')[0];
    } else {
      // 异常日期处理（如置空或给默认值）
      patientForm.value.check_date = new Date().toISOString().split('T')[0]; 
    }
  }
  showPatientModal.value = true;
};

// 关闭患者模态框
const closePatientModal = () => {
  showPatientModal.value = false;
};

// 保存患者信息
const savePatient = async () => {
  try {
    // 提交前校验日期格式
    const date = new Date(patientForm.value.check_date);
    if (isNaN(date.getTime())) {
      alert('体检日期格式无效，请重新选择');
      return;
    }
    if (isEditing.value) {
      await axios.put(`http://localhost:3001/api/patients/${patientForm.value.patient_id}`, patientForm.value);
      alert('患者信息更新成功');
    } else {
      await axios.post('http://localhost:3001/api/patients', patientForm.value);
      alert('患者添加成功');
    }
    closePatientModal();
    await fetchPatients(); 
  } catch (err) {
    console.error('保存失败:', err);
    alert('操作失败，请检查网络或后端服务');
  }
};

// 删除患者
const handleDeletePatient = async (id) => {
  if (!confirm('确定要删除这个患者吗？相关的体检数据也会被删除。')) {
    return;
  }
  
  try {
    await axios.delete(`http://localhost:3001/api/patients/${id}`);
    alert('患者删除成功');
    await fetchPatients(); // 重新获取患者列表
  } catch (err) {
    console.error('删除患者失败:', err);
    alert('删除失败，请检查后端服务');
  }
};
// 新增 goToDetail 方法，用于跳转到患者详情页
const goToDetail = (id) => {
  router.push(`/patient/${id}`);
};

// 跳转到个人信息页面
const goToUserProfile = () => {
  router.push('/profile');
  showUserMenu.value = false;
};

// 退出登录
const handleLogout = () => {
  localStorage.removeItem('isLogin');
  localStorage.removeItem('currentUser');
  router.push('/login');
};
</script>