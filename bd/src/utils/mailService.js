import nodemailer from "nodemailer"

export async function sendEmail(senderEmail, recipientEmail, senderName, subject, message, downloadLink) {
  // Configure the transporter using your email provider's credentials
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Replace with your service (e.g., 'gmail', 'yahoo', etc.)
    auth: {
      user: "adlove03012004@gmail.com",
      pass: "lltw wxyy bzkt tnlf", // **Important:** Consider using environment variables for secure password storage
    },
  });

  // Define the email content
  const mailOptions = {
    from: "adlove03012004@gmail.com", // Use formatted sender name
    to: recipientEmail,
    subject: subject.trim() === "" ? "Hello from ShareHUB" : subject,
    text:
      message.trim() === ""
        ? `Hi,

This email is to notify you that ${senderName} (${senderEmail}) has shared a link to download the shared file(s) with you.

${downloadLink}

Please note: This email is sent from a non-reply address and cannot receive replies.

Here are some additional things to keep in mind:

    It is recommended that you only download files from sources you trust.
    You may want to scan the files with antivirus software before opening them.
    If you have any questions about these files, please contact the person who shared them with you.

Thank you,

ShareHUB
`
        : message, // Plain text version
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Mail sent Successfully ${recipientEmail}`);
    return info;
  } catch (error) {
    throw new Error("Something went wrong")
  }
}
