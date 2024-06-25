import express from 'express';
import bodyParser from 'body-parser';
import inputRoutes from './routes/input.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/input', inputRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
