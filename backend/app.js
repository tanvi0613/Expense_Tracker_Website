require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const errorHandler = require('./middlewares/errorHandlerMiddleware');
const categoryRouter = require('./routes/categoryRouter');
const transactionRouter = require('./routes/transactionRoutes');

const app = express();


mongoose.connect(process.env.MONGODB_URI).then(() => console.log('DB connected')).catch((e) => console.log(e));

//cors config
const corsOptions = {
    origin : process.env.CORS_ORIGIN
}
app.use(cors(corsOptions));

//MIDDLEWARES
app.use(express.json())  //pass incoming data

//ROUTES
app.use('/api/v1/users',userRouter);
app.use('/api/v1/categories',categoryRouter);
app.use('/api/v1/transactions',transactionRouter);

//ERROR
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT,() => 
    console.log(`Server is running on this port : ${PORT}`)
);