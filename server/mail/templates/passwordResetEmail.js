exports.passwordResetEmail = (resetUrl, name) => {
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Reset Your Password - StudyAdda</title>
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
        .cta {
            display: inline-block;
            padding: 13px 30px;
            background-color: #FFD60A;
            color: #000000 !important;
            text-decoration: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 700;
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
                            <h1 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 16px 0;">Reset Your Password</h1>
                            <p style="font-size: 15px; line-height: 1.6; color: #4b5563; margin: 0 0 16px 0;">
                                Hello <strong>${name || "User"}</strong>,
                            </p>
                            <p style="font-size: 15px; line-height: 1.6; color: #4b5563; margin: 0 0 24px 0;">
                                We received a request to reset the password for your <strong>StudyAdda</strong> account. Click the button below to choose a new password:
                            </p>
                            <!-- CTA Button -->
                            <div style="margin: 24px 0;">
                                <a class="cta" href="${resetUrl}" target="_blank" style="display: inline-block; padding: 13px 30px; background-color: #FFD60A; color: #000000; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 700;">Reset Password</a>
                            </div>
                            <p style="font-size: 13px; line-height: 1.6; color: #6b7280; margin: 0 0 16px 0;">
                                This link is valid for <strong>1 hour</strong>. If you did not request a password reset, you can safely ignore this email — your password will not change.
                            </p>
                            <!-- Fallback Link -->
                            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px 16px; margin: 20px 0 0 0; word-break: break-all; text-align: left;">
                                <p style="font-size: 12px; color: #64748b; margin: 0 0 6px 0;">If the button above does not work, copy and paste this URL into your browser:</p>
                                <a href="${resetUrl}" target="_blank" style="font-size: 12px; color: #2563eb; text-decoration: underline; word-break: break-all;">${resetUrl}</a>
                            </div>
                        </td>
                    </tr>
                    <!-- Footer / Support -->
                    <tr>
                        <td style="padding: 20px 24px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center;">
                            <p style="font-size: 13px; color: #6b7280; margin: 0; line-height: 1.5;">
                                If you need assistance, reach out to us at <a href="mailto:studyadda.alpha@gmail.com" style="color: #2563eb; text-decoration: none; font-weight: 500;">studyadda.alpha@gmail.com</a>.
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