import express from "express"; // Import the Express framework for building web applications
import cors from "cors"; // Import CORS to enable cross-origin requests
import bodyParser from "body-parser"; // Import body-parser to handle incoming request bodies
import dotenv from "dotenv"; // Import dotenv to manage environment variables
import connectDB from "./SRC/Database/db.js"; // Import the database connection function
import router from "./SRC/routes/index.js"; // Import routes

// Load environment variables from .env file
dotenv.config();

const app = express(); // Initialize an Express application

// Enable CORS for all routes, allowing requests from any origin
app.use(cors({ origin: '*' }));

// Middleware to parse incoming JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up API routes under the '/api/v1' path
app.use('/api/v1', router);

// Function to start the application server
const startApp = async () => {
    const PORT = process.env.PORT; // Get the port number from environment variables
    connectDB(); // Connect to the database
    try {
        // Start listening on the specified port
        app.listen(PORT, () => {
            console.log(`connect_verse running on http://localhost:${PORT}`);
        });
    } catch (error) {
        // Log any errors that occur during server startup
        console.log(error);
    }
};

// Start the application
startApp();

// Route to handle root requests and send a response indicating the API is running
app.get("/", (req, res) => {
    res.send('API IS RUNNING');
});
