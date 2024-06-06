const express = require('express'); 
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001; // local host port

const app = express();

app.use(bodyParser.json()); // body parser so the request json can be read

const msgs = []; // stores the messages while application is running

// GET endpoint to get a test string
app.get("/api", (req, res) => {
    res.json({ message: "hello from within the code!"});
});

// POST endpoint that recieves new messages
app.post("/message",  (req, res) => {
    const messageText = req.body.message

    // Validate the request JSON
    if (!messageText) {
        res.send("Error: Incorrect JSON format -> Check message exists and is not empty")
    } else {
        msgs.push(messageText); // Adds the new message to the msgs array

        // Sends response with the message
        console.log(messageText);
        res.json({"Message Recieved" : messageText});
    }
})


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});