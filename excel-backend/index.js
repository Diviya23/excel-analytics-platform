const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs');
const path = require('path');


const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
const authRoutes = require('./routes/authRoutes'); // ✅ move this up
const uploadRoutes = require('./routes/uploadRoutes');
const aiRoutes = require('./routes/aiRoutes');
const adminRoutes = require('./routes/adminRoutes');

const historyRoutes = require('./routes/historyRoutes');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use('/api/ai', aiRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/admin', adminRoutes);
// ✅ Register routes here (before DB connect)
app.use('/api/auth', authRoutes);
app.use('/api', uploadRoutes);


// Sample route
app.get('/', (req, res) => res.send('API is running'));

// ✅ Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log('✅ Server running at http://localhost:5000'));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
