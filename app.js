const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require("./routes/auth");
const listRoutes = require("./routes/list");
const path = require("path");

require("./database/db");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());



app.use("/api/auth", authRoutes);
app.use("/api/list",listRoutes);

app.get("/", (req,res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "build")));
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.listen(PORT,()=>{
    console.log(`server is running successfully on ${PORT}`);
})


