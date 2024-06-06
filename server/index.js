// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
    res.json({ message: "hello from within the code!"});
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});