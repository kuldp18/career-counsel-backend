require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

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

// port
const port = process.env.PORT || 8888;

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
