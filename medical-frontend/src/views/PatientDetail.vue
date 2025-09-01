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
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-800">患者体检详情</h2>
        <p class="text-gray-500 mt-1">查看和管理患者的体检指标数据</p>
      </div>
      
      <!-- 患者基本信息卡片 -->
      <div class="bg-white shadow-md rounded-lg p-6 mb-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h3 class="text-xl font-semibold text-gray-800">{{ patientInfo.name }} 的体检报告</h3>
            <p class="text-gray-500 mt-1">
              <span class="mr-4"><i class="fas fa-calendar-alt mr-1"></i>体检日期: {{ formatDate(patientInfo.check_date) }}</span>
              <span><i class="fas fa-hospital mr-1"></i>就诊科室: {{ patientInfo.department }}</span>
            </p>
          </div>
          
          <div class="mt-4 md:mt-0">
            <button 
              @click="openEditIndicesModal"
              class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200 font-medium flex items-center"
            >
              <i class="fas fa-edit mr-2"></i> 编辑指标
            </button>
          </div>
        </div>
        
        <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-sm text-gray-500">年龄</p>
            <p class="text-2xl font-semibold text-gray-800">{{ patientInfo.age }} 岁</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-sm text-gray-500">性别</p>
            <p class="text-2xl font-semibold text-gray-800">
              <span :class="patientInfo.gender === '男' ? 'text-blue-600' : 'text-pink-600'">
                {{ patientInfo.gender }}
              </span>
            </p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-sm text-gray-500">患者ID</p>
            <p class="text-2xl font-semibold text-gray-800">#{{ patientInfo.patient_id }}</p>
          </div>
        </div>
      </div>
      
      <!-- 体检指标和图表 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- 指标表格 -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">体检指标详情</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center pb-3 border-b border-gray-100">
              <div>
                <p class="text-gray-600">血压</p>
                <p class="text-sm text-gray-500">正常范围: 90/60 - 140/90 mmHg</p>
              </div>
              <p class="text-xl font-semibold text-gray-800">
                {{ patientData.blood_pressure || '暂无数据' }}
                <span 
                  v-if="patientData.blood_pressure" 
                  :class="isBloodPressureNormal(patientData.blood_pressure) ? 'text-green-500' : 'text-red-500'"
                  class="ml-2 text-sm"
                >
                  {{ isBloodPressureNormal(patientData.blood_pressure) ? '正常' : '异常' }}
                </span>
              </p>
            </div>
            
            <div class="flex justify-between items-center pb-3 border-b border-gray-100">
              <div>
                <p class="text-gray-600">血糖</p>
                <p class="text-sm text-gray-500">正常范围: 3.9 - 6.1 mmol/L</p>
              </div>
              <p class="text-xl font-semibold text-gray-800">
                {{ patientData.blood_sugar || '暂无数据' }}
                <span 
                  v-if="patientData.blood_sugar !== undefined" 
                  :class="isBloodSugarNormal(patientData.blood_sugar) ? 'text-green-500' : 'text-red-500'"
                  class="ml-2 text-sm"
                >
                  {{ isBloodSugarNormal(patientData.blood_sugar) ? '正常' : '异常' }}
                </span>
              </p>
            </div>
            
            <div class="flex justify-between items-center">
              <div>
                <p class="text-gray-600">胆固醇</p>
                <p class="text-sm text-gray-500">正常范围: 2.9 - 5.2 mmol/L</p>
              </div>
              <p class="text-xl font-semibold text-gray-800">
                {{ patientData.cholesterol || '暂无数据' }}
                <span 
                  v-if="patientData.cholesterol !== undefined" 
                  :class="isCholesterolNormal(patientData.cholesterol) ? 'text-green-500' : 'text-red-500'"
                  class="ml-2 text-sm"
                >
                  {{ isCholesterolNormal(patientData.cholesterol) ? '正常' : '异常' }}
                </span>
              </p>
            </div>
          </div>
        </div>
        
        <!-- 雷达图 -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">指标雷达图</h3>
          <div id="chart" class="w-full h-64"></div>
          
          <div class="mt-6 bg-gray-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-800 mb-2">健康评估</h4>
            <p class="text-gray-600 text-sm">
              <i class="fas fa-info-circle text-blue-500 mr-2"></i>
              {{ getHealthAssessment() }}
            </p>
          </div>
        </div>
      </div>
    </main>

    <!-- 编辑体检指标模态框 -->
    <div v-if="showIndicesModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-800">编辑体检指标</h3>
            <button @click="closeIndicesModal" class="text-gray-400 hover:text-gray-500">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form @submit.prevent="saveIndices">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">血压 (mmHg)</label>
                <input 
                  v-model="indicesForm.blood_pressure" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  type="text" 
                  placeholder="例如: 120/80"
                  required
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">血糖 (mmol/L)</label>
                <input 
                  v-model="indicesForm.blood_sugar" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  type="number" 
                  step="0.1"
                  min="0"
                  required
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">胆固醇 (mmol/L)</label>
                <input 
                  v-model="indicesForm.cholesterol" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  type="number" 
                  step="0.1"
                  min="0"
                  required
                >
              </div>
            </div>
            
            <div class="mt-6 flex space-x-3">
              <button 
                type="button"
                @click="closeIndicesModal"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                取消
              </button>
              <button 
                type="submit"
                class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                保存
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import * as echarts from 'echarts';

// 状态管理
const patientData = ref({});
const patientInfo = ref({});
const currentUser = ref(localStorage.getItem('currentUser') || '');
const showUserMenu = ref(false);
const showIndicesModal = ref(false);
const indicesForm = ref({
  index_id: null,
  patient_id: null,
  blood_pressure: '',
  blood_sugar: '',
  cholesterol: ''
});

