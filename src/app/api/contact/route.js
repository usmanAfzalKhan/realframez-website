// src/app/api/contact/route.js
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

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
      packages,
      services,
      address = {},
      date,
      message,
    } = data

    const packagesList = Array.isArray(packages) ? packages.join(', ') : packages || 'None'
    const servicesList = Array.isArray(services) ? services.join(', ') : services || 'None'

    const addressParts = []
    if (address.street) addressParts.push(address.street)
    if (address.city) addressParts.push(address.city)
    if (address.province) addressParts.push(address.province)
    const addressStr = addressParts.length ? addressParts.join(', ') : 'Not provided'

    const html = `
      <h2>📅 New Appointment Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Packages:</strong> ${packagesList}</p>
      <p><strong>Services:</strong> ${servicesList}</p>
      <p><strong>Address:</strong> ${addressStr}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `Appointment from ${name}`,
      html,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('🚨 Mail error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
