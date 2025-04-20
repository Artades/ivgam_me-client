
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { sender, subject, message} = await request.json();

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: true,
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  try {
   const result = await transporter.sendMail({
      from: sender,
      to: process.env.MAIL,
      subject,
      html: message,
      text: message,
    });

    return Response.json({ acccepted: result.accepted});
  } catch (error) {
    console.error('Email error:', error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