const router = useRouter();
const route = useRoute();
let myChart = null;

// 返回列表页
const goBack = () => {
  router.push('/patients');
};

// 页面加载时获取数据
onMounted(async () => {
  const patientId = route.params.id;
  await fetchPatientInfo(patientId);
  await fetchPatientData(patientId);
});

// 监听患者ID变化，重新加载数据
watch(
  () => route.params.id,
  async (newId) => {
    await fetchPatientInfo(newId);
    await fetchPatientData(newId);
  }
);

// 获取患者基本信息
const fetchPatientInfo = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3001/api/patients/${id}`);
    patientInfo.value = res.data.data;
  } catch (err) {
    console.error('获取患者基本信息失败:', err);
    alert('获取患者信息失败');
  }
};

// 获取患者体检指标
const fetchPatientData = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3001/api/patient/${id}`);
    patientData.value = res.data.data || {};
    drawChart();
  } catch (err) {
    console.error('获取患者体检指标失败:', err);
    alert('获取患者体检指标失败');
  }
};

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN');
};

// 判断血压是否正常
const isBloodPressureNormal = (bp) => {
  if (!bp) return false;
  const [systolic, diastolic] = bp.split('/').map(Number);
  return systolic >= 90 && systolic <= 140 && diastolic >= 60 && diastolic <= 90;
};

// 判断血糖是否正常
const isBloodSugarNormal = (bs) => {
  return bs >= 3.9 && bs <= 6.1;
};

// 判断胆固醇是否正常
const isCholesterolNormal = (c) => {
  return c >= 2.9 && c <= 5.2;
};

// 生成健康评估
const getHealthAssessment = () => {
  if (!patientData.value.blood_pressure || patientData.value.blood_sugar === undefined || patientData.value.cholesterol === undefined) {
    return '缺少足够的体检数据，无法进行评估。';
  }
  
  const allNormal = isBloodPressureNormal(patientData.value.blood_pressure) && 
                    isBloodSugarNormal(patientData.value.blood_sugar) && 
                    isCholesterolNormal(patientData.value.cholesterol);
                    
  if (allNormal) {
    return '各项指标均在正常范围内，建议保持健康的生活方式。';
  }
  
  const issues = [];
  if (!isBloodPressureNormal(patientData.value.blood_pressure)) issues.push('血压异常');
  if (!isBloodSugarNormal(patientData.value.blood_sugar)) issues.push('血糖异常');
  if (!isCholesterolNormal(patientData.value.cholesterol)) issues.push('胆固醇异常');
  
  return `检测到${issues.join('、')}，建议咨询医生进行进一步检查。`;
};

// 绘制雷达图
const drawChart = () => {
  if (myChart) {
    myChart.dispose(); // 销毁已有图表
  }
  
  const chartDom = document.getElementById('chart');
  myChart = echarts.init(chartDom);
  
  // 处理血压数据（取收缩压）
  let systolic = 0;
  if (patientData.value.blood_pressure) {
    systolic = parseInt(patientData.value.blood_pressure.split('/')[0]) || 0;
  }
  
  const option = {
    tooltip: {
      trigger: 'item'
    },
    radar: {
      indicator: [
        { name: '血压', max: 160 },
        { name: '血糖', max: 10 },
        { name: '胆固醇', max: 8 }
      ],
      splitArea: {
        areaStyle: {
          color: ['rgba(255, 255, 255, 0.2)']
        }
      },
      axisLine: {
        lineStyle: {
          color: '#ccc'
        }
      }
    },
    series: [
      {
        name: '患者指标',
        type: 'radar',
        symbolSize: 6,
        lineStyle: {
          width: 2
        },
        areaStyle: {
          color: 'rgba(54, 162, 235, 0.2)'
        },
        itemStyle: {
          color: '#36a2eb'
        },
        data: [
          {
            value: [
              systolic,
              patientData.value.blood_sugar || 0,
              patientData.value.cholesterol || 0
            ],
            name: '患者指标'
          }
        ]
      }
    ]
  };
  
  myChart.setOption(option);
  
  // 监听窗口大小变化，自动调整图表
  const handleResize = () => {
    myChart.resize();
  };
  
  window.addEventListener('resize', handleResize);
  
  // 组件卸载时清除监听
  const cleanup = () => {
    window.removeEventListener('resize', handleResize);
  };
  
  return cleanup;
};

// 打开编辑指标模态框
const openEditIndicesModal = () => {
  indicesForm.value = {
    index_id: patientData.value.index_id || null,
    patient_id: patientInfo.value.patient_id,
    blood_pressure: patientData.value.blood_pressure || '',
    blood_sugar: patientData.value.blood_sugar || '',
    cholesterol: patientData.value.cholesterol || ''
  };
  showIndicesModal.value = true;
};

// 关闭编辑指标模态框
const closeIndicesModal = () => {
  showIndicesModal.value = false;
};

// 保存体检指标
const saveIndices = async () => {
  try {
    if (indicesForm.value.index_id) {
      // 更新现有指标
      await axios.put(`http://localhost:3001/api/indices/${indicesForm.value.index_id}`, indicesForm.value);
    } else {
      // 创建新指标
      await axios.post('http://localhost:3001/api/indices', indicesForm.value);
    }
    
    alert('体检指标保存成功');
    closeIndicesModal();
    await fetchPatientData(indicesForm.value.patient_id); // 重新获取数据
  } catch (err) {
    console.error('保存体检指标失败:', err);
    alert('保存失败，请检查后端服务');
  }
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
