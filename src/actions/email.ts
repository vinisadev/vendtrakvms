'use server'
import Mailgun from 'mailgun.js'
import formData from 'form-data'

export async function sendEmail({
  to,
  subject,
  text
}: {
  to: string
  subject: string
  text: string
}) {
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error('SENDGRID_API_KEY environment variable is not set')
  }
  if (!process.env.EMAIL_FROM) {
    throw new Error('EMAIL_FROM environment variable is not set')
  }

  const mgMail = new Mailgun(formData)
  const mg = mgMail.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'
  })

  mg.messages
    .create('mail.domain76.com', {
      from: process.env.EMAIL_FROM,
      to: to.toLowerCase().trim(),
      subject: subject.trim(),
      text: text.trim()
    })
    .then((msg) => console.log(msg))
    .catch((err) => console.error(err))
}
