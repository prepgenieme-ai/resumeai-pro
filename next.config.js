/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
  },
  // ✅ FIX: Tell Next.js NOT to bundle these Node.js packages with webpack
  // They only run on the server (API routes), not in the browser
  serverExternalPackages: ['pdf-parse', 'mammoth'],
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Also add as webpack externals for extra safety
      config.externals = [...(config.externals || []), 'pdf-parse', 'mammoth']
    }
    return config
  }
}

module.exports = nextConfig
