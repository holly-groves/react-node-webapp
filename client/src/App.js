import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = React.useState([]);
  const [newMsg, setNewMessage] = useState('');

  React.useEffect(() => {
    fetchMessages();
  }, []);

  // Fetches the messages stored in the backend
  const fetchMessages = async () => {
    try {
      const res = await axios.get('/getMessages'); // GET api call
      setMessages(res.data);
    } catch (e) {
      console.error("Error: fetchMessages -> ", e);
    }
  };

  // Adds the message submitted to the messages stored in the backend
  const newSubmission = async (subEvent) => {
    subEvent.preventDefault()
    try {
      const response = await axios.post('/message', {message: newMsg}); // POST api call
      setMessages([...messages, response.data.message]);
      setNewMessage('');
    } catch (e) {
      console.error("Error: newSubmission -> error submitting message", e);
    }
    fetchMessages(); // Updates the list of messages

  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Message Board</h1>
        <h2>Add a new message below</h2>
        <form onSubmit={newSubmission}>
          <input
            type="text"
            value={newMsg}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Enter message here"/>
          <button type="submit">Submit</button>
        </form>
        <h2>Messages</h2>
        <p>
          {messages.map(message => (
            <p>{message}</p>
          ))}
        </p>
      </header>
    </div>
  );
}

export default App;
