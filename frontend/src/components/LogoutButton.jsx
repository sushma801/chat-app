import { BiLogOut } from 'react-icons/bi';
import useLogout from '../Hooks/useLogout';

const LogoutButton = () => {
  const { logout } = useLogout();
  return (
    <button className="logoutBtn mt-auto" onClick={logout} aria-label="Logout Button">
      <BiLogOut className="w-6 h-6 text-white cursor-pointer" />
    </button>
  );
};

export default LogoutButton;
