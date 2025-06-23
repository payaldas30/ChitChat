import { BellIcon } from "lucide-react";

function NoNotificationsFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="size-16 rounded-full bg-base-300 flex items-center justify-center mb-4">
       <BellIcon className="size-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
      </div>
      <h3 className="text-lg text-gray-50 font-semibold mb-2">No notifications yet</h3>
      <p className="text-gray-50 opacity-70 max-w-md">
        When you receive friend requests or messages, they'll appear here.
      </p>
    </div>
  );
}

export default NoNotificationsFound;