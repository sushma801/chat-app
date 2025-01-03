import { extractTime } from '../utils/extractTime';
import { useSelector } from 'react-redux';

const Message = ({ message }) => {
  // const { authUser } = useAuthContext();
  // const { selectedConversation } = useConversation();
  const authUser = useSelector((state) => state.conversationUsers.loggedInUser);
  const selectedConversation = useSelector((state) => state.conversation.selectedConversation);
  // eslint-disable-next-line react/prop-types
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? 'bg-[#9a92de] text-white' : 'bg-slate-200 text-black';
  const shakeClass = message.shouldShake ? 'shake' : '';
  const formattedTime = extractTime(message.createdAt);
  return (
    <div className={`chat ${chatClassName} `}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="chat bubble" />
        </div>
      </div>
      <div className={`chat-bubble  ${bubbleBgColor} ${shakeClass}`}>{message.message}</div>
      <div className={`chat-footer opacity-50 text-xs flex gap-1 items-center`}>
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
