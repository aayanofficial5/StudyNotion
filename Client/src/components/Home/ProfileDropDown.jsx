import React from "react";
import { Link } from "react-router-dom";
import CTAButton from "./CTAButton";
import { logout } from "../../services/operations/authapis";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import profile from "../../assets/profilePlaceholder.jpg";

const ProfileDropDown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.user);
  let image,
    quality = 10;
  if (!user?.image?.includes("/upload/")) image = user?.image;
  else image = user.image?.replace("/upload/", `/upload/q_${quality}/`);
  return (
    <div className="flex flex-row justify-center items-center gap-4">
      <Link to="/dashboard/my-profile" className="hover:text-blue-500">
        <div className="h-9 w-9 border-1 rounded-full overflow-hidden">{console.log("Image URL:", image)}
          <img
            src={`${image || profile}`}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
      </Link>
      {/* <div className="hover:text-blue-500">
        <CTAButton
          text="Logout"
          active={false}
          logout={true}
          action={()=>dispatch(logout(navigate))}
        ></CTAButton>
      </div> */}
    </div>
  );
};

export default ProfileDropDown;
