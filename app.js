require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// my routes
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');

// DB Connection
mongoose.set('strictQuery', true);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB CONNECTED successfully!');
  });

// global middlewares

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api', authRoutes);
app.use('/api', studentRoutes);

// port
const port = process.env.PORT || 8888;

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
