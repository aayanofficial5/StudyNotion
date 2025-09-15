import React, { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import CTAButton from "../Home/CTAButton.jsx";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaPlusCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import ProfileDropDown from "../Home/ProfileDropDown.jsx";
import { Outlet } from "react-router-dom";
import { NavbarLinks } from "../../data/Navbar-Link";
import { getCourseCategories } from "../../services/operations/courseapis";
import { MdClose, MdMenu } from "react-icons/md";
import Logo from "./Logo.jsx";

const NavBar = () => {
  const token = useSelector((state) => state.auth.token);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getCourseCategories(false);
        setSubLinks(res);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Top Nav */}
      <div
        className={`relative flex items-center justify-between md:justify-around px-6 py-4 shadow-md border-b-1 border-gray-800 h-[70px] ${
          pathname !== "/" && "bg-gray-900/60"
        }`}
      >
        {/* Hamburger Menu (mobile only) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-3xl text-gray-300 focus:outline-none"
        >
          <MdMenu />
        </button>

        {/* Logo */}
        <Logo />
        {/*ProfileDropDown*/}
        <div className={`md:hidden ${token ? "visible" : "invisible"}`}>
          <button>{token && <ProfileDropDown />}</button>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 font-semibold tracking-wider">
            {NavbarLinks.map((link, index) => (
              <li
                className="flex flex-col gap-2 items-center w-fit"
                key={index}
              >
                <div>
                  {link.name === "Catalog" ? (
                    <>
                      <div
                        className={`group relative flex cursor-pointer items-center gap-1`}
                      >
                        <div
                          className={`${
                            pathname.includes(link.path) ? "text-blue-400" : ""
                          }`}
                        >
                          <span>{link.name}</span>
                        </div>
                        <IoIosArrowDown />
                        <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-gray-800 p-4 text-white opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                          <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-gray-800"></div>
                          {loading || !subLinks ? (
                            <p className="text-center">Loading...</p>
                          ) : subLinks.length ? (
                            <>
                              {subLinks
                                ?.filter(
                                  (subLink) => subLink?.course?.length > 0
                                )
                                ?.map((subLink, i) => (
                                  <Link
                                    to={`${link.path}/${subLink.name
                                      .split(" ")
                                      .join("-")
                                      .toLowerCase()}`}
                                    className="rounded-lg bg-transparent py-4 pl-4 hover:bg-gray-700"
                                    key={i}
                                  >
                                    <p className="uppercase tracking-wider">
                                      {subLink.name}
                                    </p>
                                  </Link>
                                ))}
                            </>
                          ) : (
                            <p className="text-center">No Courses Found</p>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        ` ${isActive ? "text-blue-400" : ""}`
                      }
                      key={index}
                    >
                      <span>{link.name}</span>
                    </NavLink>
                  )}
                </div>
                <div
                  className={`${
                    pathname.split("/")[1] == link.path.split("/")[1]
                      ? "border-t-[1px] border-blue-400/70"
                      : ""
                  } bg-blend-normal w-[80%]`}
                ></div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-5 text-white">
          {!token && (
            <>
              <Link to="/login">
                <CTAButton text="Login" active />
              </Link>
              <Link to="/signup">
                <CTAButton text="Signup" />
              </Link>
            </>
          )}

          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <FaShoppingCart className="text-2xl hover:text-blue-400" />
              {totalItems.length > 0 && (
                <span className="bg-blue-500 rounded-full absolute -top-2 -right-0 h-5 w-5 text-xs flex items-center justify-center animate-bounce">
                  {totalItems.length}
                </span>
              )}
            </Link>
          )}

          {user && user?.accountType === "Instructor" && (
            <Link to="/dashboard/add-course">
              <FaPlusCircle className="text-2xl text-blue-500 mt-1 hover:text-blue-400" />
            </Link>
          )}

          {token && <ProfileDropDown />}
        </div>
      </div>

      {/* Slide-in Mobile Menu with Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-999 transition-all duration-300 ${
          mobileMenuOpen ? "visible bg-black/30 backdrop-blur-sm" : "invisible"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`absolute top-0 left-0 h-full w-[70%] max-w-[300px] bg-gray-900/80 text-white shadow-md transform transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-4 p-6">
            {/* Close Button */}
            <button
              className="text-white self-end text-2xl"
              onClick={() => setMobileMenuOpen(false)}
            >
              <MdClose size={30} />
            </button>

            {/* Mobile Links */}
            {NavbarLinks.map((link, index) => (
              <div key={index}>
                {link.name === "Catalog" ? (
                  <details>
                    <summary className="cursor-pointer py-2 text-lg flex items-center justify-between font-semibold">
                      Catalog <IoIosArrowDown />
                    </summary>
                    <div className="flex flex-col gap-2 ml-2 mt-2">
                      {loading ? (
                        <span>Loading…</span>
                      ) : subLinks.length ? (
                        subLinks
                          .filter((s) => s?.course?.length > 0)
                          .map((s, i) => (
                            <NavLink
                              to={`${link.path}/${s.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              key={i}
                              onClick={() => setMobileMenuOpen(false)}
                              className={({ isActive }) =>
                                `py-1 bg-gray-600/30 pl-3 rounded-md ${
                                  isActive && "text-blue-400"
                                }`
                              }
                            >
                              {s.name}
                            </NavLink>
                          ))
                      ) : (
                        <span>No Courses Found</span>
                      )}
                    </div>
                  </details>
                ) : (
                  <NavLink
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-2 text-lg font-semibold ${
                        isActive ? "text-blue-400" : ""
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                )}
              </div>
            ))}

            {/* Mobile CTAs */}
            <div className="flex flex-col gap-3 border-t-1 pt-6">
              {!token && (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <CTAButton text="Login" active />
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <CTAButton text="Signup" />
                  </Link>
                </>
              )}

              {user && user?.accountType !== "Instructor" && (
                <NavLink
                  to="/dashboard/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 ${isActive && "text-blue-400"}`
                  }
                >
                  <FaShoppingCart className="text-xl" />
                  Cart ({totalItems.length})
                </NavLink>
              )}

              {user && user?.accountType === "Instructor" && (
                <Link
                  to="/dashboard/add-course"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3"
                >
                  <FaPlusCircle className="text-xl" />
                  Add Course
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default NavBar;
