import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = React.useState([]);
  const [newMsg, setNewMessage] = useState('');

  React.useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('/getMessages');
      setMessages(res.data);
    } catch (e) {
      console.error("Error: fetchMessages -> ", e);
    }
  };

  const newSubmission = async (subEvent) => {
    subEvent.preventDefault()
    try {
      const response = await axios.post('/message', {message: newMsg});
      setMessages([...messages, response.data.message]);
      setNewMessage('');
    } catch (e) {
      console.error("Error: newSubmission -> error submitting message", e);
    }
    fetchMessages();

  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Add a new message</h2>
        <form onSubmit={newSubmission}>
          <input
            type="text"
            value={newMsg}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Enter message here"/>
          <button type="submit">Submit</button>
        </form>
        <h2>See Messages Here!</h2>
        <ul style ={{listStyle:'none'}}>
          {messages.map(message => (
            <li>{message}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
