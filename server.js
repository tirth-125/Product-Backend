const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require("./model/userModel");
const Product = require("./model/productModel")
const ts = require("tslib");
const app = require('./app');
const AdminBro = require('admin-bro')
const AdminBroMongoose = require('@admin-bro/mongoose')
const AdminBroExpress = require('@admin-bro/express')

dotenv.config({ path: './config.env' });
mongoose.connect(process.env.CONN_STR,
    { useNewUrlParser: true })
    .then((conn) => {
        console.log("DataBase Successfully Connected");
    }).catch((Error) => {
        console.log("Something went wrong" + Error);
    })

AdminBro.registerAdapter(AdminBroMongoose)
const getAll = mongoose.models.User || mongoose.model('User', { name: String, email: String, number: Number ,password:String,otp : Number});

const AdminBroOptions = {
    resources: [getAll,Product],
}
const adminBro = new AdminBro(AdminBroOptions)
const router = AdminBroExpress.buildRouter(adminBro)
app.use(adminBro.options.rootPath, router)
const port = process.env.PORT || 3000;

app.listen(port,process.env.HOST, (req, res) => {
    console.log(`Server Started in ${process.env.HOST}:${port}`);
}); 