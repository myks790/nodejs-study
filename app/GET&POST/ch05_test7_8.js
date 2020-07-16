const http = require('http');

// get test
const getOptions = {
  host: 'www.google.com',
  port: 80,
  path: '/',
};

const req = http.get(getOptions, (res) => {
  let resData = '';
  res.on('data', (chunk) => { resData += chunk; });
  res.on('end', () => { console.log(resData); });
});

req.on('error', (err) => {
  console.log(`오류발생 : ${err.message}`);
});

// post test
const postData = 'post echo test';
const postOptions = {
  host: 'postman-echo.com',
  port: 80,
  path: '/post',
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain',
    'Content-Length': postData.length,
  },
};

const postReq = http.request(postOptions, (res) => {
  let resData = '';
  res.on('data', (chunk) => { resData += chunk; });
  res.on('end', () => { console.log(`\n\npost 결과 : ${resData}`); });
});

postReq.on('error', (err) => {
  console.log(`오류발생 : ${err.message}`);
});

postReq.write(postData);
postReq.end();
