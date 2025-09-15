import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPasswordLink } from "../services/operations/authapis";
import { IoIosArrowRoundBack } from "react-icons/io";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";

const ResetPasswordLink = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const [email, setEmail] = useState("");
  const [resend, setResend] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const result = dispatch(resetPasswordLink(email, navigate));
    if (result) {
      setResend(true);
    }
  };

  return (
    <div className="flex justify-center items-center text-white w-full min-h-[89vh] text-3xl bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <Loading />
        </div>
      ) : (
        <div className="w-[50%] md:w-[30%] flex flex-col gap-4 justify-center">
          <h1 className="font-semibold opacity-85 text-yellow-400">
            {resend ? "Check Email" : "Forgot Password ?"}
          </h1>
          {resend ? (
            <>
            <p className="text-lg opacity-60">We have sent the reset email to {email}</p>
            <button
              className="text-xl h-10 w-full bg-blue-500 rounded-lg my-6 cursor-pointer font-semibold"
              onClick={handleFormSubmit}
            >
              Resend Email
            </button>
            </>
          ) : (
            <>
            <p className="text-lg opacity-60">
              Don't worry — we'll send you instructions to reset it.
              <br></br>
              If you no longer have access to your account, we can help you
              recover your account.
            </p>
          <p className="relative text-base opacity-70 -mb-4">
            Email Address{" "}
            <sup className="text-red-500 absolute top-2 text-[17px]">*</sup>
          </p>
          <form>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="rounded-lg border-1 border-gray-300 h-10 w-full text-center text-xl text-white"
            />
            <button
              className="text-xl h-10 w-full bg-blue-500 rounded-lg my-6 cursor-pointer font-semibold"
              onClick={handleFormSubmit}
            >
              Submit
            </button>
          </form>
          </>
          )}
          
          <div className="text-base flex justify-between w-full">
            <div
              className="flex items-center"
              onClick={() => navigate("/login")}
            >
              <IoIosArrowRoundBack className="text-gray-100 text-3xl cursor-pointer" />
              <span className="cursor-pointer text-gray-100">
                Back To Login
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordLink;
