// const withPWA = require("next-pwa");

// module.exports = withPWA({
//   pwa: {
//     dest: "public",
//     register: true,
//     skipWaiting: true,
//     buildExcludes: [/middleware-manifest.json$/],
//   },
//   reactStrinctMode: true,
// });

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  reactStrictMode: true,
});
