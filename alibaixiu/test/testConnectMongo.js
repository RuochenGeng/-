// 导入mongoose模块
const mongoose = require('mongoose');
// const url = 'mongodb://localhost:27017/alibaixiu';
const url = 'mongodb://itcast:itcast@132.232.216.199:27017/alibaixiu'
const options = { useNewUrlParser: true, useCreateIndex: true};
mongoose.connect(url, options).then(()=>{
    console.log('连接成功');
},()=>{
    console.log('连接失败');
})