// const express = require('express');
// const { connectDB, sql } = require('./db');
// const cors = require('cors');

// const app = express();
// const port = 3001;

// // 允许跨域
// app.use(cors());
// // 解析JSON请求体
// app.use(express.json());

// // 1. 登录接口
// app.post('/api/login', async (req, res) => {
//   const { username, password } = req.body;
  
//   try {
//     const result = await sql.query(`
//       SELECT * FROM users WHERE username = '${username}' AND password = '${password}'
//     `);
    
//     if (result.recordset.length > 0) {
//       res.send({ code: 200, message: '登录成功' });
//     } else {
//       res.send({ code: 400, message: '账号或密码错误' });
//     }
//   } catch (err) {
//     console.error('登录接口错误:', err);
//     res.send({ code: 500, message: '服务器出错了' });
//   }
// });

// // 2. 获取患者列表接口
// app.get('/api/patients', async (req, res) => {
//   try {
//     const result = await sql.query('SELECT * FROM patients');
//     res.send({ code: 200, data: result.recordset });
//   } catch (err) {
//     console.error('获取患者列表接口错误:', err);
//     res.send({ code: 500, message: '服务器出错了' });
//   }
// });

// // 3. 获取单个患者基本信息
// app.get('/api/patients/:id', async (req, res) => {
//   const patientId = req.params.id;
  
//   try {
//     const result = await sql.query(`
//       SELECT * FROM patients WHERE patient_id = ${patientId}
//     `);
//     res.send({ code: 200, data: result.recordset[0] });
//   } catch (err) {
//     console.error('获取患者基本信息接口错误:', err);
//     res.send({ code: 500, message: '服务器出错了' });
//   }
// });

// // 4. 获取患者体检指标接口
// app.get('/api/patient/:id', async (req, res) => {
//   const patientId = req.params.id;
  
//   try {
//     const result = await sql.query(`
//       SELECT * FROM check_indices WHERE patient_id = ${patientId}
//     `);
//     res.send({ code: 200, data: result.recordset[0] });
//   } catch (err) {
//     console.error('获取患者体检指标接口错误:', err);
//     res.send({ code: 500, message: '服务器出错了' });
//   }
// });

// // 5. 添加新患者
// app.post('/api/patients', async (req, res) => {
//   const { name, age, gender, department, check_date } = req.body;
  
//   try {
//     // 开始事务
//     const transaction = new sql.Transaction(await sql.connect(config));
//     await transaction.begin();
    
//     const request = new sql.Request(transaction);
    
//     // 插入患者信息
//     const patientResult = await request.query(`
//       INSERT INTO patients (name, age, gender, department, check_date)
//       VALUES ('${name}', ${age}, '${gender}', '${department}', '${check_date}')
//       SELECT SCOPE_IDENTITY() as patient_id;
//     `);
    
//     const patientId = patientResult.recordset[0].patient_id;
    
//     // 为新患者创建空的体检指标记录
//     await request.query(`
//       INSERT INTO check_indices (patient_id, blood_pressure, blood_sugar, cholesterol)
//       VALUES (${patientId}, '', 0, 0)
//     `);
    
//     // 提交事务
//     await transaction.commit();
    
//     res.send({ code: 200, message: '患者添加成功', data: { patient_id: patientId } });
//   } catch (err) {
//     console.error('添加患者接口错误:', err);
//     // 回滚事务
//     if (transaction) await transaction.rollback();
//     res.send({ code: 500, message: '添加患者失败' });
//   }
// });

// // 6. 更新患者信息
// app.put('/api/patients/:id', async (req, res) => {
//   const patientId = req.params.id;
//   const { name, age, gender, department, check_date } = req.body;
  
//   try {
//     await sql.query(`
//       UPDATE patients
//       SET name = '${name}', age = ${age}, gender = '${gender}', 
//           department = '${department}', check_date = '${check_date}'
//       WHERE patient_id = ${patientId}
//     `);
    
//     res.send({ code: 200, message: '患者信息更新成功' });
//   } catch (err) {
//     console.error('更新患者信息接口错误:', err);
//     res.send({ code: 500, message: '更新患者信息失败' });
//   }
// });

