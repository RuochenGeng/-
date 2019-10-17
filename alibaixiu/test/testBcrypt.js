const bcrypt = require('bcrypt');

async function  getPassword(){
    const salt = await bcrypt.genSalt(10);
    // 使用盐对密码进行加密
    const password = await bcrypt.hash('123456', salt);
    console.log('password', password)
}

async function validPassword(){
    var password = "$2b$10$FRllcSy3hg0LFD2JqJt55OeD7xOTQjdg1gY7HfEtOQZZxycXql6R2"
    const validPassword = await bcrypt.compare('123456', password);
    console.log('validPassword', validPassword)
}

getPassword()
validPassword()
// console.log('validPassword', validPassword())