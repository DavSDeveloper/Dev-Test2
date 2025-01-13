import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ImExit } from "react-icons/im";

const Header = () => {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <header className="flex items-center justify-between w-full h-20 border-b-4 border-b-blue-400 bg-gradient-to-r from-slate-100 via-blue-200 to-slate-100">
      <a
        onClick={() => navigate("/companies")}
        className="ml-10 text-2xl font-extrabold font-mono tracking-widest select-none cursor-pointer"
      >
        <span className="text-blue-500">i</span>
        <span className="text-blue-600">A</span>
        <span className="text-blue-700">2</span>
      </a>
      <nav className="flex mr-10 gap-10">
        <a onClick={() => navigate("/companies")} className="bg-blue-500 text-white rounded-md py-3 px-5 hover:bg-blue-700 duration-300 cursor-pointer">
          Companies
        </a>
        <a onClick={handleLogout} className="flex items-center text-2xl cursor-pointer">
          <ImExit className="h-6 text-blue-400 hover:text-blue-700 duration-300" />
        </a>
      </nav>
    </header>
  );
};

export default Header;
