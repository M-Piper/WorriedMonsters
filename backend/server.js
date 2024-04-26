import express from "express";
import bodyParser from "body-parser";
import setupEndpoints from "./endpoints.js"; // Import endpoint setup function
import { connection, startDatabase } from "./database.js";
import cors from "cors";

// Create an Express application
const app = express();
const PORT = process.env.PORT || 5000;

// // Define CORS options
// const corsOptions = {
//     origin: 'https://worriedmonsters.com',
//     credentials: true,
//     methods: ['GET', 'POST', 'DELETE'], // Add other methods you're using
//     allowedHeaders: '*',
// };
//
// // Enable CORS using the defined options
// app.use(cors(corsOptions));

// Handle preflight requests
//app.options('*', cors(corsOptions));
app.use(cors());
console.log("test");
// Use middleware to parse incoming request bodies
// Increase the limit to 50MB (or any desired limit)
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Initialize database connection and start server
startDatabase()
  .then(() => {
    // Set up endpoints after database connection is established
    setupEndpoints(app);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error starting server:", err);
  });
