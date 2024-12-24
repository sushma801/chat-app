import Messages from './Messages';
import MessageInput from './MessageInput';
import { TiMessages } from 'react-icons/ti';

import { useSelector } from 'react-redux';

const NoChatSelected = () => {
  // const { authUser } = useAuthContext();
  const authUser = useSelector((state) => state.conversationUsers.loggedInUser);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-center px-4 sm:text-lg md:text-xl text-slate-100 font-semibold flex flex-col items-center gap-2">
        <p>Welcome {authUser?.fullName} </p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

const MessageContainer = () => {
  // const { selectedConversation, setSelectedConversation } = useConversation();
  // useEffect(() => {
  //   // cleanup function
  //   return () => setSelectedConversation(null);
  // }, [setSelectedConversation]);
  const selectedConversation = useSelector((state) => state.conversation.selectedConversation);
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-100 px-4 py-2 mb-2 flex gap-x-2 items-center">
            <span className="label-text">To:</span>
            <span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
