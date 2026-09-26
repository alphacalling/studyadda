exports.tempPasswordEmail = (tempPassword, name, loginUrl) => {
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Temporary Password - StudyAdda</title>
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
                            <h1 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 16px 0;">Temporary Password Assigned</h1>
                            <p style="font-size: 15px; line-height: 1.6; color: #4b5563; margin: 0 0 16px 0;">
                                Hello ${name || "User"},
                            </p>
                            <p style="font-size: 15px; line-height: 1.6; color: #4b5563; margin: 0 0 20px 0;">
                                An administrator has generated a temporary password for your <strong>StudyAdda</strong> account. Please use this password to sign in:
                            </p>
                            <!-- Password Box -->
                            <div style="background-color: #000814; border: 1px solid #2C333F; border-radius: 8px; padding: 16px 24px; margin: 0 auto 24px auto; max-width: 320px;">
                                <span style="font-family: monospace; font-size: 22px; font-weight: 700; color: #FFD60A; letter-spacing: 2px;">
                                    ${tempPassword}
                                </span>
                            </div>
                            <p style="font-size: 14px; line-height: 1.6; color: #ef4444; font-weight: 600; margin: 0 0 24px 0;">
                                ⚠️ Security Notice: Upon logging in with this temporary password, you will be required to set a new permanent password immediately.
                            </p>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto;">
                                <tr>
                                    <td align="center" style="border-radius: 6px;">
                                        <a class="cta" href="${loginUrl}" target="_blank" style="display: inline-block; padding: 13px 30px; background-color: #FFD60A; color: #000000; text-decoration: none; border-radius: 6px; font-size: 15px; font-weight: 700;">Login to StudyAdda</a>
                                    </td>
                                </tr>
                            </table>
                            <p style="font-size: 13px; line-height: 1.5; color: #6b7280; margin: 24px 0 0 0;">
                                If you did not request this assistance, please contact our support team immediately.
                            </p>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 24px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center;">
                            <p style="font-size: 13px; color: #6b7280; margin: 0; line-height: 1.5;">
                                Need help? Contact us at <a href="mailto:studyadda.alpha@gmail.com" style="color: #2563eb; text-decoration: none; font-weight: 500;">studyadda.alpha@gmail.com</a>.
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
