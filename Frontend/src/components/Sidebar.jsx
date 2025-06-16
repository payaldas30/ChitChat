import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, Ship , HomeIcon, UsersIcon } from "lucide-react";


const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 bg-base-100/60 backdrop-blur-xl border-r border-base-300/50 hidden lg:flex flex-col h-screen sticky top-0 shadow-lg">
      {/* HEADER SECTION */}
      <div className="p-6 border-b border-base-300/50">
        <Link 
          to="/" 
          className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200 group"
        >
          <div className="p-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl group-hover:scale-105 transition-transform duration-200">
            <Ship className="size-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <span className="text-2xl font-bold font-mono bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent tracking-wide">
            ChitChat
          </span>
        </Link>
      </div>

      {/* NAVIGATION SECTION */}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-4 py-3 text-base transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${
            currentPath === "/" 
              ? "bg-primary/10 text-primary border-r-4 border-primary shadow-sm" 
              : "hover:bg-base-200"
          }`}
        >
          <HomeIcon className={`size-5 transition-colors duration-200 ${
            currentPath === "/" ? "text-primary" : "text-base-content/70"
          }`} />
          <span className="font-medium">Home</span>
        </Link>

        <Link
          to="/friends"
          className={`btn btn-ghost justify-start w-full gap-3 px-4 py-3 text-base transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${
            currentPath === "/friends" 
              ? "bg-primary/10 text-primary border-r-4 border-primary shadow-sm" 
              : "hover:bg-base-200"
          }`}
        >
          <UsersIcon className={`size-5 transition-colors duration-200 ${
            currentPath === "/friends" ? "text-primary" : "text-base-content/70"
          }`} />
          <span className="font-medium">Friends</span>
        </Link>

        <Link
          to="/notifications"
          className={`btn btn-ghost justify-start w-full gap-3 px-4 py-3 text-base transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${
            currentPath === "/notifications" 
              ? "bg-primary/10 text-primary border-r-4 border-primary shadow-sm" 
              : "hover:bg-base-200"
          }`}
        >
          <BellIcon className={`size-5 transition-colors duration-200 ${
            currentPath === "/notifications" ? "text-primary" : "text-base-content/70"
          }`} />
          <span className="font-medium">Notifications</span>
        </Link>
      </nav>

      {/* USER PROFILE SECTION */}
      <div className="p-4 border-t border-base-300/50 mt-auto bg-base-200/30 backdrop-blur-sm">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-base-100/50 hover:bg-base-100/80 transition-all duration-200 cursor-pointer group">
          <div className="avatar">
            <div className="w-12 rounded-full ring-2 ring-primary/30 group-hover:ring-primary/50 transition-all duration-200">
              <img 
                src={authUser?.profilePic} 
                alt="User Avatar" 
                className="rounded-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-base-content truncate">
              {authUser?.fullName}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <div className="relative">
                <span className="size-2 rounded-full bg-success inline-block animate-pulse" />
                <span className="absolute inset-0 size-2 rounded-full bg-success animate-ping opacity-75" />
              </div>
              <p className="text-xs text-success font-medium">Online</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;