exports.contactUsEmail = (
    email,
    firstname,
    lastname,
    message,
    phoneNo,
    countrycode
) => {
    const formattedPhone = countrycode ? `${countrycode} ${phoneNo}` : phoneNo;
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Contact Form Confirmation - StudyAdda</title>
    <style>
        body {
            background-color: #f4f6f8;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            color: #333333;
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }
    </style>
</head>

<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333333;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f6f8; width: 100%; margin: 0; padding: 30px 12px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 540px; background-color: #ffffff; border-radius: 10px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); text-align: center;">
                    <!-- Logo Header -->
                    <tr>
                        <td align="center" style="padding: 32px 24px 20px 24px;">
                            <a href="https://studyadda.codervikas.in" target="_blank" style="text-decoration: none;">
                                <img src="https://res.cloudinary.com/dnxatsrum/image/upload/v1790252476/StudyAdda/Logo/studyadda_universal.png" alt="StudyAdda Logo" width="160" style="max-width: 160px; width: 160px; height: auto; display: block; margin: 0 auto; border: 0;" />
                            </a>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td style="padding: 0 32px 28px 32px; text-align: center;">
                            <h1 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 16px 0;">We Received Your Message</h1>
                            <p style="font-size: 15px; line-height: 1.6; color: #4b5563; margin: 0 0 16px 0;">
                                Dear <strong>${firstname} ${lastname}</strong>,
                            </p>
                            <p style="font-size: 15px; line-height: 1.6; color: #4b5563; margin: 0 0 20px 0;">
                                Thank you for contacting us. We have received your query and our team will get back to you shortly.
                            </p>

                            <!-- Submission Details Card -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin: 0 auto 24px auto; text-align: left;">
                                <tr>
                                    <td style="padding: 10px 16px; font-size: 13px; color: #64748b; width: 30%; border-bottom: 1px solid #e2e8f0;">Name:</td>
                                    <td style="padding: 10px 16px; font-size: 14px; font-weight: 600; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${firstname} ${lastname}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 16px; font-size: 13px; color: #64748b; border-bottom: 1px solid #e2e8f0;">Email:</td>
                                    <td style="padding: 10px 16px; font-size: 14px; font-weight: 600; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${email}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 16px; font-size: 13px; color: #64748b; border-bottom: 1px solid #e2e8f0;">Phone:</td>
                                    <td style="padding: 10px 16px; font-size: 14px; font-weight: 600; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${formattedPhone}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 16px; font-size: 13px; color: #64748b; vertical-align: top;">Message:</td>
                                    <td style="padding: 10px 16px; font-size: 14px; color: #334155; line-height: 1.5;">${message}</td>
                                </tr>
                            </table>

                            <p style="font-size: 13px; line-height: 1.6; color: #6b7280; margin: 0;">
                                We appreciate your patience while we review your message.
                            </p>
                        </td>
                    </tr>
                    <!-- Footer / Support -->
                    <tr>
                        <td style="padding: 20px 24px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center;">
                            <p style="font-size: 13px; color: #6b7280; margin: 0; line-height: 1.5;">
                                If you have any urgent questions, feel free to reach out to us directly at <a href="mailto:studyadda.alpha@gmail.com" style="color: #2563eb; text-decoration: none; font-weight: 500;">studyadda.alpha@gmail.com</a>.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>`;
};

// gmail based link 
{/* <img src="https://i.ibb.co/3mnGMygH/studyadda-universal.png" */}