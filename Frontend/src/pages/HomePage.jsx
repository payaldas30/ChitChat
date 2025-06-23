import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, useRef } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import { 
  CheckCircleIcon, 
  MapPinIcon, 
  UserPlusIcon, 
  UsersIcon,
  SparklesIcon,
  HeartIcon,
  GlobeIcon
} from "lucide-react";

import { capitialize } from "../lib/utils";

import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import { useStarBackground } from "../utils/StarBackground";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());
  const canvasRef = useRef(null);

  // Initialize star background
  const { initStarBackground, destroyStarBackground } = useStarBackground(canvasRef, {
    starCount: 400,
    starSpeed: 0.3,
    starSize: 1.8,
    twinkleSpeed: 0.015,
    shootingStarChance: 0.003,
    colors: ['#ffffff', '#e0e7ff', '#fef3c7', '#fecaca', '#d1fae5', '#f3e8ff']
  });

  useEffect(() => {
    initStarBackground();
    return () => destroyStarBackground();
  }, []);

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Star Background */}
      <canvas
        ref={canvasRef}
        className="fixed w-full h-full pointer-events-none z-0"
        style={{ background: 'linear-gradient(135deg, #0c1426 0%, #1e293b 30%, #334155 60%, #475569 100%)' }}
      />
      <div className="fixed inset-0 bg-gradient-to-r from-primary/25 via-transparent to-secondary/60 pointer-events-none z-1" />
      {/* Content Overlay */}
      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto space-y-12">
          
          {/* Friends Section */}
          <section className="space-y-8">
            {/* Header with Glassmorphism */}
            <div className="backdrop-blur-md bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-primary/25  to-secondary/60 backdrop-blur-sm">
                    <UsersIcon className="size-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-bold  tracking-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      Your Friends
                    </h2>
                    <p className="text-white/70 mt-1">
                      {friends.length} language partner{friends.length !== 1 ? 's' : ''} connected
                    </p>
                  </div>
                </div>
                
                <Link 
                  to="/notifications" 
                  className="btn bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary border-none text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <HeartIcon className="mr-2 size-4" />
                  Friend Requests
                </Link>
              </div>
            </div>

            {/* Friends Content */}
            {loadingFriends ? (
              <div className="flex justify-center py-16">
                <div className="relative">
                  <div className="loading loading-spinner loading-lg text-white"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-xl"></div>
                </div>
              </div>
            ) : friends.length === 0 ? (
              <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl">
                <NoFriendsFound />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {friends.map((friend) => (
                  <div key={friend._id} className="transform transition-all duration-300 hover:scale-105">
                    <div className="backdrop-blur-md bg-white/10 hover:bg-white/20 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                      <FriendCard friend={friend} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Recommended Users Section */}
          <section className="space-y-8">
            {/* Section Header */}
            <div className="backdrop-blur-md bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm">
                    <GlobeIcon className="size-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-bold  tracking-tight bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                      Meet New Learners
                    </h2>
                    <p className="text-white/70 mt-1 max-w-md">
                      Discover perfect language exchange partners based on your profile
                    </p>
                  </div>
                </div>
                
                {/* <div className="flex items-center gap-2 text-white/60">
                  <SparklesIcon className="size-5 text-yellow-400" />
                  <span className="text-sm font-medium">AI Matched</span>
                </div> */}
              </div>
            </div>

            {/* Recommended Users Content */}
            {loadingUsers ? (
              <div className="flex justify-center py-16">
                <div className="relative">
                  <div className="loading loading-spinner loading-lg text-white"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/30 to-teal-500/30 blur-xl"></div>
                </div>
              </div>
            ) : recommendedUsers.length === 0 ? (
              <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl p-8 text-center">
                <div className="space-y-6">
                  <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                    <GlobeIcon className="size-10 text-white/70" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-white mb-2">No recommendations available</h3>
                    <p className="text-white/70 max-w-md mx-auto">
                      Check back later for new language partners!
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendedUsers.map((user) => {
                  const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                  return (
                    <div
                      key={user._id}
                      className="group backdrop-blur-md bg-white/10 hover:bg-white/20 rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                    >
                      <div className="p-6 space-y-6">
                        
                        {/* User Header */}
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="avatar size-18 rounded-full ring-2 ring-white/30 ring-offset-4 ring-offset-transparent group-hover:ring-white/50 transition-all duration-300">
                              <img src={user.profilePic} alt={user.fullName} className="rounded-full" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white/30 shadow-lg"></div>
                          </div>

                          <div className="flex-1">
                            <h3 className="font-bold text-xl text-white group-hover:text-white transition-colors">
                              {user.fullName}
                            </h3>
                            {user.location && (
                              <div className="flex items-center text-sm text-white/70 mt-1">
                                <MapPinIcon className="size-4 mr-1" />
                                {user.location}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Languages with Enhanced Styling */}
                        <div className="flex flex-wrap gap-3">
                          <span className="px-3 py-2 rounded-full bg-gradient-to-r from-primary/25 to-secondary/60 text-white text-sm font-medium shadow-lg border border-white/20">
                            {getLanguageFlag(user.nativeLanguage)}
                            Native: {capitialize(user.nativeLanguage)}
                          </span>
                          <span className="px-3 py-2 rounded-full bg-gradient-to-r from-secondary to-primary text-white text-sm font-medium shadow-lg border border-white/20">
                            {getLanguageFlag(user.learningLanguage)}
                            Learning: {capitialize(user.learningLanguage)}
                          </span>
                        </div>

                        {/* Bio with Enhanced Styling */}
                        {user.bio && (
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <p className="text-sm text-white/90 leading-relaxed">
                              {user.bio}
                            </p>
                          </div>
                        )}

                        {/* Enhanced Action Button */}
                        <button
                          className={`btn w-full py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                            hasRequestBeenSent 
                              ? "bg-gradient-to-r from-green-600/80 to-emerald-600/80 text-white border-none cursor-not-allowed" 
                              : "bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white border-none"
                          }`}
                          onClick={() => sendRequestMutation(user._id)}
                          disabled={hasRequestBeenSent || isPending}
                        >
                          {hasRequestBeenSent ? (
                            <>
                              <CheckCircleIcon className="size-5 mr-2" />
                              Request Sent
                            </>
                          ) : (
                            <>
                              <UserPlusIcon className="size-5 mr-2" />
                              Send Friend Request
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;