// // 7. 删除患者
// app.delete('/api/patients/:id', async (req, res) => {
//   const patientId = req.params.id;
  
//   try {
//     // 开始事务
//     const transaction = new sql.Transaction(await sql.connect(config));
//     await transaction.begin();
    
//     const request = new sql.Request(transaction);
    
//     // 先删除体检指标
//     await request.query(`
//       DELETE FROM check_indices WHERE patient_id = ${patientId}
//     `);
    
//     // 再删除患者
//     await request.query(`
//       DELETE FROM patients WHERE patient_id = ${patientId}
//     `);
    
//     // 提交事务
//     await transaction.commit();
    
//     res.send({ code: 200, message: '患者删除成功' });
//   } catch (err) {
//     console.error('删除患者接口错误:', err);
//     // 回滚事务
//     if (transaction) await transaction.rollback();
//     res.send({ code: 500, message: '删除患者失败' });
//   }
// });

// // 8. 更新体检指标
// app.put('/api/indices/:id', async (req, res) => {
//   const indexId = req.params.id;
//   const { blood_pressure, blood_sugar, cholesterol } = req.body;
  
//   try {
//     await sql.query(`
//       UPDATE check_indices
//       SET blood_pressure = '${blood_pressure}', 
//           blood_sugar = ${blood_sugar}, 
//           cholesterol = ${cholesterol}
//       WHERE index_id = ${indexId}
//     `);
    
//     res.send({ code: 200, message: '体检指标更新成功' });
//   } catch (err) {
//     console.error('更新体检指标接口错误:', err);
//     res.send({ code: 500, message: '更新体检指标失败' });
//   }
// });

// // 9. 添加体检指标（用于新患者）
// app.post('/api/indices', async (req, res) => {
//   const { patient_id, blood_pressure, blood_sugar, cholesterol } = req.body;
  
//   try {
//     await sql.query(`
//       INSERT INTO check_indices (patient_id, blood_pressure, blood_sugar, cholesterol)
//       VALUES (${patient_id}, '${blood_pressure}', ${blood_sugar}, ${cholesterol})
//     `);
    
//     res.send({ code: 200, message: '体检指标添加成功' });
//   } catch (err) {
//     console.error('添加体检指标接口错误:', err);
//     res.send({ code: 500, message: '添加体检指标失败' });
//   }
// });

// // 10. 修改密码接口
// app.post('/api/changePassword', async (req, res) => {
//   const { username, oldPassword, newPassword } = req.body;
  
//   try {
//     // 先验证旧密码
//     const checkResult = await sql.query(`
//       SELECT * FROM users WHERE username = '${username}' AND password = '${oldPassword}'
//     `);
    
//     if (checkResult.recordset.length === 0) {
//       return res.send({ code: 400, message: '旧密码错误' });
//     }
    
//     // 修改密码
//     await sql.query(`
//       UPDATE users SET password = '${newPassword}' WHERE username = '${username}'
//     `);
    
//     res.send({ code: 200, message: '密码修改成功' });
//   } catch (err) {
//     console.error('修改密码接口错误:', err);
//     res.send({ code: 500, message: '修改密码失败' });
//   }
// });

// // 11. 修改用户名接口
// app.post('/api/changeUsername', async (req, res) => {
//   const { oldUsername, newUsername, password } = req.body;
  
//   try {
//     // 先验证旧用户名和密码
//     const checkResult = await sql.query(`
//       SELECT * FROM users WHERE username = '${oldUsername}' AND password = '${password}'
//     `);
    
//     if (checkResult.recordset.length === 0) {
//       return res.send({ code: 400, message: '用户名或密码错误' });
//     }
    
//     // 检查新用户名是否已存在
//     const existsResult = await sql.query(`
//       SELECT * FROM users WHERE username = '${newUsername}'
//     `);
    
//     if (existsResult.recordset.length > 0) {
//       return res.send({ code: 400, message: '新用户名已被使用' });
//     }
    
//     // 修改用户名
//     await sql.query(`
//       UPDATE users SET username = '${newUsername}' WHERE username = '${oldUsername}'
//     `);
    
