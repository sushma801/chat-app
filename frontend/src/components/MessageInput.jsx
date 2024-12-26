import { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import useSendMessage from '../Hooks/useSendMessage';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage('');
  };
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-slate-100 border-slate-100 text-black"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="absolute inset-y-0 end-0 flex item-center p-2 text-black">
          <BsSend className="h-6 w-6 " />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
