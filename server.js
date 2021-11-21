const express = require('express');
const app = express();
const PORT = process.env.PORT | 3000;

app.use(express.static('./build/'));

app.get('/*', (req,res) => {
    res.sendFile('index.html')
})

app.listen(PORT, () => {
    console.log(`App in running on ${PORT}`)
})