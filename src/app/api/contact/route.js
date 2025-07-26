import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// configure transporter once
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, 
    pass: process.env.GMAIL_PASS, 
  },
})

export async function POST(request) {
  try {
    const data = await request.json()
    const {
      name,
      phone,
      services,
      date,
      referred,
      referredBy,
      message,
    } = data

    // build human‑readable list of services
    const servicesList = Array.isArray(services) ? services.join(', ') : services

    // craft email HTML
    const html = `
      <h2>📅 New Appointment Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Services:</strong> ${servicesList}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Referred?</strong> ${referred}</p>
      ${
        referred === 'Yes'
          ? `<p><strong>Referred by:</strong> ${referredBy}</p>`
          : ''
      }
      <p><strong>Message:</strong><br/>${message}</p>
    `

    // send mail
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // you’ll receive it back
      subject: `Appointment from ${name}`,
      html,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('🚨 Mail error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
