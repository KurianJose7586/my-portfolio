// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password (not account password)
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `[Portfolio] New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family: monospace; background: #0a0e1a; color: #00ff41; padding: 24px; border-radius: 8px;">
          <h2 style="color: #5AC8D8; margin-top: 0;">New Portfolio Contact</h2>
          <p><strong style="color: #F7D046;">From:</strong> ${name}</p>
          <p><strong style="color: #F7D046;">Email:</strong> <a href="mailto:${email}" style="color: #5AC8D8;">${email}</a></p>
          <hr style="border-color: #00ff4133; margin: 16px 0;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