//     res.send({ code: 200, message: '用户名修改成功' });
//   } catch (err) {
//     console.error('修改用户名接口错误:', err);
//     res.send({ code: 500, message: '修改用户名失败' });
//   }
// });

// // 启动服务器
// let transaction; // 声明事务变量
// const config = require('./db').config; // 导入配置

// connectDB().then(() => {
//   app.listen(port, () => {
//     console.log(`🚀 后端服务已启动，地址：http://localhost:${port}`);
//   });
// });
const express = require('express');
const { connectDB, sql, config } = require('./db');
const cors = require('cors');

const app = express();
const port = 3001;

// 允许跨域
app.use(cors());
// 解析 JSON 请求体
app.use(express.json());

// 1. 登录接口
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await sql.query(`
      SELECT * FROM users WHERE username = '${username}' AND password = '${password}'
    `);
    if (result.recordset.length > 0) {
      res.send({ code: 200, message: '登录成功' });
    } else {
      res.send({ code: 400, message: '账号或密码错误' });
    }
  } catch (err) {
    console.error('登录接口错误:', err);
    res.send({ code: 500, message: '服务器出错了' });
  }
});

// 2. 获取患者列表接口
app.get('/api/patients', async (req, res) => {
  try {
    const result = await sql.query('SELECT * FROM patients');
    res.send({ code: 200, data: result.recordset });
  } catch (err) {
    console.error('获取患者列表接口错误:', err);
    res.send({ code: 500, message: '服务器出错了' });
  }
});

// 3. 获取单个患者基本信息
app.get('/api/patients/:id', async (req, res) => {
  const patientId = req.params.id;
  try {
    const result = await sql.query(`
      SELECT * FROM patients WHERE patient_id = ${patientId}
    `);
    res.send({ code: 200, data: result.recordset[0] });
  } catch (err) {
    console.error('获取患者基本信息接口错误:', err);
    res.send({ code: 500, message: '服务器出错了' });
  }
});

// 4. 获取患者体检指标接口
app.get('/api/patient/:id', async (req, res) => {
  const patientId = req.params.id;
  try {
    const result = await sql.query(`
      SELECT * FROM check_indices WHERE patient_id = ${patientId}
    `);
    res.send({ code: 200, data: result.recordset[0] });
  } catch (err) {
    console.error('获取患者体检指标接口错误:', err);
    res.send({ code: 500, message: '服务器出错了' });
  }
});

// 5. 添加新患者
app.post('/api/patients', async (req, res) => {
  const { name, age, gender, department, check_date } = req.body;
  try {
    // 开始事务
    const transaction = new sql.Transaction(await sql.connect(config));
    await transaction.begin();
    const request = new sql.Request(transaction);

    // 插入患者信息
    const patientResult = await request.query(`
      INSERT INTO patients (name, age, gender, department, check_date)
      VALUES ('${name}', ${age}, '${gender}', '${department}', '${check_date}');
      SELECT SCOPE_IDENTITY() as patient_id;
    `);
    const patientId = patientResult.recordset[0].patient_id;

    // 为新患者创建空的体检指标记录
    await request.query(`
      INSERT INTO check_indices (patient_id, blood_pressure, blood_sugar, cholesterol)
      VALUES (${patientId}, '', 0, 0)
    `);

    // 提交事务
    await transaction.commit();
    res.send({ 
      code: 200, 
      message: '患者添加成功', 
      data: { patient_id: patientId } 
    });
  } catch (err) {
    console.error('添加患者接口错误:', err);
    // 回滚事务
    if (transaction) await transaction.rollback();
    res.send({ code: 500, message: '添加患者失败' });
  }
});

// 6. 更新患者信息
app.put('/api/patients/:id', async (req, res) => {
  const patientId = req.params.id;
  const { name, age, gender, department, check_date } = req.body;
  try {
    await sql.query(`
      UPDATE patients
      SET name = '${name}', age = ${age}, gender = '${gender}', 
          department = '${department}', check_date = '${check_date}'
      WHERE patient_id = ${patientId}
    `);
    res.send({ code: 200, message: '患者信息更新成功' });
  } catch (err) {
    console.error('更新患者信息接口错误:', err);
    res.send({ code: 500, message: '更新患者信息失败' });
  }
});

