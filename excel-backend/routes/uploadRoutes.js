const express = require('express');
const multer = require('multer');
const path = require('path');
const XLSX = require('xlsx');
const fs = require('fs');

const router = express.Router();


const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});


const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.xls', '.xlsx'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only Excel files are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });


router.post('/upload', upload.single('excelFile'), (req, res) => {
  console.log('📦 File received by backend:', req.file);         
  console.log('📦 Body received by backend:', req.body);         
  console.log('🚩 Header Content-Type:', req.headers['content-type']);
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];

    if (!sheetName) {
      return res.status(400).json({ error: 'No sheets found in the Excel file' });
    }

    const sheet = workbook.Sheets[sheetName];
    const sheetData = XLSX.utils.sheet_to_json(sheet);

    if (!sheetData.length) {
      return res.status(400).json({ error: 'Excel sheet is empty or unreadable' });
    }

    
    fs.unlink(filePath, (err) => {
      if (err) console.error('⚠️ Failed to delete uploaded file:', err);
    });

    return res.status(200).json({
      message: 'File uploaded and parsed successfully',
      data: sheetData
    });
  } catch (err) {
    console.error('❌ Error during upload:', err);
    return res.status(500).json({ error: 'Failed to parse Excel file' });
  }
});

module.exports = router;
