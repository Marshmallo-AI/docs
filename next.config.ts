import type { NextConfig } from "next";

import nextra from 'nextra'
 
// Set up Nextra with its configuration
const withNextra = nextra({
  // Nextra configuration options
})

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: { unoptimized: true },
  turbopack: {
       resolveAlias: {
         // Path to your `mdx-components` file with extension
         'next-mdx-import-source-file': './src/mdx-components.tsx'
       }
     }
};

export default withNextra(nextConfig);
