// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
     remotePatterns: [
      { protocol: 'https', hostname: 'sm.pcmag.com' },
      { protocol: 'https', hostname: 'cdn.arstechnica.net' },
      { protocol: 'https', hostname: 'cdn.mos.cms.futurecdn.net' },
      { protocol: 'https', hostname: '**' },
      // add others as needed
    ],
  },
};

module.exports = nextConfig;

