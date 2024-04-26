import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import setupEndpoints from "./endpoints.js"; // Import endpoint setup function
import { connection, startDatabase } from "./database.js";

// Create an Express application
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());


app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req, res) => {
  res.send("hello world");
});

// Initialize database connection and start server
startDatabase()/
.then(() => {
// Set up endpoints after database connection is established
setupEndpoints(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
})
.catch(err => {
    console.error('Error starting server:', err);
});
