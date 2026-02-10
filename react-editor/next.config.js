/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",

    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.entry = {
                "puck-editor": "./web-component-entry.tsx",
            };
        }
        return config;
    },
    experimental: {
        turbo: false,
    },
};

module.exports = nextConfig;

