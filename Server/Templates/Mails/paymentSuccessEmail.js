exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
  return `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Payment Confirmation</title>
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
      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 12px;
        color: #6c757d;
      }
      .success {
        color: #4ade80;
        font-weight: bold;
        font-size: 18px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      table {
        border-collapse: collapse;
        width: 100%;
        max-width: 500px;
        margin-top: 15px;
      }
      td {
        padding: 10px;
        border: 1px solid #2c2f36;
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
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
         <img src="https://res.cloudinary.com/djpjyg8my/image/upload/v1757926849/Screenshot_2025-09-15_140613_dndwn6.png" alt="StudyHub Logo" width="250"/>
      </div>

      <div class="header">
        <h1>Payment Successful 🎉</h1>
      </div>

      <div class="content">
        <p>Hi <strong>${name}</strong>,</p>

        <p class="success">Your payment has been successfully received!</p>

        <h3 style="color: #4ade80;">Payment Summary:</h3>
        <table>
          <tr>
            <td>Amount Paid:</td>
            <td>₹${amount.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Order ID:</td>
            <td>${orderId}</td>
          </tr>
          <tr>
            <td>Payment ID:</td>
            <td>${paymentId}</td>
          </tr>
        </table>

        <p style="margin-top: 20px;">You can now access your course from your dashboard.</p>

        <p>If you have any questions or need help, please contact our support team:</p>
        <p>
          <a href="mailto:info.studyhub.tech@gmail.com" class="button">Contact Support</a>
        </p>

        <p style="margin-top: 30px;">Happy Learning!<br/>The StudyHub Team</p>
      </div>

      <div class="footer">
        <p>This is an automated message, please do not reply to this email.</p>
        <p>&copy; ${new Date().getFullYear()} StudyHub. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
  `;
};
