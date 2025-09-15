exports.resetPasswordLink = (firstName, resetLink) => {
  return `
    <!DOCTYPE html>
    <html>
  <head>
    <meta charset="utf-8">
    <title>Reset Your Password</title>
    <style>
      body {
        font-family: 'Segoe UI', Arial, sans-serif;
        line-height: 1.6;
        color: #f5f5f5;
        max-width: 600px;
        margin: 0 auto;
        padding: 0;
        background-color: #0d1117;
      }
      .container {
        padding: 30px;
      }
      .header {
        background: linear-gradient(135deg, #0d47a1, #1976d2);
        padding: 25px;
        text-align: center;
        border-radius: 8px 8px 0 0;
      }
      .header h1 {
        color: #ffffff;
        margin: 0;
        font-size: 24px;
        font-weight: bold;
      }
      .content {
        padding: 25px;
        background-color: #161b22;
        border-radius: 0 0 8px 8px;
      }
      .content p {
        color: #d1d5db;
        margin-bottom: 15px;
      }
      .button {
        display: inline-block;
        background-color: #2563eb;
        color: white !important;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        margin: 30px 0;
      }
      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 12px;
        color: #6c757d;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      a {
        color: #60a5fa;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
         <img src="https://res.cloudinary.com/djpjyg8my/image/upload/v1757926849/Screenshot_2025-09-15_140613_dndwn6.png" alt="StudyHub Logo" width="250"/>
      </div>

      <div class="header">
        <h1>Reset Your Password</h1>
      </div>

      <div class="content">
        <p>Hi <strong>${firstName}</strong>,</p>

        <p>We received a request to reset your password. Click the button below to create a new one:</p>

        <div style="text-align: center;">
          <a href="${resetLink}" class="button" target="_blank">Reset Password</a>
        </div>

        <p>If you didn’t request this, you can safely ignore this email. Your password will remain unchanged.</p>

        <p style="margin-top: 30px;">Thanks,<br/>The StudyHub Team</p>
      </div>

    <div class="footer">
      <p>This is an automated message, please do not reply to this email.</p>
      <p>If you need further assistance, please contact us at 
        <a href="mailto:info.studyhub.tech@gmail.com">info.studyhub.tech@gmail.com</a>.
      </p>
      <p>&copy; ${new Date().getFullYear()} StudyHub. All rights reserved.</p>
    </div>
    </div>
  </body>
</html>`;
};
