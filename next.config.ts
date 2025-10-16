import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.ltrbxd.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.thestorygraph.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "b2419162.smushcdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.nyrb.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
