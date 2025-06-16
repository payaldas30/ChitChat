import { useState, useEffect, useRef } from "react";
import { Ship, Mail, Lock, Eye, EyeOff, Sparkles, Globe2, Users, Clock } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";
import { useStarBackground } from "../utils/StarBackground";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const canvasRef = useRef(null);

  // Initialize star background
  const { initStarBackground, destroyStarBackground } = useStarBackground(canvasRef, {
    starCount: 150,
    starSpeed: 0.3,
    starSize: 1.5,
    twinkleSpeed: 0.015,
    shootingStarChance: 0.002,
    colors: ['#ffffff', '#e0f2fe', '#ddd6fe', '#fce7f3', '#dcfce7']
  });

  useEffect(() => {
    initStarBackground();
    return () => destroyStarBackground();
  }, []);

  // Custom hook usage - maintaining original logic
  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Star Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' }}
      />
      
      {/* Gradient Overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-purple-900/90"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-ping delay-1000"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400/30 rounded-full animate-ping delay-2000"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-ping delay-3000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden hover:shadow-3xl transition-all duration-500">
            <div className="flex flex-col lg:flex-row min-h-[700px]">
              
              {/* LOGIN FORM SECTION */}
              <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center relative">
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-l-3xl"></div>
                
                <div className="relative z-10">
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

                  {/* ENHANCED WELCOME TEXT */}
                  <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
                      Welcome back
                    </h1>
                    <p className="text-white/80 text-lg leading-relaxed">
                      Sign in to continue your amazing language journey and connect with friends worldwide
                    </p>
                  </div>

                  {/* ENHANCED ERROR MESSAGE DISPLAY */}
                  {error && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-2xl backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                        <span className="text-red-200 font-medium">{error.response.data.message}</span>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleLogin} className="space-y-6">
                    {/* ENHANCED EMAIL INPUT */}
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-white/90 flex items-center gap-2">
                        <Mail className="size-4" />
                        Email Address
                      </label>
                      <div className="relative group">
                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 text-white placeholder-white/50 hover:bg-white/15 group-hover:border-white/30"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          required
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    {/* ENHANCED PASSWORD INPUT */}
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-white/90 flex items-center gap-2">
                        <Lock className="size-4" />
                        Password
                      </label>
                      <div className="relative group">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="w-full px-5 py-4 pr-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 text-white placeholder-white/50 hover:bg-white/15 group-hover:border-white/30"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/90 transition-colors p-1 rounded-lg hover:bg-white/10"
                        >
                          {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                        </button>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    {/* ENHANCED SUBMIT BUTTON */}
                    <button
                      type="submit"
                      disabled={isPending}
                      className="relative w-full py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:from-blue-600 hover:via-purple-600 hover:to-cyan-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-2xl hover:shadow-3xl group overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        {isPending ? (
                          <div className="flex items-center justify-center gap-3">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Signing in...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <span>Sign In</span>
                            <Sparkles className="size-4" />
                          </div>
                        )}
                      </div>
                    </button>

                    {/* ENHANCED SIGNUP LINK */}
                    <div className="text-center pt-6">
                      <p className="text-white/70">
                        Don't have an account?{" "}
                        <Link
                          to="/signup"
                          className="text-blue-400 hover:text-blue-300 font-semibold hover:underline transition-colors inline-flex items-center gap-1"
                        >
                          Create one
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
              
             
              {/* ENHANCED IMAGE SECTION */}
              <div className="hidden lg:flex w-full lg:w-1/2 relative overflow-hidden">
                {/* Enhanced background with gradient mesh */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent)] "></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.15),transparent)]"></div>
                
                {/* Enhanced decorative elements */}
                <div className="absolute top-10 right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 left-10 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
                
                <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
                  {/* Enhanced Illustration */}
                  <div className="relative mb-8 group">
                    <div className="w-80 h-80 mx-auto bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl border border-white/20 group-hover:scale-105 transition-transform duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-cyan-400/10 rounded-3xl animate-pulse"></div>
                      <img
                        src="/i.png"
                        alt="Language connection illustration"
                        className="relative z-10 w-64 h-64 object-contain drop-shadow-2xl"
                      />
                    </div>
                    {/* Floating icons around the illustration */}
                    <div className="absolute -top-4 -right-4 p-2 bg-blue-500/20 backdrop-blur-sm rounded-xl border border-white/20 animate-bounce delay-500">
                      <Globe2 className="size-5 text-blue-300" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 p-2 bg-purple-500/20 backdrop-blur-sm rounded-xl border border-white/20 animate-bounce delay-1000">
                      <Users className="size-5 text-purple-300" />
                    </div>
                  </div>

                  <div className="space-y-6 max-w-md">
                    <h2 className="text-3xl font-bold text-white leading-tight">
                      Connect with language partners
                      <span className="block text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
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

export default LoginPage;