// 7. 删除患者
app.delete('/api/patients/:id', async (req, res) => {
  const patientId = req.params.id;
  try {
    // 开始事务
    const transaction = new sql.Transaction(await sql.connect(config));
    await transaction.begin();
    const request = new sql.Request(transaction);

    // 先删除体检指标
    await request.query(`
      DELETE FROM check_indices WHERE patient_id = ${patientId}
    `);
    // 再删除患者
    await request.query(`
      DELETE FROM patients WHERE patient_id = ${patientId}
    `);

    // 提交事务
    await transaction.commit();
    res.send({ code: 200, message: '患者删除成功' });
  } catch (err) {
    console.error('删除患者接口错误:', err);
    // 回滚事务
    if (transaction) await transaction.rollback();
    res.send({ code: 500, message: '删除患者失败' });
  }
});

// 8. 更新体检指标
app.put('/api/indices/:id', async (req, res) => {
  const indexId = req.params.id;
  const { blood_pressure, blood_sugar, cholesterol } = req.body;
  try {
    await sql.query(`
      UPDATE check_indices
      SET blood_pressure = '${blood_pressure}', 
          blood_sugar = ${blood_sugar}, 
          cholesterol = ${cholesterol}
      WHERE index_id = ${indexId}
    `);
    res.send({ code: 200, message: '体检指标更新成功' });
  } catch (err) {
    console.error('更新体检指标接口错误:', err);
    res.send({ code: 500, message: '更新体检指标失败' });
  }
});

// 9. 添加体检指标（用于新患者）
app.post('/api/indices', async (req, res) => {
  const { patient_id, blood_pressure, blood_sugar, cholesterol } = req.body;
  try {
    await sql.query(`
      INSERT INTO check_indices (patient_id, blood_pressure, blood_sugar, cholesterol)
      VALUES (${patient_id}, '${blood_pressure}', ${blood_sugar}, ${cholesterol})
    `);
    res.send({ code: 200, message: '体检指标添加成功' });
  } catch (err) {
    console.error('添加体检指标接口错误:', err);
    res.send({ code: 500, message: '添加体检指标失败' });
  }
});

// 10. 修改密码接口
app.post('/api/changePassword', async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;
  try {
    // 先验证旧密码
    const checkResult = await sql.query(`
      SELECT * FROM users WHERE username = '${username}' AND password = '${oldPassword}'
    `);
    if (checkResult.recordset.length === 0) {
      return res.send({ code: 400, message: '旧密码错误' });
    }
    // 修改密码
    await sql.query(`
      UPDATE users SET password = '${newPassword}' WHERE username = '${username}'
    `);
    res.send({ code: 200, message: '密码修改成功' });
  } catch (err) {
    console.error('修改密码接口错误:', err);
    res.send({ code: 500, message: '修改密码失败' });
  }
});

// 11. 修改用户名接口
app.post('/api/changeUsername', async (req, res) => {
  const { oldUsername, newUsername, password } = req.body;
  try {
    // 先验证旧用户名和密码
    const checkResult = await sql.query(`
      SELECT * FROM users WHERE username = '${oldUsername}' AND password = '${password}'
    `);
    if (checkResult.recordset.length === 0) {
      return res.send({ code: 400, message: '用户名或密码错误' });
    }
    // 检查新用户名是否已存在
    const existsResult = await sql.query(`
      SELECT * FROM users WHERE username = '${newUsername}'
    `);
    if (existsResult.recordset.length > 0) {
      return res.send({ code: 400, message: '新用户名已被使用' });
    }
    // 修改用户名
    await sql.query(`
      UPDATE users SET username = '${newUsername}' WHERE username = '${oldUsername}'
    `);
    res.send({ code: 200, message: '用户名修改成功' });
  } catch (err) {
    console.error('修改用户名接口错误:', err);
    res.send({ code: 500, message: '修改用户名失败' });
  }
});

// 启动服务器：先连数据库，再启动服务
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 后端服务已启动，地址：http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ 启动失败，数据库连接异常:', err);
  });