import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
// import { useConversation } from '../zustant/useConversation';
import useGetConversations from '../Hooks/useGetConversations';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setSelectedConversation } from '../store/ConversationSlice';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  // const { setSelectedConversation } = useConversation();
  const dispatch = useDispatch();
  const { conversations } = useGetConversations();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase()),
    );
    if (conversation) {
      dispatch(setSelectedConversation(conversation));
      setSearch('');
    } else {
      toast.error(`No such user found with ${search}`, { duration: 1000 });
      setSearch('');
    }
  };

  return (
    <>
      <form className="flex items-center gap-2 " onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered rounded-full bg-slate-100 text-black font-semibold"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-circle bg-[#b8a14f] border-white text-white"
          aria-label="Search"
        >
          <IoSearchSharp className="w-6 h-6 outline-none" />
        </button>
      </form>
    </>
  );
};

export default SearchInput;
