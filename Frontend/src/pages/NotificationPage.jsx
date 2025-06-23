import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";
import { useStarBackground } from "../utils/StarBackground";
import { useRef, useEffect } from "react";

const NotificationPage = () => {
  const queryClient = useQueryClient();
  const canvasRef = useRef(null);
  const { initStarBackground, destroyStarBackground } = useStarBackground(canvasRef, {
    starCount: 300,
    starSpeed: 0.5,
    starSize: 1.5,
    twinkleSpeed: 0.015,
    shootingStarChance: 0.001,
    colors: ['#ffffff', '#e0e7ff', '#ddd6fe', '#fce7f3', '#ecfdf5']
  });

  useEffect(() => {
    initStarBackground();
    return () => destroyStarBackground();
  }, [initStarBackground, destroyStarBackground]);

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Star Background */}
      <canvas
        ref={canvasRef}
        className="fixed  w-full h-full pointer-events-none z-0"
        style={{ background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #2d1b69 100%)' }}
      />
      
      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-r from-primary/25 via-transparent to-secondary/60 pointer-events-none z-1" />
      
      {/* Content */}
      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto max-w-4xl space-y-8">
          {/* Enhanced Header */}
          <div className="text-center space-y-4 py-6 sm:py-8 px-4">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
              <div className="p-2 sm:p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
                <BellIcon className="size-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
              </div>
              {/* <SparklesIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 animate-pulse" /> */}
            </div>
            {/* <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2 leading-tight">
              Notifications
            </h1> */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-mono bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent tracking-wide">
              Notifications
            </h1>
            <p className="text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto px-4">
              Stay connected with your language learning community
            </p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-20">
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-3 sm:border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 border-3 sm:border-4 border-pink-400/20 border-b-pink-400 rounded-full animate-spin animation-delay-150"></div>
              </div>
              <p className="text-gray-300 mt-4 animate-pulse text-sm sm:text-base text-center px-4">Loading your notifications...</p>
            </div>
          ) : (
            <>
              {incomingRequests.length > 0 && (
                <section className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-2">
                    <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 sm:gap-3 text-white">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
                        <UserCheckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <span className="text-lg sm:text-2xl">Friend Requests</span>
                      <span className="px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                        {incomingRequests.length}
                      </span>
                    </h2>
                  </div>

                  <div className="grid gap-3 sm:gap-4">
                    {incomingRequests.map((request, index) => (
                      <div
                        key={request._id}
                        className="group relative overflow-hidden rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] sm:hover:scale-[1.02] hover:bg-white/15"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {/* Gradient Border Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="relative p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                              <div className="relative flex-shrink-0">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-0.5 shadow-lg">
                                  <img 
                                    src={request.sender.profilePic} 
                                    alt={request.sender.fullName}
                                    className="w-full h-full rounded-full object-cover"
                                  />
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                              </div>
                              <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
                                <h3 className="text-lg sm:text-xl font-bold text-white truncate">{request.sender.fullName}</h3>
                                <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                                  <span className="px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-xs sm:text-sm font-medium shadow-lg text-center">
                                    Native: {request.sender.nativeLanguage}
                                  </span>
                                  <span className="px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-xs sm:text-sm font-medium shadow-lg text-center">
                                    Learning: {request.sender.learningLanguage}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <button
                              className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none text-sm sm:text-base"
                              onClick={() => acceptRequestMutation(request._id)}
                              disabled={isPending}
                            >
                              {isPending ? (
                                <div className="flex items-center justify-center gap-2">
                                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                  <span className="hidden sm:inline">Accepting...</span>
                                  <span className="sm:hidden">...</span>
                                </div>
                              ) : (
                                "Accept"
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ACCEPTED REQS NOTIFICATIONS */}
              {acceptedRequests.length > 0 && (
                <section className="space-y-4 sm:space-y-6">
                  <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 sm:gap-3 text-white px-2">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg">
                      <BellIcon className="size-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <span className="text-lg  text-gray-300 sm:text-2xl">New Connections</span>
                  </h2>

                  <div className="grid gap-3 sm:gap-4">
                    {acceptedRequests.map((notification, index) => (
                      <div 
                        key={notification._id} 
                        className="group relative overflow-hidden rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] sm:hover:scale-[1.02] hover:bg-white/15"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {/* Success Gradient Border */}
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="relative p-4 sm:p-6">
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div className="relative mt-1 flex-shrink-0">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 p-0.5 shadow-lg">
                                <img
                                  src={notification.recipient.profilePic}
                                  alt={notification.recipient.fullName}
                                  className="w-full h-full rounded-full object-cover"
                                />
                              </div>
                              <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                                <MessageSquareIcon className="h-1.5 w-1.5 sm:h-2 sm:w-2 text-white" />
                              </div>
                            </div>
                            
                            <div className="flex-1 space-y-1 sm:space-y-2 min-w-0">
                              <h3 className="text-base sm:text-lg font-bold text-white truncate">{notification.recipient.fullName}</h3>
                              <p className="text-sm sm:text-base text-gray-300 break-words">
                                {notification.recipient.fullName} accepted your friend request
                              </p>
                              <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-400">
                                <ClockIcon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                <span>Recently</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-xs sm:text-sm font-semibold shadow-lg flex-shrink-0">
                              <MessageSquareIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span className="hidden sm:inline">New Friend</span>
                              <span className="sm:hidden">Friend</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
                <div className="py-12 sm:py-20">
                  <NoNotificationsFound />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;