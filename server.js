const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require("./model/userModel");
const Product = require("./model/productModel")
const app = require('./app');


dotenv.config({ path: './config.env' });
mongoose.connect(process.env.CONN_STR,
    { useNewUrlParser: true })
    .then(() => {
        console.log("DataBase Successfully Connected");
    }).catch((Error) => {
        console.log("Something went wrong" + Error);
    })


const port = process.env.PORT || 3000;
app.listen(port,process.env.HOST, (req, res) => {
    console.log(`Server Started in ${process.env.HOST}:${port}`);
}); 