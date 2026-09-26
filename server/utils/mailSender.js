const mailSender = async (email, title, body) => {
  if (!email) {
    console.error("mailSender error: Recipient email is missing or undefined.");
    return null;
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "StudyAdda | Alphacalling",
          email: process.env.MAIL_USER,
        },
        to: [{ email: email }],
        subject: title,
        htmlContent: body,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Failed to send email via Brevo")
    }

    console.log("Email sent successfully via Brevo:", data.messageId)
    return data
  } catch (error) {
    console.error("Error sending email via Brevo:", error.message)
    throw error
  }
}

module.exports = mailSender






//----------------------- working code but not in render like platform -----------------
// const nodemailer = require("nodemailer")
// const dns = require("node:dns")

// if (dns.setDefaultResultOrder) {
//   dns.setDefaultResultOrder("ipv4first")
// }

// const mailSender = async (email, title, body) => {
//   try {
//     if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
//       throw new Error(
//         "Missing email credentials: MAIL_USER and MAIL_PASS must be defined in environment variables."
//       )
//     }

//     const host = process.env.MAIL_HOST || "smtp.gmail.com"
//     const isGmail = host === "smtp.gmail.com" || host.toLowerCase().includes("gmail")

//     let transporterConfig
//     if (isGmail) {
//       transporterConfig = {
//         service: "gmail",
//         auth: {
//           user: process.env.MAIL_USER,
//           pass: process.env.MAIL_PASS,
//         },
//       }
//     } else {
//       transporterConfig = {
//         host: host,
//         port: process.env.MAIL_PORT ? parseInt(process.env.MAIL_PORT, 10) : 465,
//         secure: process.env.MAIL_SECURE !== undefined ? process.env.MAIL_SECURE === "true" : true,
//         auth: {
//           user: process.env.MAIL_USER,
//           pass: process.env.MAIL_PASS,
//         },
//       }
//     }

//     const transporter = nodemailer.createTransport(transporterConfig)

//     const info = await transporter.sendMail({
//       from: `"StudyAdda | Alphacalling" <${process.env.MAIL_USER}>`,
//       to: `${email}`,
//       subject: `${title}`,
//       html: `${body}`,
//     })

//     console.log("Email sent successfully to", email, ":", info.response || info.messageId)
//     return info
//   } catch (error) {
//     console.error("Error occurred while sending mail:", error.message)
//     throw error
//   }
// }

// module.exports = mailSender
