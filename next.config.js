/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  }
}

module.exports = nextConfig
