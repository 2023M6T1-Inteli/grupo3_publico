import express from "express"; // Express framework for building web applications
import cors from "cors"; // Middleware to enable Cross-Origin Resource Sharing
import uploadRouter from "./routes/upload.js"; // Router for handling upload routes
import algorithmRouter from "./routes/algorithm.js"; // Router for handling algorithm routes
import Middleware from "./middleware/middleware.js"; // Custom middleware
import multer from "multer"; // Middleware for handling file uploads
import connectDB from "./config/database.js"; // Function to connect to the database
import machinesRouter from "./routes/machines.js"; // Router for handling machine routes
import uploadServices from "./services/uploadServices.js"; // Custom upload services
import axios from "axios"; // HTTP client for making requests

// Connecting to the database
connectDB();

// Creating an instance of the Express application
const app = express();

// Setting up multer for file uploads
const upload = multer({ storage: uploadServices.storageMulter() });

// Parsing request bodies as JSON
app.use(express.json());

// Enabling Cross-Origin Resource Sharing
app.use(cors());

// Setting up routes
app.use('/machines', machinesRouter);
app.use('/upload', uploadRouter);
app.use('/algorithm', algorithmRouter);

// Setting the port for the server to listen on
const port = process.env.PORT || 3001;

// Starting the server
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
