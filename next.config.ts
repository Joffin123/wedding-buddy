import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets other devices on the local network (phones, other PCs) load the dev
  // server's CSS/JS. Without this, Next.js blocks those cross-origin dev asset
  // requests and the page loads as unstyled HTML — looks like "Tailwind is broken"
  // but only ever affects `next dev`, never a production build.
  allowedDevOrigins: ["192.168.1.9", "192.168.1.*"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "crxygdrvlckoaykpafss.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "8mb", // admin image uploads go through server actions
    },
  },
};

export default nextConfig;
