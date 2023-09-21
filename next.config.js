/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "res.cloudinary.com",
      "media.eventhubs.com",
      "www.gameshub.com",
      "i.ytimg.com",
      "media.eventhubs.com",
      "avatars.githubusercontent.com",
    ],
  },
};

module.exports = nextConfig;
