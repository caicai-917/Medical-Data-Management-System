// const sql = require('mssql');

// // 配置数据库连接信息（请替换为你的SQL Server账号和密码）
// const config = {
//   user: 'sa',               // 你的SQL Server账号（默认是sa）
//   password: '123456',      // 你的SQL Server登录密码
//   server: 'LAPTOP-EG35J17J',      // 服务器地址（本地默认localhost）
//   database: 'MedicalDB',    // 数据库名
//   options: {
//     encrypt: false           // 本地连接不需要加密，设为false
//   }
// };

// // // 连接数据库的函数
// // async function connectDB() {
// //   try {
// //     // 尝试连接数据库
// //     await sql.connect(config);
// //     console.log('✅ SQL Server数据库连接成功！');
// //   } catch (err) {
// //     // 如果连接失败，打印错误信息
// //     console.error('❌ 数据库连接失败：', err);
// //   }
// // }

// // // 导出函数、配置和sql对象，供其他文件使用
// // module.exports = { connectDB, sql, config };
// // const mongoose = require('mongoose');

const sql = require('mssql');

// SQL Server 连接配置（根据实际环境修改）
const config = {
  user: 'sa',
  password: '123456',
  server: 'LAPTOP-EG35J17J', // 或数据库服务器IP
  database: 'MedicalDB',
  options: {
    encrypt: false, // 若用 Azure 等需开启，本地一般关闭
    trustServerCertificate: true, // 本地开发可开启避免证书报错
  },
};

// 封装数据库连接方法
async function connectDB() {
  try {
    await sql.connect(config);
    console.log('✅ 数据库连接成功（SQL Server）');
    return sql;
  } catch (err) {
    console.error('❌ 数据库连接失败:', err);
    throw err; // 抛出错误，让启动流程感知
  }
}

module.exports = {
  connectDB,
  sql,
  config,
};