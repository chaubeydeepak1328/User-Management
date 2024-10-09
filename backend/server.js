const express = require('express');
const dotenv = require("dotenv");
const connectDB = require('./config/db')
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require('./router/userRouter');
const colors = require("colors");
const path = require("path");

dotenv.config();
connectDB();



// here i used the middle where it helps me to get the access the json data format
const app = express();
app.use(bodyParser.json());
app.use(cors());

// this Route for user
app.use('/api/user', userRoute);



// For Deployment it basicalyimplement server site routing

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend', 'build')));

    // Catch-all route to serve the React app
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}


// Error Handling Middleware (Optional)
app.use((err, req, res, next) => {
    console.error(err.stack.red);
    res.status(500).send({ message: "Internal Server Error" });
});


const PORT = process.env.PORT || 5000;// Default to port 5000 if not defined

app.listen(PORT, console.log(`Server Started on PORT ${PORT}`.yellow.bold));
