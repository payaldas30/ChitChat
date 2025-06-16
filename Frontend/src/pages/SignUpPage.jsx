import { useState, useEffect, useRef } from "react";
import { Ship, User, Mail, Lock, Eye, EyeOff, Sparkles, Globe2, Users, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";
import { useStarBackground } from "../utils/StarBackground";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const canvasRef = useRef(null);

  // Initialize star background
  const { initStarBackground, destroyStarBackground } = useStarBackground(canvasRef, {
    starCount: 120,
    starSpeed: 0.2,
    starSize: 1.8,
    twinkleSpeed: 0.012,
    shootingStarChance: 0.0025,
    colors: ['#ffffff', '#f3e8ff', '#ddd6fe', '#c4b5fd', '#a78bfa']
  });

  useEffect(() => {
    initStarBackground();
    return () => destroyStarBackground();
  }, []);

  // Using the actual custom hook - maintaining original logic
  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Star Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #4c1d95 70%, #581c87 100%)' }}
      />
      
       {/* Gradient Overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-purple-900/90"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-ping delay-1000"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400/30 rounded-full animate-ping delay-2000"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-ping delay-3000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden hover:shadow-3xl transition-all duration-500">
            <div className="flex flex-col lg:flex-row min-h-[700px]">
              
              {/* SIGNUP FORM - LEFT SIDE */}
              <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center relative">
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-l-3xl"></div>
                
                <div className="relative z-10 w-full">
                  {/* ENHANCED LOGO */}
                  <div className="mb-8 flex items-center gap-3">
                    <div className="relative p-3 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Ship className="size-8 text-white drop-shadow-lg" />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-50 -z-10"></div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
                        ChitChat
                      </span>
                      <div className="flex items-center gap-1 mt-1">
                        <Sparkles className="size-3 text-yellow-400" />
                        <span className="text-xs text-white/70 font-medium">Connect Globally</span>
                      </div>
                    </div>
                  </div>

                  {/* ENHANCED ERROR MESSAGE */}
                  {error && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-2xl backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                        <span className="text-red-200 font-medium">
                          {error.response?.data?.message || "An error occurred"}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="w-full">
                    <div className="space-y-6">
                      {/* ENHANCED WELCOME TEXT */}
                      <div className="space-y-3">
                        <h2 className="text-3xl font-bold text-white tracking-tight">
                          Create an Account
                        </h2>
                        <p className="text-white/80 text-lg leading-relaxed">
                          Join ChitChat and start your amazing language learning adventure with thousands of learners worldwide!
                        </p>
                      </div>

                      <form onSubmit={handleSignup} className="space-y-5">
                        {/* ENHANCED FULLNAME INPUT */}
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-white/90 flex items-center gap-2">
                            <User className="size-4" />
                            Full Name
                          </label>
                          <div className="relative group">
                            <input
                              type="text"
                              placeholder="John Doe"
                              className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300 text-white placeholder-white/50 hover:bg-white/15 group-hover:border-white/30"
                              value={signupData.fullName}
                              onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                              required
                            />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                          </div>
                        </div>
                        
                        {/* ENHANCED EMAIL INPUT */}
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-white/90 flex items-center gap-2">
                            <Mail className="size-4" />
                            Email Address
                          </label>
                          <div className="relative group">
                            <input
                              type="email"
                              placeholder="john@gmail.com"
                              className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300 text-white placeholder-white/50 hover:bg-white/15 group-hover:border-white/30"
                              value={signupData.email}
                              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                              required
                            />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                          </div>
                        </div>
                        
                        {/* ENHANCED PASSWORD INPUT */}
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-white/90 flex items-center gap-2">
                            <Lock className="size-4" />
                            Password
                          </label>
                          <div className="relative group">
                            <input
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a strong password"
                              className="w-full px-4 py-4 pr-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300 text-white placeholder-white/50 hover:bg-white/15 group-hover:border-white/30"
                              value={signupData.password}
                              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/90 transition-colors p-1 rounded-lg hover:bg-white/10"
                            >
                              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                            </button>
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                          </div>
                          <p className="text-xs text-white/60 flex items-center gap-2">
                            <Shield className="size-3" />
                            Password must be at least 6 characters long
                          </p>
                        </div>

                        {/* ENHANCED TERMS CHECKBOX */}
                        <div className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                          <input 
                            type="checkbox" 
                            className="mt-1 w-4 h-4 text-violet-500 bg-white/20 border-white/30 rounded focus:ring-violet-400 focus:ring-2 accent-violet-500" 
                            required 
                          />
                          <span className="text-sm leading-tight text-white/80">
                            I agree to the{" "}
                            <span className="text-violet-400 hover:text-violet-300 hover:underline cursor-pointer transition-colors">
                              terms of service
                            </span>{" "}
                            and{" "}
                            <span className="text-violet-400 hover:text-violet-300 hover:underline cursor-pointer transition-colors">
                              privacy policy
                            </span>
                          </span>
                        </div>

                        {/* ENHANCED SUBMIT BUTTON */}
                        <button 
                          className="relative w-full py-4 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-2xl hover:shadow-3xl group overflow-hidden"
                          onClick={handleSignup}
                          disabled={isPending}
                          type="submit"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative z-10">
                            {isPending ? (
                              <div className="flex items-center justify-center gap-3">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Creating Account...</span>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-2">
                                <span>Create Account</span>
                                <Sparkles className="size-4" />
                              </div>
                            )}
                          </div>
                        </button>

                        {/* ENHANCED LOGIN LINK */}
                        <div className="text-center pt-4">
                          <p className="text-white/70">
                            Already have an account?{" "}
                            <Link
                              to="/login"
                              className="text-violet-400 hover:text-violet-300 font-semibold hover:underline transition-colors inline-flex items-center gap-1"
                            >
                              Sign in
                            </Link>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              {/* ENHANCED RIGHT SIDE */}
              <div className="hidden lg:flex w-full lg:w-1/2 relative overflow-hidden">
                {/* Enhanced background with gradient mesh */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent)] "></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.15),transparent)]"></div>
                
                {/* Enhanced decorative elements */}
                <div className="absolute top-10 right-10 w-40 h-40 bg-violet-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 left-10 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-2/3 right-1/4 w-32 h-32 bg-fuchsia-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
                
                <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
                  {/* Enhanced Illustration */}
                  <div className="relative mb-8 group">
                    <div className="w-80 h-80 mx-auto bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl border border-white/20 group-hover:scale-105 transition-transform duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-400/10 via-purple-400/10 to-fuchsia-400/10 rounded-3xl animate-pulse"></div>
                      <div className="relative z-10 w-64 h-64 bg-gradient-to-br from-violet-500/80 to-fuchsia-500/80 rounded-full flex items-center justify-center shadow-2xl">
                        <img 
                          src="/i.png" 
                          alt="Language connection illustration" 
                          className="w-56 h-56 object-contain drop-shadow-2xl" 
                        />
                      </div>
                    </div>
                    {/* Floating icons around the illustration */}
                    <div className="absolute -top-4 -right-4 p-2 bg-violet-500/20 backdrop-blur-sm rounded-xl border border-white/20 animate-bounce delay-500">
                      <Globe2 className="size-5 text-violet-300" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 p-2 bg-purple-500/20 backdrop-blur-sm rounded-xl border border-white/20 animate-bounce delay-1000">
                      <Users className="size-5 text-purple-300" />
                    </div>
                    
                  </div>

                  <div className="space-y-6 max-w-md">
                    <h2 className="text-3xl font-bold text-white leading-tight">
                      Connect with language partners
                      <span className="block text-2xl bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                        worldwide
                      </span>
                    </h2>
                    <p className="text-white/80 text-lg leading-relaxed">
                      Practice conversations, make friends, and improve your language skills together in our vibrant global community
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;