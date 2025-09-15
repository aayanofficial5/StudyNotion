import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../services/operations/authapis";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import Password from "../components/Authentication/Password";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const { token } = useParams();
  const navigate = useNavigate();
  const [showP1, setShowP1] = useState(false);
  const [showP2, setShowP2] = useState(false);
  const [FormData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const handleLoginData = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });

  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    console.log(FormData);
    dispatch(resetPassword({ token, password: FormData.newPassword, confirmPassword: FormData.confirmNewPassword }, navigate));
  };

  return (
    <div className="flex justify-center items-center text-white w-full h-[89vh] bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <Loading />
        </div>
      ) : (
        <div className="w-[50%] md:w-[30%] flex flex-col gap-4 justify-center items-center">
          <h2 className="text-yellow-400 font-semibold self-start text-4xl opacity-90">
            Reset Password
          </h2>
          <p className="text-gray-400 text-lg self-start w-full">
            Almost done! Please enter your new password below and you're all
            set.
          </p>
          <form
            onSubmit={handleResetPassword}
            className="flex flex-col gap-4 w-full opacity-90"
          >
            <Password
              passwordType="newPassword"
              passwordName="New Password"
              name="p1"
              handleLoginData={handleLoginData}
              showP={showP1}
              setShowP={setShowP1}
              loginFormData={FormData}
            ></Password>
            <Password
              passwordType="confirmNewPassword"
              passwordName="Confirm New Password"
              name="p2"
              handleLoginData={handleLoginData}
              showP={showP2}
              setShowP={setShowP2}
              loginFormData={FormData}
            ></Password>
            <p className="text-gray-400 text-sm self-start w-full">
              1. Password must be at least 8 characters long
              <sup className="text-red-400">*</sup>
              <br />
              2. Password must contain at least one uppercase letter, one
              lowercase letter, one number and one special character
              <sup className="text-red-400">*</sup>
            </p>
            <button
              type="submit"
              className="w-full transition-all duration-200 ease-in hover:scale-95 py-1 cursor-pointer rounded-lg border-blue-500 border-3 font-semibold bg-blue-500 text-xl"
            >
              Reset Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
