const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { authorRouter, bookRouter } = require('./routes/app');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/authors', authorRouter);

app.use('/api/books', bookRouter);

app.get('/', (req, res) => {
    res.send('Hola mundo API');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
