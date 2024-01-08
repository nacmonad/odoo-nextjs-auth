/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
    dest: 'public',
    // fallbacks: {
    //     image: '/fallback.png'
    //     // document: '/other-offline',  // if you want to fallback to a custom page other than /_offline
    //     // font: '/static/font/fallback.woff2',
    //     // audio: ...,
    //     // video: ...,
    //   },
      swSrc: '/src/customSw.js',
      register: true,
      skipWaiting: true,
  })
  
const nextConfig = {
  reactStrictMode: false,
  //output: 'export',

}

module.exports = withPWA(nextConfig)
