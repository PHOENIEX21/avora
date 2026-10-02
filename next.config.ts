import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ['10.2.0.194', '192.168.14.251'],
  typescript: { ignoreBuildErrors: true }, // TEMP diagnostic: remove after locating the type error
};
export default nextConfig;
