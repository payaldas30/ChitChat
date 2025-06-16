import { useState } from "react";
import { Ship } from "lucide-react";
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // Using the actual custom hook
  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gray-50">
      <div className="border border-purple-200 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* SIGNUP FORM - LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <Ship className="size-9 text-purple-600" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-violet-600 tracking-wider">
              ChiChat
            </span>
          </div>

          {/* ERROR MESSAGE IF ANY */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
              <span>{error.response?.data?.message || "An error occurred"}</span>
            </div>
          )}

          <div className="w-full">
            <div>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Create an Account</h2>
                  <p className="text-sm opacity-70 text-gray-700">
                    Join ChitChat and start your language learning adventure!
                  </p>
                </div>

                <div className="space-y-3">
                  {/* FULLNAME */}
                  <div className="w-full">
                    <label className="block">
                      <span className="block text-sm font-medium text-gray-700 mb-1">Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  
                  {/* EMAIL */}
                  <div className="w-full">
                    <label className="block">
                      <span className="block text-sm font-medium text-gray-700 mb-1">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="john@gmail.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                    />
                  </div>
                  
                  {/* PASSWORD */}
                  <div className="w-full">
                    <label className="block">
                      <span className="block text-sm font-medium text-gray-700 mb-1">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="********"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                    />
                    <p className="text-xs opacity-70 mt-1 text-gray-600">
                      Password must be at least 6 characters long
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <input 
                      type="checkbox" 
                      className="mt-1 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2" 
                      required 
                    />
                    <span className="text-xs leading-tight text-gray-700">
                      I agree to the{" "}
                      <span className="text-purple-600 hover:underline cursor-pointer">terms of service</span> and{" "}
                      <span className="text-purple-600 hover:underline cursor-pointer">privacy policy</span>
                    </span>
                  </div>
                </div>

                <button 
                  className="w-full py-2 px-4 rounded-lg font-medium transition-colors disabled:cursor-not-allowed bg-purple-600 hover:bg-purple-700 text-white disabled:bg-purple-400" 
                  onClick={handleSignup}
                  disabled={isPending}
                  type="submit"
                >
                  {isPending ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Loading...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-700">
                    Already have an account?{" "}
                    <a href="/login" className="text-purple-600 hover:underline">
                      Sign in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SIGNUP FORM - RIGHT SIDE */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-purple-50 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
               <div className="relative aspect-square max-w-sm mx-auto">
                  <img src="/i.png" alt="Language connection illustration" className="w-full h-full" />
                </div>
              </div>
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Connect with language partners worldwide</h2>
              <p className="opacity-70 text-gray-700">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;