const express = require('express');


const app = express();

app.get('/', (req, res) => {
    res.send('API is running...');
    });

const PORT = process.env.PORT || 5005;

app.listen(PORT, console.log(`Server running on port ${PORT}`));