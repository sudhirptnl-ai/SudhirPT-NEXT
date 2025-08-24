/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Next/Image: sta Sanity CDN toe (voor blog/afbeeldingen)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
