const express = require("express");
const UserRouter = require("./routes/authrouter");
const ProductRouter = require("./routes/productRouter");
const CategoryRouter = require("./routes/categoryrouter");

const cors = require("cors");

const app = express();
// So below configrtion is required for this error "Cannot set headers after they are sent to the client"
const allowedOrigins = ['*'];
    app.use(cors({
        origin: function (origin, callback) {
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }

    }))
// *****************************Above
// app.use(middeleware());
app.use(express.json());
app.use('/api/v1/product', ProductRouter);
app.use('/api/v1/users', UserRouter);
app.use('/api/product', CategoryRouter);


module.exports = app;