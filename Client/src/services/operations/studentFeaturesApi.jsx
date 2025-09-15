import { paymentEndpoints } from "../apiCollection";
import { apiConnector } from "./../apiConnector";
import logo from "../../assets/icon.png";
import { toast } from "react-hot-toast";
import { resetCart } from "../../redux/slices/cartSlice";
import { setPaymentLoading } from "../../redux/slices/courseSlice";

const {
  coursePaymentApi,
  verifyPaymentApi,
  sendPaymentSuccessEmailApi,
  enrollFreeCourseApi,
} = paymentEndpoints;

export async function buyCourse(courses, user, navigate, dispatch, token) {
  const toastId = toast.loading(
    "Redirecting to Razorpay for payment, please wait..."
  );
  try {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Razorpay failed to load!");
      return;
    }

    const orderResponse = await apiConnector(
      "POST",
      coursePaymentApi,
      {
        courses,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!orderResponse?.data?.success) {
      throw new Error(orderResponse?.data?.message || "Order creation failed.");
    }

    console.log(orderResponse.data.data);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_ID, // Enter the Key ID generated from the Dashboard
      amount: `${orderResponse.data.data.amount}`,
      currency: orderResponse.data.data.currency, // Use the currency from the order response
      name: "StudyHub",
      description: "Thank you for your purchase",
      image: logo,
      order_id: orderResponse.data.data.id,
      prefill: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      },
      handler: async (response) => {
        sendPaymentSuccessEmail(response, orderResponse, token);
        verifyPayment({ ...response, courses }, navigate, dispatch, token);
      },

      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", (response) => {
      console.error("Payment failed:", response);
      toast.error("Payment failed, please try again.");
    });
  } catch (error) {
    console.error("Error in buyCourse:", error);
    toast.error("Something went wrong, please try again later.");
  } finally {
    toast.dismiss(toastId);
  }
}

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

async function verifyPayment(paymentData, navigate, dispatch, token) {
  const toastId = toast.loading("Verifying payment...");
  dispatch(setPaymentLoading(true));
  try {
    const response = await apiConnector("POST", verifyPaymentApi, paymentData, {
      Authorization: `Bearer ${token}`,
    });
    console.log("Payment verified Response:", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success(response?.data?.message);
    dispatch(resetCart());
    localStorage.setItem("totalItems", JSON.stringify(0));
    navigate("/dashboard/enrolled-courses");
  } catch (error) {
    console.error("Error verifying payment:",error);
    toast.error("Error in verifying payment,Please Contact Support");
  } finally {
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
  }
}

async function sendPaymentSuccessEmail(response, orderResponse, token) {
  try {
    const emailData = {
      paymentId: response.razorpay_payment_id,
      orderId: response.razorpay_order_id,
      amount: orderResponse.data.data.amount / 100,
    };
    await apiConnector("POST", sendPaymentSuccessEmailApi, emailData, {
      Authorization: `Bearer ${token}`,
    });
  } catch (error) {
    console.error("Error sending payment success email:", error);
  }
}

export async function enrollFreeCourse(courses, navigate, dispatch, token) {
  const toastId = toast.loading("Enrolling in free course(s)...");
  // console.log("Enrolling in free course(s)...");
  dispatch(setPaymentLoading(true));

  try {
    const response = await apiConnector(
      "POST",
      enrollFreeCourseApi,
      { courses }, // only courses array sent, no Razorpay fields
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success(response?.data?.message);
    dispatch(resetCart());
    localStorage.setItem("totalItems", JSON.stringify(0));
    navigate("/dashboard/enrolled-courses");
  } catch (error) {
    console.error("Error in enrollFreeCourses:", error);
    const errMsg =
      error?.response?.data?.message || "Failed to enroll in free courses.";
    toast.error(errMsg);
  } finally {
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
  }
}
