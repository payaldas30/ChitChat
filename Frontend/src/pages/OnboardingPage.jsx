import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { Loader, MapPin, Ship, Shuffle, Camera } from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl shadow-xl rounded-xl border border-purple-200">
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Ship className="size-10 text-purple-600" />
              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-violet-600 tracking-wider">
                ChitChat
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
            <p className="text-gray-600">Set up your profile to start connecting with language partners</p>
          </div>

          <div className="space-y-6">
            {/* PROFILE PIC CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* IMAGE PREVIEW */}
              <div className="size-32 rounded-full bg-gray-100 overflow-hidden border-4 border-purple-200 shadow-lg">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gradient-to-br from-purple-100 to-purple-200">
                    <Camera className="size-12 text-purple-400" />
                  </div>
                )}
              </div>

              {/* Generate Random Avatar BTN */}
              <button 
                type="button" 
                onClick={handleRandomAvatar} 
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-lg hover:from-purple-600 hover:to-violet-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Shuffle className="size-4" />
                Generate Random Avatar
              </button>
            </div>

            <div onSubmit={handleSubmit} className="space-y-6">
              {/* FULL NAME */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formState.fullName}
                  onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>

              {/* BIO */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formState.bio}
                  onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent h-24 resize-none"
                  placeholder="Tell others about yourself and your language learning goals"
                />
              </div>

              {/* LANGUAGES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* NATIVE LANGUAGE */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-black">
                    Native Language
                  </label>
                  <select
                    name="nativeLanguage"
                    value={formState.nativeLanguage}
                    onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
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
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-black">
                    Learning Language
                  </label>
                  <select
                    name="learningLanguage"
                    value={formState.learningLanguage}
                    onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
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
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={formState.location}
                    onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                    className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button 
                className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white disabled:from-purple-400 disabled:to-violet-400 shadow-md hover:shadow-lg" 
                disabled={isPending} 
                onClick={handleSubmit}
                type="submit"
              >
                {!isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <Ship className="size-5" />
                    Complete Onboarding
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Loader className="animate-spin size-5" />
                    Onboarding...
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;