const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const mainRoutes = require('./routes/mainRoute');

mongoose.connect('mongodb://localhost:27017/employeeMonthDB', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(mainRoutes);

app.listen(5000, () => {
    console.log("Server is running");
});