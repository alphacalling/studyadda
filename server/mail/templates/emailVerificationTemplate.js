const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>OTP Verification - StudyAdda</title>
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
			padding: 12px 24px;
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
						<td style="padding: 0 32px 24px 32px; text-align: center;">
							<h1 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 16px 0;">OTP Verification</h1>
							<p style="font-size: 15px; line-height: 1.6; color: #4b5563; margin: 0 0 16px 0;">
								Dear User,
							</p>
							<p style="font-size: 15px; line-height: 1.6; color: #4b5563; margin: 0 0 24px 0;">
								Thank you for registering with <strong>StudyAdda</strong>. To complete your registration, please use the following One-Time Password (OTP) to verify your account:
							</p>
							<!-- OTP Box -->
							<div style="background-color: #f8fafc; border: 2px dashed #e2e8f0; border-radius: 8px; padding: 14px 24px; margin: 0 auto 24px auto; display: inline-block;">
								<span style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #0f172a; font-family: monospace, sans-serif; display: inline-block; padding-left: 8px;">${otp}</span>
							</div>
							<p style="font-size: 13px; line-height: 1.6; color: #6b7280; margin: 0 0 8px 0;">
								This OTP is valid for <strong>5 minutes</strong>. If you did not request this verification, please disregard this email.
							</p>
							<p style="font-size: 13px; line-height: 1.6; color: #6b7280; margin: 0;">
								Once your account is verified, you will have access to our platform and all its learning features.
							</p>
						</td>
					</tr>
					<!-- Footer / Support -->
					<tr>
						<td style="padding: 20px 24px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center;">
							<p style="font-size: 13px; color: #6b7280; margin: 0; line-height: 1.5;">
								If you have any questions or need assistance, reach out to us at <a href="mailto:studyadda.alpha@gmail.com" style="color: #2563eb; text-decoration: none; font-weight: 500;">studyadda.alpha@gmail.com</a>.
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

module.exports = otpTemplate;



// gmail based link 
{/* <img src="https://i.ibb.co/3mnGMygH/studyadda-universal.png" */}