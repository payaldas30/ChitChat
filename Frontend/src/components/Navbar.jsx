import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon,Ship, LogOutIcon} from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-100/80 backdrop-blur-md border-b border-base-300/50 sticky top-0 z-50 h-16 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between w-full h-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="flex-none">
              <Link 
                to="/" 
                className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
              >
                <div className="p-1.5 bg-primary/10 rounded-xl">
                  <Ship className="size-8 text-primary" />
                </div>
                <span className="text-2xl font-bold font-mono bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent tracking-wide">
                  ChitChat
                </span>
              </Link>
            </div>
          )}

          {/* RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Notifications */}
            <div className="tooltip tooltip-bottom" data-tip="Notifications">
              <Link to="/notifications">
                <button className="btn btn-ghost btn-sm btn-circle hover:bg-base-200 transition-colors duration-200">
                  <BellIcon className="h-5 w-5 text-base-content/70 hover:text-base-content transition-colors" />
                </button>
              </Link>
            </div>

            {/* Theme Selector */}
            <div className="flex items-center">
              <ThemeSelector />
            </div>

            {/* User Avatar */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:bg-base-200 transition-colors duration-200">
                <div className="w-8 rounded-full ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-200">
                  <img 
                    src={authUser?.profilePic} 
                    alt="User Avatar" 
                    className="rounded-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Logout button */}
            <div className="tooltip tooltip-bottom" data-tip="Logout">
              <button 
                className="btn btn-ghost btn-sm btn-circle hover:bg-error/10 hover:text-error group transition-all duration-200" 
                onClick={logoutMutation}
              >
                <LogOutIcon className="h-5 w-5 text-base-content/70 group-hover:text-error transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;