const express = require('express');
const app = express();
const path =  require('path');
const port = process.env.PORT || 8085;

// view engine setup
app.set('view engine', 'hbs');

// path setup for static js file
const static_path = path.join(__dirname, '../public');
app.use(express.static(static_path));


app.get('/', (req,res) => {
    res.render('index');
});

app.get('*', (req,res) => {
    res.status(404).send("File not found");
});

app.listen(port, ()=>{
    let host = process.env.host || "localhost";
    console.log(`Server is Running at http://${host}:${port}`);
});