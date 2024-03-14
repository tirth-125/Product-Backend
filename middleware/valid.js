exports.validPaymemnt = async (req, res, next) => {
    paymentList = ["Transfer", "Visa", "Paypall", "Mastercard"];

    if (!paymentList.includes(req.body.paymentMethod)) {
        res.status(404).json({
            message: "This paymentMethod is  not Valid"
        });
    }
    next();
}

exports.validStatus = async (req, res, next) => {
    statusList = ["Shiped", "Processing", "Cancelled", "Delivered"];

    if (!statusList.includes(req.body.status)) {
        res.status(404).json({
            message: "This status is  not Valid"
        });
    }
    next();
}

// exports.cannotHeader = async (req, res, next) => {
//     const allowedOrigins = ['*'];
//     app.use(cors({
//         origin: function (origin, callback) {
//             if (!origin) {
//                 return callback(null, true);
//             }

//             if (allowedOrigins.includes(origin)) {
//                 const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//                 return callback(new Error(msg), false);
//             }
//             return callback(null, true);
//         }

//     }))
//     next();
// };