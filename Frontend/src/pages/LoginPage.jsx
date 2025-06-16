import { useState } from "react";
import { Ship, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // This is how we did it at first, without using our custom hook
  // const queryClient = useQueryClient();
  // const {
  //   mutate: loginMutation,
  //   isPending,
  //   error,
  // } = useMutation({
  //   mutationFn: login,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  // This is how we did it using our custom hook - optimized version
  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* LOGIN FORM SECTION */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              {/* LOGO */}
              <div className="mb-8 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                  <Ship className="size-8 text-white" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                  ChitChat
                </span>
              </div>

              {/* WELCOME TEXT */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
                <p className="text-gray-600 text-lg">
                  Sign in to continue your language journey
                </p>
              </div>

              {/* ERROR MESSAGE DISPLAY */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-red-800 font-medium">{error.response.data.message}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
                {/* EMAIL INPUT */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <Mail className="size-4" />
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* PASSWORD INPUT */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Lock className="size-4" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full px-4 py-4 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                    </button>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                >
                  {isPending ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>

                {/* SIGNUP LINK */}
                <div className="text-center pt-4">
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
                    >
                      Create one
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            {/* IMAGE SECTION */}
            <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 items-center justify-center relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 left-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 max-w-md p-8 text-center">
                {/* Illustration */}
                <div className="relative mb-8">
                  <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center shadow-2xl">
                    <img
                      src="/i.png"
                      alt="Language connection illustration"
                      className="w-64 h-64 object-contain"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Connect with language partners worldwide
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Practice conversations, make friends, and improve your language skills together
                  </p>
                </div>

                {/* Feature highlights */}
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-white/50 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl font-bold text-blue-600">100+</div>
                    <div className="text-xs text-gray-600">Languages</div>
                  </div>
                  <div className="text-center p-3 bg-white/50 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl font-bold text-purple-600">50K+</div>
                    <div className="text-xs text-gray-600">Users</div>
                  </div>
                  <div className="text-center p-3 bg-white/50 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl font-bold text-green-600">24/7</div>
                    <div className="text-xs text-gray-600">Support</div>
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