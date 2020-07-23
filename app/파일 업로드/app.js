const express = require('express');
const http = require('http');
const path = require('path');
const serveStatic = require('serve-static');
const multer = require('multer');

const app = express();

app.use('/', serveStatic(path.join(__dirname)));

app.use('/public', serveStatic(path.join(__dirname, 'public')));
app.use('/uploads', serveStatic(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    files: 10,
    fileSize: 1024 * 1024 * 1024,
  },
});

const router = express.Router();

router.route('/process/photo').post(upload.array('photo', 2), (req, res) => {
  console.log('/process/photo 호출됨');
  try {
    const { files } = req;

    let originalname = '';
    let filename = '';
    let mimetype = '';
    let size = 0;

    if (Array.isArray(files)) {
      console.log('배열에 들어있는 파일 갯수 : %d', files.length);
      for (let i = 0; i < files.length; i += 1) {
        originalname = files[i].originalname;
        filename = files[i].filename;
        mimetype = files[i].mimetype;
        size = files[i].size;
        console.log(`파일 정보 : ${originalname}, ${filename}, ${mimetype},  ${size}`);
      }
    }

    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf-8' });
    res.write('<h1>파일 업로드 성공</h1>');
    res.end();
  } catch (error) {
    console.dir(error.stack);
  }
});

app.use('/', router);

http.createServer(app).listen(3000);
