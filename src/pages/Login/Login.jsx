import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { saveOrUpdateUser } from "../../utils";
import Loading from "../../components/Loader/Loading";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";

export default function Login() {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  if (loading) return <Loading />;
  if (user) return <Navigate to={from} replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const { user } = await signIn(email, password);
      console.log(user)

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (err) {
      setLoading(false);
      toast.error(err?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <title>Login</title>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="backdrop-blur-xl bg-white/40 border border-white/30 shadow-2xl px-8 py-10 rounded-[32px] w-full max-w-md"
      >
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-4xl font-extrabold text-center text-gray-900 mb-2"
        >
          Welcome Back
        </motion.h2>
        <p className="text-center text-gray-600 mb-8">
          Login to continue your journey 🌿
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              required
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-white/70 border border-gray-300 focus:ring-2 focus:ring-lime-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              required
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white/70 border border-gray-300 focus:ring-2 focus:ring-lime-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl btn-club transition text-white font-semibold shadow-md"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin mx-auto" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Forgot Password */}
        <button className="text-xs mt-2 text-gray-600 hover:underline">
          Forgot password?
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="h-px bg-gray-300 flex-1" />
          <span className="text-gray-500 text-sm">OR</span>
          <div className="h-px bg-gray-300 flex-1" />
        </div>

        {/* Google Button */}
        <div
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-3 border border-gray-300 bg-white/60 hover:bg-white transition p-3 rounded-xl cursor-pointer shadow"
        >
          <FcGoogle size={28} />
          <span className="font-medium text-gray-700">
            Continue with Google
          </span>
        </div>

        {/* Signup Link */}
        <p className="text-center text-gray-700 mt-6 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            state={from}
            className="text-blue-400 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
