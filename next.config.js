const nextBuildId = require('next-build-id')
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  compress: true,
  staticPageGenerationTimeout: 15000,
  optimizeFonts: false,
  // async redirects() {
  //   return [
  //     {
  //       source: '/home',
  //       destination: '/',
  //       permanent: true,
  //     },
  //   ]
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  generateBuildId: async () => {
    const fromGit = await nextBuildId({ dir: __dirname })
    return fromGit.id
  },
  env:{
    PORT: process.env.PORT,
    APP_URL:process.env.APP_URL,
    API_URL: process.env.API_URL,
    IMG_URL: process.env.IMG_URL,
    RAZORPAY_KEY:process.env.RAZORPAY_KEY,
    RAZORPAY_SECRET:process.env.RAZORPAY_SECRET,
    CURRENCY:process.env.CURRENCY,
    ZOOM_KEY:process.env.ZOOM_KEY,
    ZOOM_SECRET:process.env.ZOOM_SECRET,
    ZOOM_EMAIL:process.env.ZOOM_EMAIL
  },
}

module.exports = nextConfig
