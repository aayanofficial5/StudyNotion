import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
// Pages
import Home from "./pages/Home.jsx";
import Login from "./pages/LogIn.jsx";
import Signup from "./pages/Signup.jsx";
import Courses from "./pages/Courses.jsx";
import EmailVerification from "./pages/EmailVerification.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ResetPasswordLink from "./pages/ResetPasswordLink.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Dashboard from "./pages/Dashboard.jsx";

// Components
import Navbar from "./components/Common/NavBar.jsx";
import MyProfile from "./components/Dashboard/Common/MyProfile.jsx";
import EnrolledCourses from "./components/Dashboard/Student/EnrolledCourses.jsx";
import Cart from "./components/Dashboard/Student/Cart.jsx";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/Authentication/PrivateRoute";
import { useSelector } from "react-redux";
import AddCourse from "./components/Dashboard/Instructor/AddCourse/index.jsx";
import Settings from "./components/Dashboard/Common/Settings/index";
import MyCourses from "./components/Dashboard/Instructor/MyCourses";
import Reports from "./components/Dashboard/Instructor/Reports/Reports.jsx";
import Catalog from "./pages/Catalog.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import VideoDetails from "./components/Core/ViewCourse/VideoDetails.jsx";
import ViewCourse from "./pages/ViewCourse.jsx";
import { ACCOUNT_TYPE } from "./utils/constant.js";
import Chatbot from "./components/Common/ChatBot.jsx";

const App = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const user = useSelector((state) => state.profile.user);

  return (
    <><div className="max-h-fit bg-black opacity-90 flex flex-col w-screen mx-auto">
      {/* <div className="flex flex-col items-center bg-blue-500">
      <h1 className="text-white">Welcome to Our Application</h1>
      </div> */}
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/reset-password-link" element={<ResetPasswordLink />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          {/* Course Routes */}
          <Route path="course/:courseId" element={<CourseDetails />} />
          <Route path="/search/:searchTerm" element={<Courses />}></Route>
          <Route path="/catalog/:catalogName" element={<Catalog />} />
          {/*View Course Routes */}
          <Route
            element={
              <PrivateRoute>
                <ViewCourse />
              </PrivateRoute>
            }
          >
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails />}
                />
              </>
            )}
          </Route>
          {/* Dashboard Routes */}
          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="/dashboard/my-profile" element={<MyProfile />} />
            {user?.accountType == "Student" && (
              <>
                <Route
                  path="/dashboard/enrolled-courses"
                  element={<EnrolledCourses />}
                />
                <Route path="/dashboard/cart" element={<Cart />} />
              </>
            )}
            {user?.accountType == "Instructor" && (
              <>
                <Route path="/dashboard/add-course" element={<AddCourse />} />
                <Route path="/dashboard/my-courses" element={<MyCourses />} />
                <Route path="/dashboard/reports" element={<Reports />} />
              </>
            )}
            <Route path="/dashboard/settings" element={<Settings />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    <Chatbot/>
    </>
  );
};

export default App;
