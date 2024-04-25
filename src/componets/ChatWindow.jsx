import  { useState } from 'react';
import axios from 'axios';

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const apiEndpoint = 'http://34.66.188.96:5000/slack/generate'; 

  const submitData = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let response;
      if (apiEndpoint) {
        response = await axios.post(apiEndpoint, {
          prompt: inputText,
        });
      } else {
        const loremIpsum = await fetch('https://www.lipsum.com');
        response = { data: { message: await loremIpsum.text() } };
      }

      const newMessage = { text: response.data.message, sender: 'chatbox' };
      setMessages([...messages, newMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages([...messages, { text: 'There was an error processing your request.', sender: 'chatbox' }]);
    } finally {
      setInputText('');
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-window">
        <h2>Hello Shreyas</h2>
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form className="input-container" onSubmit={submitData}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="How can I help you?"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;
