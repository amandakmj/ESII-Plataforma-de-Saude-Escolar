/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Exporta para HTML estático
    images: {
      unoptimized: true, // Evita erro com imagens
    },
  };
  
  module.exports = nextConfig;
 