console.log('============ user2.js =============');

// 객체 할당시 주소가 변경되므로 module.exports와 exports가 달라짐
// 유지하려면 아래와 같이 할당해야 함
// module.exports.name = 'ksh';
// module.exports.group = () => '가족';
module.exports = {
  group: () => '가족',
  name: 'ksh',
};

// 따라서 exports는 무시됨
exports.name = 'SangHun';
console.log(exports);

console.log('module.exports : ');
console.log(module.exports);
