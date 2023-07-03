import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";

import "./Otp.css";

const Otp = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      setMobile(value);
    } else if (name === "otp") {
      setOtp(value);
    }
  };

  const onCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignIn();
            console.log("recaptcha Verified");
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  };

  const onSignIn = (e) => {
    e.preventDefault();
    onCaptchaVerify();
    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = "+91" + mobile;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent");
        setOtpSent(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log("SMS not sent", error);
        toast.error("OTP not sent!");
      });
  };

  const onOTPVerify = (e) => {
    e.preventDefault();
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        const user = res.user;
        console.log(JSON.stringify(user));
        alert("User is verified");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="otp-main-container">
      <Toaster toastOptions={{ duration: 3000 }} />
      {!otpSent ? ( // render sign-in form if OTP not sent
        <form onSubmit={onSignIn}>
          <div className="fa-phone">
            <p>
              <FontAwesomeIcon icon={faPhone} />
            </p>
          </div>
          <h2 className="text-white">Verify your phone number</h2>
          <div id="recaptcha-container"></div>
          <input
            type="number"
            name="mobile"
            placeholder="Enter Mobile number"
            required
            onChange={handleChange}
          />
          <button className="btn-no-otp" type="submit">
            Submit
          </button>
        </form>
      ) : (
        // render OTP form if OTP sent
        <form onSubmit={onOTPVerify}>
          <div className="fa-phone">
            <p>
              <FontAwesomeIcon icon={faUnlockKeyhole} />
            </p>
          </div>
          <h2 className="text-white">Enter OTP</h2>
          <input
            type="number"
            name="otp"
            placeholder="Enter OTP"
            required
            onChange={handleChange}
          />
          <button className="btn-no-otp" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Otp;
