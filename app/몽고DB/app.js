const MongoClint = require('mongodb').MongoClient;

function testSearch(database) {
  const users = database.collection('users');
  users.find({ id: 'root', pw: '1234' }).toArray((err, docs) => {
    if (err) { throw err; }

    if (docs.length > 0) {
      console.log('id, pw 일치하는 사용자를 찾음');
    } else { console.log('못찾음'); }
  });
}

(function connectDB() {
  const dbUrl = 'mongodb://root:1234@localhost:9017';
  MongoClint.connect(dbUrl, (err, client) => {
    if (err) throw err;

    console.log(`데이터베이스에 연결되었습니다. :${dbUrl}`);
    testSearch(client.db('test_db'));
  });
}());
