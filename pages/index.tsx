import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('/api/chat', { message: input });
      const botMessage = { sender: 'bot', text: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Error. Try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-4 min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-xl w-full bg-white shadow-md p-6 rounded">
        <h1 className="text-2xl font-bold mb-4">VICTOREX AI</h1>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {messages.map((msg, i) => (
            <div key={i} className={`text-sm ${msg.sender === 'user' ? 'text-blue-600' : 'text-gray-700'}`}>
              <strong>{msg.sender === 'user' ? 'You' : 'VICTOREX AI'}:</strong> {msg.text}
            </div>
          ))}
          {loading && <div className="text-gray-400 text-sm">Typing...</div>}
        </div>
        <div className="mt-4 flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-grow border rounded px-3 py-2"
            placeholder="Type your message..."
          />
          <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
            Send
          </button>
        </div>
      </div>
    </main>
  );
    }
