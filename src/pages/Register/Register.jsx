import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { imageUpload, saveOrUpdateUser } from "../../utils";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function Register() {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password, image } = data;

    try {
      const imgURL = await imageUpload(image[0]);
      await createUser(email, password);

      await saveOrUpdateUser({ name, email, image: imgURL });
      await updateUserProfile(name, imgURL);

      toast.success("Signup Successful");
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

      toast.success("Signup Successful");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md backdrop-blur-lg bg-white/50 p-8 rounded-3xl shadow-xl border border-white/40"
      >
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Join the platform — it's quick and easy!
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-xl bg-white/70 border border-gray-300 focus:ring-2 focus:ring-lime-500"
              {...register("name", { required: "Name is required" })}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="text-sm font-medium">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="w-full text-sm bg-white/70 border border-dashed border-lime-400 rounded-xl p-2 cursor-pointer"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="example@mail.com"
              className="w-full px-4 py-2 rounded-xl bg-white/70 border border-gray-300 focus:ring-2 focus:ring-lime-500"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-xl bg-white/70 border border-gray-300 focus:ring-2 focus:ring-lime-500"
              {...register("password", {
                required: "Password required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            className="w-full btn-club text-white py-3 rounded-xl font-semibold transition"
            type="submit"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin mx-auto" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Separator */}
        <div className="flex items-center gap-4 my-6">
          <div className="h-px bg-gray-300 flex-1"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>

        {/* Google */}
        <div
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-3 border border-gray-300 rounded-xl p-3 cursor-pointer hover:bg-white/60 transition"
        >
          <FcGoogle size={28} />
          <span className="font-medium">Continue with Google</span>
        </div>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-700 text-sm">
          Already have an account?{" "}
          <Link className="text-blue-500 font-semibold hover:underline" to="/login">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
