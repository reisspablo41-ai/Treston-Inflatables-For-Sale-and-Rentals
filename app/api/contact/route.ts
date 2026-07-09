import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.resend_key);

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, phone, date, message } = await req.json();

    if (!firstName || !lastName || !email || !phone || !date || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Treston Inflatable for Sale and Rentals <trestoninflatables@gmail.com>',
      to: 'trestoninflatables@gmail.com',
      replyTo: email,
      subject: `New Contact Request from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
          <div style="background: #0f172a; padding: 28px 32px; text-align: center;">
            <p style="margin: 0 0 4px; color: #8b5cf6; font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;">New Inquiry</p>
            <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 800;">Treston Inflatable for Sale and Rentals</h1>
            <p style="margin: 6px 0 0; color: #94a3b8; font-size: 13px;">yourveryownbouncehousepartyrental.com</p>
          </div>

          <div style="padding: 32px;">
            <h2 style="margin: 0 0 20px; color: #0f172a; font-size: 18px; font-weight: 700;">New Quote Request</h2>

            <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #8b5cf6;">
              <p style="margin: 0 0 10px; font-size: 14px; color: #475569;"><strong style="color: #0f172a;">Name:</strong> ${firstName} ${lastName}</p>
              <p style="margin: 0 0 10px; font-size: 14px; color: #475569;"><strong style="color: #0f172a;">Email:</strong> ${email}</p>
              <p style="margin: 0 0 10px; font-size: 14px; color: #475569;"><strong style="color: #0f172a;">Phone:</strong> ${phone}</p>
              <p style="margin: 0; font-size: 14px; color: #475569;"><strong style="color: #0f172a;">Event Date:</strong> ${date}</p>
            </div>

            <h3 style="margin: 0 0 10px; color: #0f172a; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Message</h3>
            <p style="margin: 0; color: #475569; line-height: 1.7; font-size: 15px; background: #f8fafc; padding: 16px; border-radius: 8px;">
              ${message}
            </p>
          </div>

          <div style="background: #f1f5f9; padding: 16px 32px; text-align: center; color: #94a3b8; font-size: 12px;">
            Sent from yourveryownbouncehousepartyrental.com · trestoninflatables@gmail.com
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
