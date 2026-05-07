const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const testRoutes = require("./routes/testRoutes");
const leadRoutes = require("./routes/leadRoutes");
const noteRoutes = require("./routes/noteRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const sequelize = require("./config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
    res.send("CRM Backend Running");
});

sequelize.sync()
    .then(() => {
        console.log("Database Synced");
    });

sequelize.authenticate()
    .then(() => {
        console.log("Supabase PostgreSQL Connected");
    })
    .catch((err) => {
        console.log("Database Error:", err);
    });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});