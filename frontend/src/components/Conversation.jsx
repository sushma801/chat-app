import { useSocketContext } from '../context/SocketContext';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedConversation } from '../store/ConversationSlice';

const Conversation = ({ conversation, lastIdx }) => {
  // const { selectedConversation } = useConversation();
  const dispatch = useDispatch();
  const selectedConversations = useSelector((state) => state?.Conversation?.selectedConversation);
  const isSelected = selectedConversations?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  // useEffect(()=>{
  //   const selectedConversation = useSelector((state)=>state.conversation.selectedConversation);
  // },[selectedUserConversation])

  const handleSelectConversation = () => {
    // selectedUser(conversation);
    dispatch(setSelectedConversation(conversation));
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-[#b8a14f] rounded p-2 py-1 cursor-pointer ${
          isSelected ? 'bg-[#837bc7]' : ''
        }`}
        // onClick={() => setSelectedConversation(conversation)}
        onClick={handleSelectConversation}
      >
        <div className={`avatar ${isOnline ? 'online' : 'offline'}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200"> {conversation?.fullName}</p>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0"></div>}
    </>
  );
};

export default Conversation;
