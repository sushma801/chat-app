import React, { useEffect, useRef } from 'react';
import Message from './Message';
import useGetMessages from '../Hooks/useGetMessages';
import useListenMessages from '../Hooks/useListenMessages';

const MessageSkeleton = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar skeleton">
        <div className="w-10 rounded-full skeleton"></div>
      </div>
      <div className={`chat-bubble skeleton w-[50%] bg-slate-200`}></div>
    </div>
  );
};

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]);
  console.log({ loading });

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading ? (
        // [...Array(messages.length | 2)].map((index) => <MessageSkeleton key={index} />)
        Array.from({ length: Math.max(messages.length, 2) }).map((index) => (
          <MessageSkeleton key={index} />
        ))
      ) : messages?.length === 0 ? (
        <p className="text-center text-slate-100">Send a message to start conversation</p>
      ) : (
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))
      )}
    </div>
  );
};

export default Messages;
