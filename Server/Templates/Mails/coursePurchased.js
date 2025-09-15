exports.coursePurchased = (email, firstName, courseName) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Course Purchase Confirmation</title>
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
      margin: 10px 0 0 0;
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
    .highlight {
      color: #facc15;
      font-weight: bold;
    }
    .button {
      display: inline-block;
      background-color: #2563eb;
      color: white !important;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      margin-top: 20px;
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
    
    <!-- Logo -->
    <div class="logo">
      <img src="https://res.cloudinary.com/djpjyg8my/image/upload/v1757926849/Screenshot_2025-09-15_140613_dndwn6.png" 
           alt="StudyHub Logo" width="250">
    </div>

    <!-- Header -->
    <div class="header">
      <h1>🎉 Course Purchase Successful</h1>
    </div>

    <!-- Content -->
    <div class="content">
      <p>Dear ${firstName},</p>

      <p>Thank you for purchasing <span class="highlight">"${courseName}"</span> using the email <strong>${email}</strong>.</p>

      <p>You now have full access to all the course content. Let the learning begin 🚀</p>

      <p>If you have any issues accessing your course, feel free to contact our support team anytime:</p>

      <p style="text-align:center;">
        <a href="mailto:info.studyhub.tech@gmail.com" class="button">Contact Support</a>
      </p>

      <p>Best regards,<br>The StudyHub Team</p>
    </div>

    <!-- Footer -->
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
