import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "./Navbar";
import { auth, provider } from "./google-sign-in/config";
import AppMain from "./AppMain";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (user) {
    return (
      <>
        <Navbar />
        <AppMain user={user} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#111]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center min-h-[85vh]">
        <div className="text-center mb-12 relative">
          <div className="absolute -top-36 w-[27.75rem] h-[27.75rem] rounded-[62500rem] opacity-75 bg-[radial-gradient(50%_50%_at_50%_50%,#4602D9_0%,#111_100%)] blur-[124px] z-0" />
          <div className="relative z-10 flex flex-col items-center">
            <img src="./megaphone.svg" alt="megaphone" className="mb-6" />

            <h1 className="text-white text-4xl font-bold mb-4">Access</h1>
            <h1 className="text-white text-4xl font-bold mb-6">
              rate alert dashboard
            </h1>
            <p className="text-white text-base mb-12 max-w-sm">
              Stay updated with real-time currency rates and manage your alerts.
            </p>

            <button
              onClick={signInWithGoogle}
              className="flex items-center justify-center space-x-2 bg-[#333333] hover:bg-gray-600 text-white px-6 py-3 rounded-lg w-full max-w-md mx-auto transition-colors"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-5 h-5"
              />
              <span>Sign in with Google</span>
            </button>

            <p className="text-gray-500 text-sm mt-8  max-w-sm">
              By creating an account or signing you
              <br /> agree to our{" "}
              <span className="text-gray-400 hover:text-white underline cursor-pointer">
                Terms and Conditions
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
