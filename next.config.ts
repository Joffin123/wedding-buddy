import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
