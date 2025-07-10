const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.post('/convert', upload.single('video'), (req, res) => {
  const inputPath = req.file.path;
  const outputFileName = Date.now() + '.mp3';
  const outputPath = path.join('converted', outputFileName);

  ffmpeg(inputPath)
    .format('mp3')
    .on('end', () => {
      fs.unlinkSync(inputPath);
      res.json({ success: true, url: '/' + outputPath });
    })
    .on('error', (err) => {
      console.error(err);
      res.status(500).json({ success: false, message: 'Conversion failed' });
    })
    .save(outputPath);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
