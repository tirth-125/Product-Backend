const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({path : './config.env'});
mongoose.connect(process.env.CONN_STR,
{useNewUrlParser: true})
.then((conn)=>{
        console.log("DataBase Successfully Connected");
}).catch((Error)=>{
    console.log("Something went wrong"+Error);
})


const port = process.env.port || 3000;
app.listen(port, (req, res) => {
    console.log(`Server listening on ${process.env.PORT}`);
}); 
