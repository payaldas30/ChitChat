import { useState, useEffect, useRef } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { Loader, MapPin, Ship, Shuffle, Camera } from "lucide-react";
import { LANGUAGES } from "../constants";
import { useStarBackground } from "../utils/StarBackground"; 

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const canvasRef = useRef(null);
  const { initStarBackground, destroyStarBackground } = useStarBackground(canvasRef, {
    starCount: 150,
    starSpeed: 0.3,
    starSize: 1.5,
    twinkleSpeed: 0.02,
    shootingStarChance: 0.002,
    colors: ['#ffffff', '#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8']
  });

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  // Initialize star background on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      initStarBackground();
    }, 100);

    return () => {
      clearTimeout(timer);
      destroyStarBackground();
    };
  }, [initStarBackground, destroyStarBackground]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 text-gray-600">
      {/* Animated Star Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      />

       {/* Gradient Overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-purple-900/90"></div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-yellow-300/80 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-1/12 w-1.5 h-1.5 bg-blue-300/70 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-purple-300/60 rounded-full animate-ping"></div>
        <div className="absolute top-1/6 right-1/6 w-1 h-1 bg-pink-300/70 rounded-full animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative bg-white/95 backdrop-blur-xl w-full max-w-4xl shadow-2xl rounded-3xl border border-white/30 overflow-hidden">
        {/* Gradient header overlay */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-purple-500/10 via-violet-500/5 to-transparent"></div>
        
        <div className="relative p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative group">
                <Ship className="size-14 text-purple-600 drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              </div>
              <span className="text-5xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 tracking-wider drop-shadow-sm">
                ChitChat
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 drop-shadow-sm">
              Complete Your Profile
            </h1>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed mb-4">
              Set up your profile to start connecting with language partners around the world
            </p>
            {/* <div className="flex items-center justify-center gap-3 text-purple-600">
              <Globe className="size-5 animate-spin" style={{ animationDuration: '10s' }} />
              <span className="text-base font-semibold">Join our global community</span>
              <Languages className="size-5" />
            </div> */}
          </div>

          <div className="space-y-10">
            {/* PROFILE PIC CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-6">
              {/* IMAGE PREVIEW */}
              <div className="relative group">
                <div className="size-40 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden border-4 border-white shadow-2xl ring-4 ring-purple-300/40 group-hover:ring-purple-400/60 transition-all duration-300">
                  {formState.profilePic ? (
                    <img
                      src={formState.profilePic}
                      alt="Profile Preview"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-purple-200 to-pink-200 group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
                      <Camera className="size-16 text-purple-500 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  )}
                </div>
                {/* Decorative animated rings */}
                <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-pulse"></div>
                <div className="absolute inset-0 rounded-full border border-pink-400/20 animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>

              {/* Generate Random Avatar BTN */}
              <button 
                type="button" 
                onClick={handleRandomAvatar} 
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-white rounded-2xl hover:from-purple-600 hover:via-violet-600 hover:to-pink-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 font-semibold text-lg group"
              >
                <Shuffle className="size-6 group-hover:rotate-180 transition-transform duration-300" />
                Generate Random Avatar
                {/* <Sparkles className="size-5 animate-pulse group-hover:animate-spin" /> */}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* FULL NAME */}
              <div className="space-y-3">
                <label className="text-base font-semibold text-gray-800 flex items-center gap-3">
                  <span className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></span>
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formState.fullName}
                  onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl font-medium text-lg placeholder-gray-400"
                  placeholder="Enter your full name"
                />
              </div>

              {/* BIO */}
              <div className="space-y-3">
                <label className="text-base font-semibold text-gray-800 flex items-center gap-3">
                  <span className="w-3 h-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full animate-pulse"></span>
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formState.bio}
                  onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl h-32 resize-none font-medium text-lg placeholder-gray-400"
                  placeholder="Tell others about yourself and your language learning goals..."
                />
              </div>

              {/* LANGUAGES */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* NATIVE LANGUAGE */}
                <div className="space-y-3">
                  <label className="text-base font-semibold text-gray-800 flex items-center gap-3">
                    <span className="w-3 h-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full animate-pulse"></span>
                    Native Language
                  </label>
                  <select
                    name="nativeLanguage"
                    value={formState.nativeLanguage}
                    onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl  font-medium text-lg"
                     placeholder="Select your native language"
                  >
                    <option value="">Select your native language</option>
                    {LANGUAGES.map((lang) => (
                      <option key={`native-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                {/* LEARNING LANGUAGE */}
                <div className="space-y-3">
                  <label className="text-base font-semibold text-gray-800 flex items-center gap-3">
                    <span className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></span>
                    Learning Language
                  </label>
                  <select
                    name="learningLanguage"
                    value={formState.learningLanguage}
                    onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl font-medium text-lg"
                  >
                    <option value="">Select language you're learning</option>
                    {LANGUAGES.map((lang) => (
                      <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* LOCATION */}
              <div className="space-y-3">
                <label className="text-base font-semibold text-gray-800 flex items-center gap-3">
                  <span className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"/>
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute top-1/2 transform -translate-y-1/2 left-5 size-6 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={formState.location}
                    onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                    className="w-full px-5 py-4 pl-14 border-2 border-gray-200 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl font-medium text-lg placeholder-gray-400"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button 
                className="w-full py-5 px-6 rounded-2xl font-bold text-xl transition-all duration-300 disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 hover:from-purple-700 hover:via-violet-700 hover:to-pink-700 text-white disabled:from-purple-400 disabled:via-violet-400 disabled:to-pink-400 shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] disabled:hover:scale-100 group" 
                disabled={isPending} 
                onClick={handleSubmit}
                type="submit"
              >
                {!isPending ? (
                  <div className="flex items-center justify-center gap-3">
                    {/* <Ship className="size-6 group-hover:animate-bounce" /> */}
                    Complete Onboarding
                    {/* <Sparkles className="size-6 group-hover:animate-spin" /> */}
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <Loader className="animate-spin size-6" />
                    Setting up your profile...
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;