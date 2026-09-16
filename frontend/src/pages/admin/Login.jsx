import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/admin/create-project";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      localStorage.setItem("vaagdesha_token", data.token);
      localStorage.setItem(
        "vaagdesha_user",
        JSON.stringify(data.user)
      );

      toast.success("Login successful!");

      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Unable to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6] flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-[520px]">
        {/* Brand */}
        <div className="text-center mb-10">
          <h1
            className="text-[32px] sm:text-[38px] text-[#6A1016] leading-none"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Vaagdesha
          </h1>

          <p className="mt-3 text-[10px] tracking-[0.42em] text-[#B58A52] uppercase">
            Interiors
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-[#E5D9CC] rounded-[24px] px-7 py-8 sm:px-10 sm:py-10 shadow-[0_20px_60px_rgba(80,30,20,0.08)]">
          {/* Heading */}
          <div className="mb-8">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#B58A52] mb-4">
              Secure Access
            </p>

            <h2
              className="text-[38px] sm:text-[44px] leading-[1.05] text-[#6A1016]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Welcome back
            </h2>

            <p className="mt-4 text-[14px] leading-6 text-[#806F63]">
              Sign in to access the Vaagdesha Interiors admin portal.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-[11px] tracking-[0.3em] uppercase text-[#6F5B4D] mb-3">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={20}
                  strokeWidth={1.6}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A89584]"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@vaagdeshainteriors.com"
                  autoComplete="email"
                  className="w-full h-[64px] rounded-[16px] border border-[#E5D9CC] bg-[#FFFEFC] pl-14 pr-5 text-[15px] text-[#3E332D] outline-none transition-all placeholder:text-[#B7A99D] focus:border-[#8A2429] focus:ring-2 focus:ring-[#8A2429]/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] tracking-[0.3em] uppercase text-[#6F5B4D] mb-3">
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={20}
                  strokeWidth={1.6}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A89584]"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full h-[64px] rounded-[16px] border border-[#E5D9CC] bg-[#FFFEFC] pl-14 pr-14 text-[15px] text-[#3E332D] outline-none transition-all placeholder:text-[#B7A99D] focus:border-[#8A2429] focus:ring-2 focus:ring-[#8A2429]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#9E8D7D] hover:text-[#6A1016] transition-colors"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={20} strokeWidth={1.6} />
                  ) : (
                    <Eye size={20} strokeWidth={1.6} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[64px] rounded-[16px] bg-[#6A1016] text-white flex items-center justify-center gap-3 text-[15px] font-medium transition-all hover:bg-[#570C11] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                "Signing In..."
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={20} strokeWidth={1.8} />
                </>
              )}
            </button>
          </form>

          {/* Security Footer */}
          <div className="mt-8 pt-6 border-t border-[#E9DFD5] flex items-center justify-center gap-3">
            <LockKeyhole
              size={16}
              strokeWidth={1.5}
              className="text-[#B58A52]"
            />

            <p className="text-[12px] text-[#9A897B]">
              Authorized personnel only.
            </p>
          </div>
        </div>

        {/* Bottom Brand */}
        <p className="text-center mt-7 text-[9px] tracking-[0.35em] uppercase text-[#B39F8D]">
          Vaagdesha Interiors
        </p>
      </div>
    </div>
  );
};

export default Login;