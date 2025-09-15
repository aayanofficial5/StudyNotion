exports.otpVerification = (otp) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Your One-Time Password (OTP)</title>
  <style>
    body {
      background-color: #0a0f1e; /* deep navy */
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #e0e6f0;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 40px auto;
      padding: 30px;
      border: 1px solid #1c2a4d;
      border-radius: 12px;
      background: #141c2e; /* dark blue panel */
      text-align: center;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    }

    .logo {
      margin-bottom: 30px;
    }

    .message {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
      color: #3da9fc; /* bright blue accent */
    }

    .body {
      font-size: 16px;
      color: #cfd8e3;
      margin-bottom: 25px;
    }

    .otp-box {
      display: inline-block;
      padding: 16px 32px;
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 6px;
      background-color: #1e2b4d;
      border: 2px dashed #3da9fc;
      border-radius: 10px;
      margin: 25px 0;
      color: #ffffff;
    }

    .support {
      font-size: 14px;
      color: #9caec9;
      margin-top: 25px;
    }

    .support a {
      color: #3da9fc;
      text-decoration: none;
    }

    .highlight {
      font-weight: bold;
      color: #ffffff;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <img src="https://res.cloudinary.com/djpjyg8my/image/upload/v1757926849/Screenshot_2025-09-15_140613_dndwn6.png" 
      alt="StudyHub Logo" width="250">
    </div>
    <div class="message">Your OTP for Verification</div>
    <div class="body">
      <p>Dear User,</p>
      <p>Use the following One-Time Password (OTP) to verify your account or complete your action on <strong>StudyHub</strong>.</p>
      <div class="otp-box">${otp}</div>
      <p>This OTP is valid for <span class="highlight">5 minutes</span>.</p>
      <p>If you did not request this OTP, please ignore this email or contact our support immediately.</p>
    </div>
    <div class="support">
      Need help? Contact us at 
      <a href="mailto:info.studyhub.tech@gmail.com">info.studyhub.tech@gmail.com</a> — we're here for you!
    </div>
  </div>
</body>
</html>
`;
};
