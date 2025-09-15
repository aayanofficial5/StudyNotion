const cloudFileUploaded = ({ fileName, fileUrl, uploadedBy }) => {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 40px auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
  
  <!-- Header -->
  <h2 style="color: #16a34a; margin-top: 0; text-align: center; font-size: 24px;">
    ✅ File Uploaded Successfully
  </h2>

  <!-- Message -->
  <p style="font-size: 15px; color: #374151; line-height: 1.6;">
    Hello <strong>${uploadedBy}</strong>,
  </p>
  <p style="font-size: 15px; color: #374151; line-height: 1.6;">
    Your file has been successfully uploaded to <strong>Cloudinary</strong>. Below are the details of your upload:
  </p>

  <!-- File Details Table -->
  <table style="width: 100%; margin-top: 25px; border-collapse: collapse; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
    <tr>
      <td style="padding: 12px 15px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb; width: 35%;">📁 File Name</td>
      <td style="padding: 12px 15px; color: #374151; border-bottom: 1px solid #e5e7eb;">${fileName}</td>
    </tr>
    <tr>
      <td style="padding: 12px 15px; font-weight: 600; color: #111827;">🔗 File URL</td>
      <td style="padding: 12px 15px;">
        <a href="${fileUrl}" target="_blank" style="color: #2563eb; text-decoration: none; font-weight: 500;">
          View File
        </a>
      </td>
    </tr>
  </table>

  <!-- Footer -->
  <p style="margin-top: 35px; font-size: 14px; color: #6b7280;">
    Thanks,<br>
    <strong>The Cloud Team</strong>
  </p>
</div>
  `;
};

module.exports = cloudFileUploaded;
