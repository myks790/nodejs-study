console.log('============ user.js =============');

console.log('exports : ');
exports.group = () => '가족';
exports.name = 'ksh';
console.log(exports);

console.log('exports 가려짐');
exports = { name: 'SangHun' };
exports.group2 = () => '가족 아님';
console.log(exports);

console.log('module.exports : ');
console.log(module.exports);
