/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["10.0.0.18", "192.168.1.65"],
  
  async redirects() {
    return [
      // Old tabbed page -> individual product pages.
      // Query-param rules must come before the bare /product-details rule.
      {
        source: "/product-details",
        has: [{ type: "query", key: "tab", value: "departments-tabs-neurology" }],
        destination: "/products/health-insurance",
        permanent: true,
      },
      {
        source: "/product-details",
        has: [{ type: "query", key: "tab", value: "departments-tabs-surgery" }],
        destination: "/products/life-insurance",
        permanent: true,
      },
      {
        source: "/product-details",
        has: [{ type: "query", key: "tab", value: "departments-tabs-final-expense" }],
        destination: "/products/final-expense-insurance",
        permanent: true,
      },
      {
        source: "/product-details",
        has: [{ type: "query", key: "tab", value: "departments-tabs-dental" }],
        destination: "/products/dental-insurance",
        permanent: true,
      },
      {
        source: "/product-details",
        has: [{ type: "query", key: "tab", value: "departments-tabs-ophthalmology" }],
        destination: "/products/vision-insurance",
        permanent: true,
      },
      {
        source: "/product-details",
        has: [{ type: "query", key: "tab", value: "departments-tabs-cardiology" }],
        destination: "/products/medicare",
        permanent: true,
      },
      // Anything else that hit the old page lands on the hub.
      {
        source: "/product-details",
        destination: "/products",
        permanent: true,
      },
      // IUL moved out of /resources.
      {
        source: "/resources/indexed-universal-life",
        destination: "/products/indexed-universal-life",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
