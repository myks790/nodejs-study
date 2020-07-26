const user = require('./user');

console.log('============ app.js =============');

console.log(`사용자 정보 : ${user.name},  ${user.group()}`);

console.log(module.children[0].exports);

const user2 = require('./user2');
